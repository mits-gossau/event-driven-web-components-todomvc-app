// @ts-check

/* global CustomEvent */
/* global HTMLInputElement */

/**
 * NewTodo is the todo input field
 *
 * @export
 * @class NewTodo
 */
export default class NewTodo extends HTMLInputElement {
  constructor () {
    super()

    this.valueListener = event => {
      if ((event.keyCode !== undefined && event.key !== 'Enter' && event.key !== 'Escape')) return
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
    this.addEventListener('keypress', this.valueListener)
  }

  disconnectedCallback () {
    this.removeEventListener('blur', this.valueListener)
    this.removeEventListener('keypress', this.valueListener)
  }
}
