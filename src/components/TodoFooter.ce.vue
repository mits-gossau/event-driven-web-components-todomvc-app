<template>
	<footer class="footer" v-if="todoItems.length > 0">
		<!-- This should be `0 items left` by default -->
		<span class="todo-count"><strong>{{todoItemsLeft}}</strong> item left</span>
		<!-- Remove this if you don't implement routing -->
		<ul class="filters">
		<li>
			<a :class="{selected: currentRoute !== 'active' && currentRoute !== 'completed'}" href="#/">All</a>
		</li>
		<li>
			<a :class="{selected: currentRoute === 'active'}" href="#/active">Active</a>
		</li>
		<li>
			<a :class="{selected: currentRoute === 'completed'}" href="#/completed">Completed</a>
		</li>
		</ul>
		<!-- Hidden if no completed items are left ↓ -->
		<ui-button v-if="todoItems.some(item => item.completed)" @hello="sayhello"  @click="clearCompleted">Clear completed</ui-button>
	</footer>
</template>
<script setup>
	import { currentRoute } from '../composables/useCurrentRoute';
	import { todoItems, todoItemsLeft, clearCompleted } from '../composables/useTodoItems';

	const sayhello = (event) => {
		console.log('hi', event.detail.value)
	}
</script>
<style>
	.footer {
		color: #777;
		padding: 10px 15px;
		height: 20px;
		text-align: center;
		border-top: 1px solid #e6e6e6;
		--color: green;
	}

	.footer:before {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 50px;
		overflow: hidden;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
					0 8px 0 -3px #f6f6f6,
					0 9px 1px -3px rgba(0, 0, 0, 0.2),
					0 16px 0 -6px #f6f6f6,
					0 17px 2px -6px rgba(0, 0, 0, 0.2);
	}

	.todo-count {
		float: left;
		text-align: left;
	}

	.todo-count strong {
		font-weight: 300;
	}

	.filters {
		margin: 0;
		padding: 0;
		list-style: none;
		position: absolute;
		right: 0;
		left: 0;
	}

	.filters li {
		display: inline;
	}

	.filters li a {
		color: inherit;
		margin: 3px;
		padding: 3px 7px;
		text-decoration: none;
		border: 1px solid transparent;
		border-radius: 3px;
	}

	.filters li a:hover {
		border-color: rgba(175, 47, 47, 0.1);
	}

	.filters li a.selected {
		border-color: rgba(175, 47, 47, 0.2);
	}

	ui-button,
	ui-button:active {
		float: right;
		position: relative;
		line-height: 20px;
		text-decoration: none;
		cursor: pointer;
	}

	ui-button:hover {
		text-decoration: underline;
	}
</style>
