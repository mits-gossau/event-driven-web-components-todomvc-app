<template>
	<ul class="todo-list">
		<TodoItem
			v-for="item in items"
			:key="item.id"
			:item="item"
		/>
	</ul>
</template>
<script setup>
	import { inject } from 'vue';
	import TodoItem from './TodoItem.vue';

	const items = inject('items')

	console.log(items);

	// Promise.all(JSON.parse(localStorage.getItem('todos-eventdriven') || '[]').sort((a, b) => Number(a.id) - Number(b.id)).map(item => this.loadTodoItem().then(TodoItem => this.appendChild(new TodoItem(item.title, item.completed === 'true')))))}/** * @readonly * @return {any} */get items () {return Array.from(this.querySelectorAll('todo-item:not([remove])'))}}
</script>
