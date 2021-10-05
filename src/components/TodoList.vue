<template>
	<input id="toggle-all" class="toggle-all" type="checkbox">
	<label @click="toggleAll" for="toggle-all">Mark all as complete</label>
	<ul class="todo-list">
		<ui-todo-item
			v-for="item in todoItems"
			:key="item.id"
			.item="item"
		></ui-todo-item>
	</ul>
</template>
<script setup>
	import { todoItems, toggleAll } from '../composables/useTodoItems';
</script>
