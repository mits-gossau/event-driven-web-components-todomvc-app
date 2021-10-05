<template>
	<input id="toggle-all" class="toggle-all" type="checkbox">
	<label @click="toggleAll" for="toggle-all">Mark all as complete</label>
	<ul class="todo-list">
		<TodoItem
			v-for="item in todoItems"
			:key="item.id"
			:item="item"
		/>
	</ul>
</template>
<script setup>
	import TodoItem from './TodoItem.vue';
	import { todoItems, toggleAll } from '../composables/useTodoItems';
</script>
