import { defineCustomElement } from 'vue';

import App from './App.ce.vue';
const AppWebComponent = defineCustomElement(App);
customElements.define('ui-app', AppWebComponent);
