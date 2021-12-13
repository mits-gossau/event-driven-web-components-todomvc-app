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
import { provide, reactive, computed } from 'vue';
import { setCurrentRoute } from './composables/useCurrentRoute';

import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import NewTodo from './components/NewTodo.vue';
import Footerbar from './components/Footerbar.vue';

let state = reactive({
	items: JSON.parse(localStorage.getItem('todos') || '[]').sort((a, b) =>
		Number(a.id)
	),
});

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

provide('state', state);
provide('itemsLeft', itemsLeft);
provide('updateItem', updateItem);
provide('deleteItem', deleteItem);
provide('addItem', addItem);
provide('checkItem', checkItem);
provide('toggleAll', toggleAll);
provide('clearCompleted', clearCompleted);

window.addEventListener('hashchange', setCurrentRoute);
</script>
