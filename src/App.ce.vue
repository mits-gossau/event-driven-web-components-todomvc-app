<template>
	<section class="todoapp">
		<header class="header">
			<h1>todos</h1>
			<ui-new-todo></ui-new-todo>
		</header>
		<!-- This section should be hidden by default and shown when there are todos -->
			<section class="main">
				<ui-todo-list></ui-todo-list>
			</section>
			<!-- This footer should be hidden by default and shown when there are todos -->
			<ui-todo-footer></ui-todo-footer>

	</section>
	<ui-footerbar></ui-footerbar>
</template>

<script setup>
import { defineCustomElement } from 'vue';

import { setCurrentRoute } from './composables/useCurrentRoute.js';

import TodoList from './components/TodoList.ce.vue';
import TodoItem from './components/TodoItem.ce.vue';
import NewTodo from './components/NewTodo.ce.vue';
import Footerbar from './components/Footerbar.ce.vue';
import TodoFooter from './components/TodoFooter.ce.vue';

import Button from './components/webcomponents/Button.js';

const TodoListWebComponent = defineCustomElement(TodoList);
const TodoItemWebComponent = defineCustomElement(TodoItem);
const NewTodoWebComponent = defineCustomElement(NewTodo);
const FooterbarWebComponent = defineCustomElement(Footerbar);
const TodoFooterWebComponent = defineCustomElement(TodoFooter);

customElements.define('ui-todo-list', TodoListWebComponent);
customElements.define('ui-todo-item', TodoItemWebComponent);
customElements.define('ui-new-todo', NewTodoWebComponent);
customElements.define('ui-footerbar', FooterbarWebComponent);
customElements.define('ui-todo-footer', TodoFooterWebComponent);
customElements.define('ui-button', Button);

window.addEventListener('hashchange', setCurrentRoute);

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
	.todoapp {
		background: #fff;
		margin: 130px 0 40px 0;
		position: relative;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
					0 25px 50px 0 rgba(0, 0, 0, 0.1);
	}

	.todoapp h1 {
		position: absolute;
		top: -155px;
		width: 100%;
		font-size: 100px;
		font-weight: 100;
		text-align: center;
		color: rgba(175, 47, 47, 0.15);
		-webkit-text-rendering: optimizeLegibility;
		-moz-text-rendering: optimizeLegibility;
		text-rendering: optimizeLegibility;
	}
</style>
