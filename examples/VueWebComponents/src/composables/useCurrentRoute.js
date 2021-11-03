import { ref, readonly } from 'vue';

const stateCurrentRoute = ref(window.location.hash.slice(2));
const currentRoute = readonly(stateCurrentRoute);
const setCurrentRoute = () =>
	(stateCurrentRoute.value = window.location.hash.slice(2));

export { currentRoute, setCurrentRoute };
