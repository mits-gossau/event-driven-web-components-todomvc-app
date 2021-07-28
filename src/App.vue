<template>
	<section class="todoapp">
		<header class="header">
			<h1>todos</h1>
			<NewTodo />
		</header>
		<!-- This section should be hidden by default and shown when there are todos -->
			<section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<TodoList />
			</section>
			<!-- This footer should be hidden by default and shown when there are todos -->
			<footer class="footer">
				<!-- This should be `0 items left` by default -->
				<span class="todo-count"><strong>0</strong> item left</span>
				<!-- Remove this if you don't implement routing -->
				<ul class="filters">
					<li>
						<a class="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<!-- Hidden if no completed items are left ↓ -->
				<button class="clear-completed">Clear completed</button>
			</footer>
	</section>
	<Footerbar />
</template>

<script setup>
import {provide, computed, reactive} from 'vue';
import TodoList from './components/TodoList.vue';
import NewTodo from './components/NewTodo.vue';
import Footerbar from './components/Footerbar.vue';

const items = reactive(JSON.parse(localStorage.getItem('todos') || []).sort((a, b) => Number(a.id)))

const updateItems = () => {
	localStorage.setItem('todos', JSON.stringify(items))
}

provide('items', items)
provide('updateItems', updateItems)

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {

}
</style>
