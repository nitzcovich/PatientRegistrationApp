import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

export default {
  name: 'PatientInputForm',
  data() {
    return {
      form: {
        name: '',
        lastname:'',
        email: '',
        phone: null
      }
    };
  },
  components:{
    InputText,
    Button,
    InputGroup,
    InputGroupAddon,
    IconField,
    InputIcon
  },
  methods: {
    async submitForm() {
      const { name, lastname, email, phone } = this.form;

      if (!name || !lastname ||!email || !phone) {
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

        this.form = { name: '', lastname:'', email: '', phone: null };
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
        <br/>
        <div class="p-col-12">
          <Button label="Add Patient" @click="submitForm" />
        </div>
      </div>
    </section>
  `
}
