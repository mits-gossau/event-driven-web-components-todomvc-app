<template>
	<!-- These are here just to show the structure of the list items -->
	<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
	<li
		:class="{ completed: item.completed, editing: isEditing }"
		v-if="showItem"
	>
		<div class="view">
			<input
				class="toggle"
				type="checkbox"
				@click="checkItem(item.id)"
				:checked="item.completed"
			/>
			<label @dblclick="onDblClick(item)">{{ item.title }}</label>
			<ui-button @click="deleteItem(item.id)"></ui-button>
		</div>
		<input
			class="edit"
			ref="inputEdit"
			@blur="updateInput()"
			@keyup.esc="resetInput(item)"
			@keyup.enter="updateInput()"
			v-model="item.title"
		/>
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
const inputEdit = ref(null);
let tempVal = '';

const showItem = computed(
	() =>
		(unref(currentRoute) === 'active' && !props.item.completed) ||
		(unref(currentRoute) === 'completed' && props.item.completed) ||
		(unref(currentRoute) !== 'active' &&
			unref(currentRoute) !== 'completed')
);

const onDblClick = async (item) => {
	tempVal = item.title;
	isEditing.value = true;
	await nextTick();
	inputEdit.value.focus();
};

const resetInput = (item) => {
	item.title = tempVal;
	isEditing.value = false;
};

const updateInput = () => {
	updateItem();
	isEditing.value = false;
};
</script>

<style>
li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

li:last-child {
	border-bottom: none;
}

li.editing {
	border-bottom: none;
	padding: 0;
}

li.editing .edit {
	display: block;
	width: 506px;
	padding: 12px 16px;
	margin: 0 0 0 43px;
}

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

li.editing .edit:focus {
	outline: 0;
}

li.editing .view {
	display: none;
}

li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

li .toggle {
	opacity: 0;
}

li .toggle + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
	background-repeat: no-repeat;
	background-position: center left;
}

li .toggle:checked + label {
	background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

li label {
	word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

li.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

li ui-button {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: -12px;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

li ui-button:hover {
	color: #af5b5e;
}

li ui-button:after {
	content: '×';
}

li:hover ui-button {
	display: block;
}

li .edit {
	display: none;
}

li.editing:last-child {
	margin-bottom: -1px;
}
</style>
