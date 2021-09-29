import { defineCustomElement } from 'vue'

import App from './App.vue'
const AppWebComponent = defineCustomElement(App);
customElements.define('ui-app', AppWebComponent);
