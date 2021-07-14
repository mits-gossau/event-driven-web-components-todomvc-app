<template>
	<!-- These are here just to show the structure of the list items -->
	<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
	<li :class="{'completed': checked, 'editing': state.isEditing }" @click="onDblClick">
		<div class="view">
			<input class="toggle" type="checkbox" :checked="checked">
			<label>{{value}}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
</template>
<script setup>
import { defineProps, reactive } from 'vue';

	let state = reactive({ isEditing: false });

	defineProps({
		value: String,
		checked: Boolean
	});

	const onDblClick = () => {
		console.log('hello')
		state.isEditing = !state.isEditing;
	}
</script>
