<template>
	<input id="toggle-all" class="toggle-all" type="checkbox" />
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

<style>
.toggle-all {
	width: 1px;
	height: 1px;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
	right: 100%;
	bottom: 100%;
}

.toggle-all + label {
	width: 60px;
	height: 34px;
	font-size: 0;
	position: absolute;
	top: 13px;
	left: -13px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.toggle-all + label:before {
	content: '❯';
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
	color: #737373;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>
