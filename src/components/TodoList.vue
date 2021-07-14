<template>
	<ul class="todo-list">
		<TodoItem
			v-for="item in items"
			:key="item.id"
			:checked="item.checked"
			:value="item.value"
		/>
	</ul>
</template>
<script setup>
	import TodoItem from './TodoItem.vue';

	const items = [
		{
			id: 1,
			checked: false,
			value: 'Item 1'
		},
		{
			id: 2,
			checked: true,
			value: 'Item 2'
		}
	];
</script>
