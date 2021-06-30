// @ts-check

/* global CustomEvent */
/* global HTMLUListElement */

/**
 * TodoList
 *
 * @export
 * @class TodoList
 */
export default class TodoList extends HTMLUListElement {
  constructor () {
    super()

    this.updateListener = event => {
      this.saveAllItems()
      this.dispatchAllItems()
    }
    this.newTodoListener = event => this.loadTodoItem().then(TodoItem => {
      this.appendChild(new TodoItem(event.detail.value))
      this.updateListener(event)
    })
    this.toggleAllListener = event => setTimeout(() => this.updateListener(event), 5)
    this.clearCompletedListener = event => {
      this.items.forEach(item => {
        if (item.checked) item.remove()
      })
      this.updateListener(event)
    }
  }
  
  connectedCallback () {
    self.addEventListener('new-todo', this.newTodoListener)
    self.addEventListener('toggle-all', this.toggleAllListener)
    self.addEventListener('clear-completed', this.clearCompletedListener)
    this.addEventListener('edit', this.updateListener)
    this.addEventListener('toggle', this.updateListener)
    this.addEventListener('destroy', this.updateListener)
    this.loadAllItems().then(() => this.dispatchAllItems())
  }

  disconnectedCallback () {
    self.removeEventListener('new-todo', this.newTodoListener)
    self.removeEventListener('toggle-all', this.toggleAllListener)
    self.removeEventListener('clear-completed', this.clearCompletedListener)
    this.removeEventListener('edit', this.updateListener)
    this.removeEventListener('toggle', this.updateListener)
    this.removeEventListener('destroy', this.updateListener)
  }

  /**
   * fetch TodoItem.js
   *
   * @returns {Promise<CustomElementConstructor|any>}
   */
  loadTodoItem () {
    return this.childComponentsPromise || (this.childComponentsPromise = import('./TodoItem.js').then(module => {
      if (!customElements.get('todo-item')) customElements.define('todo-item', module.default)
      return module.default
    }))
  }

  dispatchAllItems () {
    const items = this.items
    this.dispatchEvent(new CustomEvent('all-items', {
      detail: {
        allChecked: items.every(item => item.checked),
        itemsUnchecked: items.filter(item => !item.checked),
        items
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  saveAllItems () {
    localStorage.clear()
    this.items.forEach((item, i) => localStorage.setItem(item.value, `${i}|${item.checked}`))
  }

  /**
   * @return {Promise}
   */
  loadAllItems () {
    return Promise.all(Object.keys(localStorage).sort((a, b) => Number(localStorage.getItem(a).split('|')[0]) - Number(localStorage.getItem(b).split('|')[0])).map(key => this.loadTodoItem().then(TodoItem => this.appendChild(new TodoItem(key, localStorage.getItem(key).split('|')[1] === 'true')))))
  }

  /**
   * @readonly
   * @return {any}
   */
  get items () {
    return Array.from(this.querySelectorAll('todo-item:not([remove])'))
  }
}
