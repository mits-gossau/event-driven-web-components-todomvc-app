<template>
	<input id="toggle-all" class="toggle-all" type="checkbox">
	<label @click="toggleAll()" for="toggle-all">Mark all as complete</label>
	<ul class="todo-list">
		<TodoItem
			v-for="item in state.items"
			:key="item.id"
			:item="item"
		/>
	</ul>
</template>
<script setup>
	import { inject } from 'vue';
	import TodoItem from './TodoItem.vue';

	const state = inject('state')
	const toggleAll = inject('toggleAll')

</script>
