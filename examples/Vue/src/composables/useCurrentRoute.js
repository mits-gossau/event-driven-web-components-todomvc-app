// ✨ Composition API: define composable for current Route
import { ref, readonly } from 'vue';

// ⚛️ ref: to make a reactive and mutable ref object
const stateCurrentRoute = ref(window.location.hash.slice(2));
// ⚛️ readonly: proxy to original object or ref (deep)
const currentRoute = readonly(stateCurrentRoute);
const setCurrentRoute = () =>
	(stateCurrentRoute.value = window.location.hash.slice(2));

export { currentRoute, setCurrentRoute };
