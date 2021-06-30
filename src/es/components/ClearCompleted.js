// @ts-check

/* global CustomEvent */
/* global HTMLUListElement */

/**
 * ClearCompleted
 *
 * @export
 * @class ClearCompleted
 */
export default class ClearCompleted extends HTMLButtonElement {
  constructor () {
    super()

    this.clickListener = event => this.dispatchEvent(new CustomEvent('clear-completed', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  connectedCallback () {
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
  }
}
