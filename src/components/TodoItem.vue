<template>
	<!-- These are here just to show the structure of the list items -->
	<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
	<li
		:class="{'completed': item.completed, 'editing': isEditing }"
		v-if="showItem"
	>
		<div class="view">
			<input class="toggle" type="checkbox" @click="checkItem(item.id)" :checked="item.completed">
			<label @dblclick="onDblClick(item)">{{item.title}}</label>
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
	import { ref, unref, nextTick, computed } from 'vue';
	import { currentRoute } from '../composables/useCurrentRoute';
	import { updateItem, deleteItem, checkItem } from '../composables/useTodoItems';

	const props = defineProps({
		item: Object,
	});

	let isEditing = ref(false);
	const inputEdit = ref(null)
	let tempVal = ''

	const showItem = computed(() => unref(currentRoute) === 'active' && !props.item.completed ||
	unref(currentRoute) === 'completed' && props.item.completed ||
	unref(currentRoute) !== 'active' && unref(currentRoute) !== 'completed');

	const onDblClick = async (item) => {
		tempVal = item.title;
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
