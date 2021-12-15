<template>
	<main>
		<section class="todoapp">
			<header class="header">
				<h1>todos</h1>
				<NewTodo />
			</header>
			<!-- This section should be hidden by default and shown when there are todos -->
			<section class="main">
				<TodoList />
			</section>
			<TodoFooter />
		</section>
		<Footerbar />
	</main>
</template>

<script setup>
// 👆 Single File Components (SFC) Syntactic Sugar to use the Composition API inside SFCs
//    SFC: special file format that brings template, logic and styling together in a single file
//    output is a Standard JS (ES) module so it can be imported
//    separation of concerns in one file

import { provide, reactive, computed } from 'vue';

// ✨ Composition API: new addition to Vue (similar to react Hooks)
// reactive code can be grouped logically and shared between components
// composable for current Route
import { setCurrentRoute } from './composables/useCurrentRoute';

import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import NewTodo from './components/NewTodo.vue';
import Footerbar from './components/Footerbar.vue';

// ⚛️ Reactivity is a programming paradigm that allows us to adjust to changes in a declarative manner
// reactive: returns a reactive copy of the object (deep conversion)
let state = reactive({
	items: JSON.parse(localStorage.getItem('todos') || '[]').sort((a, b) =>
		Number(a.id)
	),
});

// ⚛️ computed helps with a state that depends on another state
//    takes a getter function and returns an immutable reactive ref object
const itemsLeft = computed(
	() => state.items.filter((item) => !item.completed).length
);

const setItems = () => {
	localStorage.setItem('todos', JSON.stringify(state.items));
};

const updateItem = (item) => {
	setItems();
};

const checkItem = (id) => {
	state.items.forEach((el) => {
		if (el.id === id) el.completed = !el.completed;
	});
	setItems();
};

const addItem = (item) => {
	state.items.push(item);
	state.items.forEach((el, index) => (el.id = index));

	setItems();
};

const deleteItem = (id) => {
	state.items = state.items.filter((el) => el.id !== id);
	setItems();
};

const toggleAll = () => {
	state.items.every((el) => el.completed)
		? state.items.map((el) => (el.completed = false))
		: state.items.map((el) => (el.completed = true));
	setItems();
};

const clearCompleted = () => {
	state.items = state.items.filter((el) => !el.completed);
	setItems();
};

// 🔥 provide/inject pair
// the parent component provides data to many child components instead of directly passing it down in one component
// NOTE: different Solution with Composition API in Vue Web Components
provide('state', state);
provide('itemsLeft', itemsLeft);
provide('updateItem', updateItem);
provide('deleteItem', deleteItem);
provide('addItem', addItem);
provide('checkItem', checkItem);
provide('toggleAll', toggleAll);
provide('clearCompleted', clearCompleted);

// ✨ Composition API: use setCurrentRoute
window.addEventListener('hashchange', setCurrentRoute);
</script>
