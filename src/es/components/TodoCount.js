// @ts-check

/* global CustomEvent */
/* global HTMLInputElement */

/**
 * TodoCount
 *
 * @export
 * @class TodoCount
 */
export default class TodoCount extends HTMLElement {
  constructor () {
    super()

    this.allItemsListener = event => this.textContent = event.detail.itemsUnchecked.length
  }

  connectedCallback () {
    self.addEventListener('all-items', this.allItemsListener)
  }

  disconnectedCallback () {
    self.removeEventListener('all-items', this.allItemsListener)
  }
}
