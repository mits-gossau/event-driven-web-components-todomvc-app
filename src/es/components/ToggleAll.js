// @ts-check

/* global CustomEvent */
/* global HTMLInputElement */
/* global self */

/**
 * ToggleAll toggles all todos as done or not
 *
 * @export
 * @class ToggleAll
 */
export default class ToggleAll extends HTMLInputElement {
  constructor () {
    super()

    this.checked = false
    this.clickListener = event => {
      this.dispatchEvent(new CustomEvent('toggle-all', {
        detail: {
          checked: this.checked
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.allItemsListener = event => {
      // console.log('changed', event);
      this.checked = event.detail.allChecked
    }
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
