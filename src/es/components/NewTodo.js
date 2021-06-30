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
      if (!this.value || (event.keyCode !== undefined && event.keyCode !== 13)) return
      const value = this.value
      this.value = ''
      this.dispatchEvent(new CustomEvent(this.getAttribute('new-todo') || 'new-todo', {
        detail: {
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
