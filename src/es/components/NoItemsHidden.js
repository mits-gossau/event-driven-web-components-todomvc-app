// @ts-check

/* global HTMLElement */
/* global self */

/**
 * NoItemsHidden
 *
 * @export
 * @class NoItemsHidden
 */
export default class NoItemsHidden extends HTMLElement {
  constructor () {
    super()

    this.hidden = true
    this.allItemsListener = event => (this.hidden = !event.detail.items.length)
  }

  connectedCallback () {
    self.addEventListener('all-items', this.allItemsListener)
  }

  disconnectedCallback () {
    self.removeEventListener('all-items', this.allItemsListener)
  }
}
