// @ts-check

/* global CustomEvent */
/* global HTMLElement */

/**
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class ToggleAll
 */
export default class ToggleAll extends HTMLInputElement {
  constructor () {
    super()

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
  }

  connectedCallback () {
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
  }
}
