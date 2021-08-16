<template>
	<input class="new-todo" v-model="inputValue" @keyup.enter="updateListener" placeholder="What needs to be done?" autofocus>
</template>

<script setup>
import { inject, ref } from 'vue';

let inputValue = ref('')

const state = inject('state')
const addItem = inject('addItem')

const updateListener = () => {
	const newTodo = {
		'id': state.items.length,
		'title': inputValue.value,
		'checked': false
	}
	addItem(newTodo)
	inputValue.value = ''
}

</script>
