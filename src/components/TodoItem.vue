<template>
	<!-- These are here just to show the structure of the list items -->
	<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
	<li :class="{'completed': item.completed, 'editing': isEditing }" @dblclick="onDblClick(item)">
		<div class="view">
			<input class="toggle" type="checkbox" @click="checkedListener(item.id)" :checked="item.completed">
			<label>{{item.title}}</label>
			<button class="destroy"></button>
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

	const items = inject('items')
	const updateItems = inject('updateItems')

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

	const checkedListener = (id) => {
		items.forEach(item => {
			if(item.id === id) item.completed = !item.completed
		});
		updateItems()
	}

	const resetInput = (item) => {
		item.title = tempVal;
		isEditing.value = false;
	}

	const updateInput = () => {
		updateItems();
		isEditing.value = false;
	}

</script>
