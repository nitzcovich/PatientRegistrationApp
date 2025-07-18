import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog';


export default {
  name: 'PatientInputForm',
  data() {
    return {
        visible: false,
        form: {
            name: '',
            lastname:'',
            email: '',
            code:'',
            phone: null,
            file: null,
            filename:"",
            filetype:""
        },
        msg_status: ""
    };
  },
  components:{
    InputText,
    Button,
    Dialog
  },
  methods: {
    handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            this.form.file = selectedFile;
                const reader = new FileReader();
                reader.onload = () => {
                    // reader.result is a base64 data URI: "data:<mime>;base64,<data>"
                    // We want only the base64 part after comma
                    this.form.file = reader.result.split(',')[1];
                    this.form.filename = selectedFile.name;
                    this.form.filetype = selectedFile.type; 
                };
                reader.readAsDataURL(selectedFile);
                }
    },
    async submitForm() {
      const { name, lastname, email, code, phone, file } = this.form;

      if (!name || !lastname ||!email || !phone || !code || !file) {
        this.visible = true
        this.msg_status = 'Please complete all fields'
        return;
      }

      const form_data = {
        name: this.form.name,
        lastname : this.form.lastname,
        email : this.form.email,
        phone :`${this.form.code}-${this.form.phone}`,
        file : this.form.file
      }

      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/patients`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form_data)
        });

        if (!res.ok) throw new Error('Submission failed');

        this.form = { name: '', lastname:'', email: '', code: null, phone: null , file: null};
        this.visible = true
        this.msg_status = "New patient registration successfully completed"
        this.$emit('registered'); 
      } catch (err) {
        this.visible = true
        this.msg_status = err
      }
    }
  },
  template: `
    <section class="form-section">
        <div class="form-card">
        <h2 class="form-title">Register New Patient</h2>

        <div>
            <InputText id="name" v-model="form.name" class="form-input" placeholder="John" variant="filled" />
            <label for="name">Name</label>
        </div>

        <div>
            <InputText id="lastname" v-model="form.lastname" class="form-input" placeholder="Doe" variant="filled" />
            <label for="lastname">Lastname</label>
        </div>

        <div>
            <InputText id="email" v-model="form.email" class="form-input" placeholder="john@example.com" variant="filled"/>
            <label for="email">Email</label>
        </div>

        <div>
            <div class="phone-form">
            <InputText id="phone" v-model="form.phone" class="form-input" placeholder="15-1111-1111" variant="filled"/>
            <label for="phone">Phone Number</label>
            </div>
            <div class="phonecode-form">
            <InputText id="code" v-model="form.code" class="form-input" placeholder="+54" variant="filled"/>
            <label for="code">Country Code</label>
            </div>
        </div>

        <div class="file-upload">
            <label for="file">Upload Document</label>
            <input type="file" id="file" @change="handleFileChange" class="custom-file-input" />
            <p v-if="form.filename" class="file-name"> {{ form.filename }}</p>
        </div>

        <div>
            <Button label="Add Patient" @click="submitForm" class="p-button-success" />
        </div>
        </div>

        <Dialog v-model:visible="visible" header="Registration Status" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <p class="m-0"> {{msg_status}}</p>
        </Dialog>
    </section>
  `
}
