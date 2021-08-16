<template>
	<!-- These are here just to show the structure of the list items -->
	<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
	<li :class="{'completed': item.completed, 'editing': isEditing }" @dblclick="onDblClick(item)">
		<div class="view">
			<input class="toggle" type="checkbox" @click="checkItem(item.id)" :checked="item.completed">
			<label>{{item.title}}</label>
			<button class="destroy" @click="deleteItem(item.id)"></button>
		</div>
		<input class="edit"
			ref="inputEdit"
			@blur="updateInput()"
			@keyup.esc="resetInput(item)"
			@keyup.enter="updateInput()"
			v-model="item.title"
		>
	</li>
</template>
<script setup>
import { ref, inject, nextTick } from 'vue';

	const updateItem = inject('updateItem')
	const deleteItem = inject('deleteItem')
	const checkItem = inject('checkItem')

	let isEditing = ref(false);
	const inputEdit = ref(null)

	let tempVal = ''

	defineProps({
		item: Object,
	});

	const onDblClick = async (item) => {
		tempVal = item.title;
		console.log(tempVal);
		isEditing.value = true;
		await nextTick()
		inputEdit.value.focus();
	}

	const resetInput = (item) => {
		item.title = tempVal;
		isEditing.value = false;
	}

	const updateInput = () => {
		updateItem();
		isEditing.value = false;
	}

</script>
