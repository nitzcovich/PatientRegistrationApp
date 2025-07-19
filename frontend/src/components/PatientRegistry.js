import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  name: 'PatientRegistry',
  data() {
    return {
        loading: false,
        patients: []
    };
  },
  components:{
    Card,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    ProgressSpinner
  },
  template: `
    <section class="table-section">
      <h2 class="title">Patients</h2>
    <section class="accordion-section">
        <div v-if="loading" style="display:flex">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="4" />
        </div>
        <div v-else-if="patients.length==0">
          <strong><i>The patient list is currently empty. Please add a new patient to get started.</i></strong>
        </div>
        <Accordion v-else :multiple="true">
          <AccordionPanel
            v-for="(patient, index) in patients"
            :key="index"
            :value="index"
          >
          <AccordionHeader>
              <img
                v-if="patient.file"
                :src="'data:image/jpg;base64,' + patient.file"
                alt="Profile Picture"
                class="profile-image"
              />
            <span>
              <span>
                {{ patient.name }} {{ patient.lastname }}
              </span>
            </span>
          </AccordionHeader>
          <AccordionContent>
            <div class="text-sm text-gray-700">
              <p><u> <i> Contact information </i></u> </p>
              <p><strong>Email:</strong> {{ patient.email }}</p>
              <p><strong>Phone:</strong> {{ patient.phone }}</p>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </section>

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
