import { ref } from 'vue';

let currentRoute = ref(window.location.hash.slice(2));
const setCurrentRoute = () => currentRoute.value = window.location.hash.slice(2);

export {
  currentRoute,
  setCurrentRoute
};
