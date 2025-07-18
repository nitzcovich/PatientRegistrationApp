import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card';

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
    Column,
    Card
  },
  template: `
    <section class="table-section">
      <h2 class="title">Patients</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="patient in patients"
          :key="patient.id"
          class="patient-card"
        >
          <template #header>
            <div class="card-header">
              <img
                v-if="patient.file"
                :src="'data:image/jpg;base64,' + patient.file"
                alt="Profile Picture"
                class="profile-image"
              />
              <div class="card-title">{{ patient.name }} {{ patient.lastname }}</div>
            </div>
          </template>

          <template #content>
            <p><strong>Email:</strong> {{ patient.email }}</p>
            <p><strong>Phone:</strong> {{ patient.phone }}</p>
          </template>
        </Card>
      </div>
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
