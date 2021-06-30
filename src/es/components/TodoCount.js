// @ts-check

/* global HTMLElement */
/* global self */

/**
 * TodoCount
 *
 * @export
 * @class TodoCount
 */
export default class TodoCount extends HTMLElement {
  constructor () {
    super()

    this.allItemsListener = event => {
      this.strong.textContent = event.detail.itemsUnchecked.length
      if (event.detail.itemsUnchecked.length === 1) {
        this.innerHTML = this.innerHTML.replace('items', 'item')
      } else {
        this.innerHTML = this.innerHTML.replace('item ', 'items ')
      }
    }
  }

  connectedCallback () {
    self.addEventListener('all-items', this.allItemsListener)
  }

  disconnectedCallback () {
    self.removeEventListener('all-items', this.allItemsListener)
  }

  get strong () {
    return this.querySelector('strong')
  }
}
