<template>
	<section class="todoapp">
		<header class="header">
			<h1>todos</h1>
			<ui-new-todo></ui-new-todo>
		</header>
		<!-- This section should be hidden by default and shown when there are todos -->
			<section class="main">
				<TodoList />
			</section>
			<!-- This footer should be hidden by default and shown when there are todos -->
			<ui-todo-footer></ui-todo-footer>

	</section>
	<ui-footerbar></ui-footerbar>
</template>

<script setup>
import {provide, reactive, computed, defineCustomElement} from 'vue';
import TodoList from './components/TodoList.vue';
import NewTodo from './components/NewTodo.ce.vue';
import Footerbar from './components/Footerbar.ce.vue';
import TodoFooter from './components/TodoFooter.ce.vue';

const NewTodoWebComponent = defineCustomElement(NewTodo);
const FooterbarWebComponent = defineCustomElement(Footerbar);
const TodoFooterWebComponent = defineCustomElement(TodoFooter);

customElements.define('ui-new-todo', NewTodoWebComponent);
customElements.define('ui-footerbar', FooterbarWebComponent);
customElements.define('ui-todo-footer', TodoFooterWebComponent);

let state = reactive({
	items: JSON.parse(localStorage.getItem('todos') || '[]').sort((a, b) => Number(a.id)),
	currentRoute: window.location.hash.slice(2)
});

const itemsLeft = computed(() => state.items.filter(item => !item.completed).length)

const setItems = () => {
	localStorage.setItem('todos', JSON.stringify(state.items))
}

const updateItem = (item) => {
	setItems();
}

const checkItem = (id) => {
	state.items.forEach(el => {
			if(el.id === id) el.completed = !el.completed
		});
	setItems();
}

const addItem = (item) => {
	state.items.push(item);
	state.items.forEach((el, index) => el.id = index);

	setItems();
}

const deleteItem = (id) => {
	state.items = state.items.filter(el => el.id !== id)
	setItems();
}

const toggleAll = () => {
	state.items.every((el) => el.completed) ?
	state.items.map(el => el.completed = false) :
	state.items.map(el => el.completed = true);
	setItems();
}

const clearCompleted = () => {
	state.items = state.items.filter(el => !el.completed);
	setItems();
}

provide('state', state)
provide('itemsLeft', itemsLeft)
provide('updateItem', updateItem)
provide('deleteItem', deleteItem)
provide('addItem', addItem)
provide('checkItem', checkItem)
provide('toggleAll', toggleAll)
provide('clearCompleted', clearCompleted)

window.addEventListener('hashchange', () => {
	state.currentRoute = window.location.hash.slice(2)
});

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {

}
</style>
