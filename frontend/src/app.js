import Button from 'primevue/button'

export default {
    template:`
    <div class="app-container">
      <h1 class="title">Patient Registration</h1>

      <patient-input-form @registered="refreshPatients"/>
      <patient-registry ref="registry"/>

    </div>
    `,
    methods: {
        refreshPatients() {
        this.$refs.registry.fetchPatients();
        }
    }
    
}