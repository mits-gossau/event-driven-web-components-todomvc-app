import { reactive, computed } from 'vue';

const state = reactive({
	items: JSON.parse(localStorage.getItem('todos') || '[]').sort((a, b) =>
		Number(a.id)
	),
});

const todoItems = computed(() => state.items);
const todoItemsLeft = computed(
	() => state.items.filter((item) => !item.completed).length
);

const setItems = () => {
	localStorage.setItem('todos', JSON.stringify(state.items));
};

const addItem = (item) => {
	state.items.push(item);
	state.items.forEach((el, index) => (el.id = index));

	setItems();
};

const updateItem = (item) => {
	setItems();
};

const checkItem = (id) => {
	state.items.forEach((el) => {
		if (el.id === id) el.completed = !el.completed;
	});
	setItems();
};

const deleteItem = (id) => {
	state.items = state.items.filter((el) => el.id !== id);
	setItems();
};

const toggleAll = () => {
	state.items.every((el) => el.completed)
		? state.items.map((el) => (el.completed = false))
		: state.items.map((el) => (el.completed = true));
	setItems();
};

const clearCompleted = () => {
	state.items = state.items.filter((el) => !el.completed);
	setItems();
};

export {
	todoItems,
	todoItemsLeft,
	addItem,
	updateItem,
	checkItem,
	deleteItem,
	toggleAll,
	clearCompleted,
};
