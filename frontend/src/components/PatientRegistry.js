import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
  name: 'PatientRegistry',
  data() {
    return {
        loading: false,
        patients: []
    };
  },
  components:{
    DataTable,
    Column
  },
  template: `
    <section class="table-section">
      <h2>Registered Patients</h2>
      <DataTable :value="patients" :loading="loading" stripedRows responsiveLayout="scroll">
        <Column field="id" header="ID" />
        <Column field="name" header="Name" />
        <Column field="email" header="Email" />
        <Column field="phone" header="Phone" />
      </DataTable>
    </section>
  `,
  mounted() {
    this.fetchPatients();
  },
  methods:{
    async fetchPatients() {
      this.loading = true;
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${baseUrl}/patients`);
        const data = await res.json();
        this.patients = data || [];
      } catch (err) {
        console.error('Error fetching patients:', err);
      } finally {
        this.loading = false;
      }
    }
  }
}
