<template>
	<input
		class="new-todo"
		v-model="inputValue"
		@keyup.enter="updateListener"
		placeholder="What needs to be done?"
		autofocus
	/>
</template>

<script setup>
import { ref } from 'vue';
import { addItem } from '../composables/useTodoItems';

let inputValue = ref('');

const updateListener = () => {
	const title = inputValue.value.trim();
	if (!title) return;

	const newTodo = {
		title: title,
		checked: false,
	};
	addItem(newTodo);
	inputValue.value = '';
};
</script>

<style>
.new-todo,
.edit {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	border: 0;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.new-todo {
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.new-todo:focus {
	outline: 0;
}

input::-webkit-input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

input::-moz-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

input::input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}
</style>
