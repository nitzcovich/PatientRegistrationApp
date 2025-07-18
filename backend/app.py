from wsgiref.simple_server import make_server

import falcon
from dotenv import load_dotenv
import os
import base64

from db import SessionLocal, engine
from models import Base, Patient

#load environment variables from .env file
load_dotenv()

port = int(os.getenv("PORT"))

#AGREGAR TRY/RAISE ERROR con un mensaje
#TODO
Base.metadata.create_all(bind=engine)


class CORSMiddleware:
    def process_request(self, req, resp):
        resp.set_header("Access-Control-Allow-Origin", "*")
        resp.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        resp.set_header("Access-Control-Allow-Headers", "Content-Type")

    # def process_response(self, req, resp, resource, req_succeeded):
    #     # For preflight requests
    #     if req.method == "OPTIONS":
    #         resp.status = falcon.HTTP_200

class PatientRegistrationResource:

    def on_post(self, req, resp):
        #curl -X POST http://localhost:3000/patient -H "Content-Type: application/json" -d '{"name":"Natasha", "lastname":"Rodriguez", "email":"nat.rod@gmail.com", "phone":"11-1111-1111"}'
        db = SessionLocal()
        try:
            name = req.media.get("name")
            lastname = req.media.get("lastname")
            email = req.media.get("email")
            phone = req.media.get("phone")
            file = req.media.get("file")

            # print(f"Received: name={name}, lastname={lastname}, email={email}, phone={phone}, file={file}")

            document_binary = base64.b64decode(file)

            new_patient = Patient(
                name=name,
                lastname=lastname,
                phone=phone,
                email=email,
                document_photo=document_binary
            )

            db.add(new_patient)
            db.commit()

            resp.status = falcon.HTTP_201
            resp.content_type = falcon.MEDIA_JSON
            resp.media = {"message": "Patient registered successfully"}
        
        except Exception as db_error:
            db.rollback()
            print(f"Database error: {db_error}")
            resp.status = falcon.HTTP_400
            resp.content_type = falcon.MEDIA_JSON
            resp.media = {"message": "Failed to register patient. Possibly duplicate email."}

        finally:
            db.close()

    def on_get(self,req,resp):
        db = SessionLocal()
        try:
            patients = db.query(Patient).all()
            results = []

            for p in patients:
                document_base64 = None
                if p.document_photo:
                    document_base64 = base64.b64encode(p.document_photo).decode("utf-8")
                results.append({
                    "id": p.id,
                    "name": p.name,
                    "lastname":p.lastname,
                    "email": p.email,
                    "phone": p.phone,
                    "file": document_base64
                })
            
            # resp.set_header("Access-Control-Allow-Origin", "http://localhost:5173")
            resp.media = results
            resp.status = falcon.HTTP_200
        
        except Exception as db_error:
            print(f"Error retrieving patients: {db_error}")
            resp.status = falcon.HTTP_500
            resp.media = {"message": "Error retrieving patients"}
        
        finally:
            db.close()



# app = falcon.App()
app = falcon.App(middleware=[CORSMiddleware()])

app.add_route('/patients', PatientRegistrationResource())

if __name__ == '__main__':
    with make_server('0.0.0.0', port, app) as httpd:
        print(f'Serving on port {port}...')
        httpd.serve_forever()