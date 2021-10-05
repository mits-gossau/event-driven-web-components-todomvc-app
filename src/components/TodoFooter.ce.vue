<template>
  <footer class="footer" v-if="state.items.length > 0">
      <!-- This should be `0 items left` by default -->
      <span class="todo-count"><strong>{{itemsLeft}}</strong> item left</span>
      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a :class="{selected: getCurrentRoute !== 'active' && getCurrentRoute !== 'completed'}" href="#/">All</a>
        </li>
        <li>
          <a :class="{selected: getCurrentRoute === 'active'}" href="#/active">Active</a>
        </li>
        <li>
          <a :class="{selected: getCurrentRoute === 'completed'}" href="#/completed">Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed" v-if="state.items.some(item => item.completed)" @click="clearCompleted">Clear completed</button>
  </footer>
</template>
<script setup>
	import { inject } from 'vue';
  import { getCurrentRoute } from '../composables/useCurrentRoute';

	const state = inject('state')
	const itemsLeft = inject('itemsLeft')
	const clearCompleted = inject('clearCompleted')

</script>
<style>
</style>
