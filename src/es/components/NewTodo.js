// @ts-check

/* global CustomEvent */
/* global HTMLElement */

/**
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class NewTodo
 */
export default class NewTodo extends HTMLInputElement {
  constructor () {
    super()

    this.valueListener = event => {
      if (event.keyCode !== undefined && event.keyCode !== 13) return
      this.dispatchEvent(new CustomEvent('new-todo', {
        detail: {
          value: this.value
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      this.value = ''
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
