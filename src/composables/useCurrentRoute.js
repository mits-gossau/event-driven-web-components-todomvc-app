import { computed, ref } from 'vue';

let currentRoute = ref(window.location.hash.slice(2));
const getCurrentRoute = computed(() => currentRoute.value);
const setCurrentRoute = () => currentRoute.value = window.location.hash.slice(2);

export {
  getCurrentRoute,
  setCurrentRoute
};
