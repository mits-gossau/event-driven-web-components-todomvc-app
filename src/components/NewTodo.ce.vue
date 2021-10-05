<template>
	<input class="new-todo" v-model="inputValue" @keyup.enter="updateListener" placeholder="What needs to be done?" autofocus>
</template>

<script setup>
import { inject, ref } from 'vue';

let inputValue = ref('')

const addItem = inject('addItem')

const updateListener = () => {
	const title = inputValue.value.trim();
	if (!title) return;

	const newTodo = {
		'title': title,
		'checked': false
	}
	addItem(newTodo)
	inputValue.value = ''
}

</script>
