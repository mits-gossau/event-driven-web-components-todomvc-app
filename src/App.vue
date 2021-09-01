<template>
	<section class="todoapp">
		<header class="header">
			<h1>todos</h1>
			<NewTodo />
		</header>
		<!-- This section should be hidden by default and shown when there are todos -->
			<section class="main">
				<TodoList />
			</section>
			<!-- This footer should be hidden by default and shown when there are todos -->
			<footer class="footer" v-if="state.items.length > 0">
				<!-- This should be `0 items left` by default -->
				<span class="todo-count"><strong>{{itemsLeft}}</strong> item left</span>
				<!-- Remove this if you don't implement routing -->
				<ul class="filters">
					<li>
						<a :class="{selected: state.currentRoute !== 'active' && state.currentRoute !== 'completed'}" href="#/">All</a>
					</li>
					<li>
						<a :class="{selected: state.currentRoute === 'active'}" href="#/active">Active</a>
					</li>
					<li>
						<a :class="{selected: state.currentRoute === 'completed'}" href="#/completed">Completed</a>
					</li>
				</ul>
				<!-- Hidden if no completed items are left ↓ -->
				<button class="clear-completed" v-if="state.items.some(item => item.completed)" @click="clearCompleted">Clear completed</button>
			</footer>
	</section>
	<Footerbar />
</template>

<script setup>
import {provide, reactive, computed} from 'vue';
import TodoList from './components/TodoList.vue';
import NewTodo from './components/NewTodo.vue';
import Footerbar from './components/Footerbar.vue';


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
provide('updateItem', updateItem)
provide('deleteItem', deleteItem)
provide('addItem', addItem)
provide('checkItem', checkItem)
provide('toggleAll', toggleAll)

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
