// @ts-check

/* global CustomEvent */
/* global HTMLInputElement */

/**
 * NewTodo is the todo input field as well as used in the TodoItem as edit field
 *
 * @export
 * @class NewTodo
 */
export default class NewTodo extends HTMLInputElement {
  constructor () {
    super()

    this.valueListener = event => {
      if ((event.keyCode !== undefined && event.key !== 'Enter' && event.key !== 'Escape')) return // write if not blur, enter or escape
      if (!this.hasAttribute('allow-escape') && event.key === 'Escape') return this.value = '' // clear on escape
      const value = this.value.trim()
      if (!this.hasAttribute('allow-empty') && !value) return
      this.value = ''
      this.dispatchEvent(new CustomEvent(this.getAttribute('new-todo') || 'new-todo', {
        detail: {
          escape: event.key === 'Escape',
          value
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    this.addEventListener('blur', this.valueListener)
    this.addEventListener('keyup', this.valueListener)
  }

  disconnectedCallback () {
    this.removeEventListener('blur', this.valueListener)
    this.removeEventListener('keyup', this.valueListener)
  }
}
