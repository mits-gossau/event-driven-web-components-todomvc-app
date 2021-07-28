<template>
	<input class="new-todo" v-model="inputValue" @keyup.enter="updateListener" placeholder="What needs to be done?" autofocus>
</template>

<script setup>
import { inject, ref } from 'vue';

let inputValue = ref('')

const items = inject('items')
const updateItems = inject('updateItems')

const updateListener = () => {
	const newTodo = {
		'id': items.length,
		'title': inputValue.value,
		'checked': false
	}
	items.push(newTodo)
	updateItems()
	inputValue.value = ''
}

</script>
