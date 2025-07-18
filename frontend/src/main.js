import { createApp } from 'vue/dist/vue.esm-bundler';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './app.js';

import './assets/main.css'

//components
import PatientRegistry from "./components/PatientRegistry";
import PatientInputForm from "./components/PatientInputForm";



const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false,
            cssLayer: false
        }
    }
});


//register components
app.component("patient-registry", PatientRegistry)
app.component("patient-input-form", PatientInputForm)

app.mount('#app')