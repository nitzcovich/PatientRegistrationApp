import InputText from 'primevue/inputtext'
import Button from 'primevue/button'


export default {
  name: 'PatientInputForm',
  data() {
    return {
      form: {
        name: '',
        lastname:'',
        email: '',
        phone: null,
        file: null,
        filename:"",
        filetype:""
      }
    };
  },
  components:{
    InputText,
    Button
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
      const { name, lastname, email, phone, file } = this.form;

      if (!name || !lastname ||!email || !phone || !file) {
        alert('Please complete all fields');
        return;
      }

      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/patients`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });

        if (!res.ok) throw new Error('Submission failed');

        this.form = { name: '', lastname:'', email: '', phone: null , file: null};
        this.$emit('registered');  // Notify parent to refresh list
      } catch (err) {
        console.error(err);
        alert('Error submitting patient');
      }
    }
  },
  template: `
    <section class="form-section">
      <div class="p-fluid p-formgrid p-grid">
        <div class="p-field p-col-12 p-md-6">
          <InputText id="name" v-model="form.name" class="form-input" placeholder="John" variant="filled" />
          <label for="name">Name</label>
        </div>

        <div class="p-field p-col-12 p-md-6">
          <InputText id="lastname" v-model="form.lastname" class="form-input" placeholder="Doe" variant="filled" />
          <label for="lastname">Lastname</label>
        </div>

        <div class="p-field p-col-12 p-md-6">
          <InputText id="email" v-model="form.email" class="form-input" placeholder="john@example.com" variant="filled"/>
            <label for="email">Email</label>
        </div>

        <div class="p-field p-col-12 p-md-6">
          <InputText id="phone" v-model="form.phone" class="form-input" placeholder="15-1111-1111" variant="filled"/>
          <label for="phone">Phone</label>
        </div>

        <!--File input -->
        <div class="p-field p-col-12">
          <input type="file" @change="handleFileChange" />
          <label v-if="form.file">Selected file: {{ form.filename }}</label>
        </div>

        <br/>
        <div class="p-col-12">
          <Button label="Add Patient" @click="submitForm" />
        </div>
      </div>
    </section>
  `
}
