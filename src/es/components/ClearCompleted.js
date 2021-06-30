// @ts-check

/* global CustomEvent */
/* global HTMLButtonElement */

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
    this.allItemsListener = event => (this.hidden = event.detail.itemsUnchecked.length === event.detail.items.length)
  }

  connectedCallback () {
    this.addEventListener('click', this.clickListener)
    self.addEventListener('all-items', this.allItemsListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
    self.removeEventListener('all-items', this.allItemsListener)
  }
}
