// @ts-check

/* global HTMLUListElement */
/* global location */
/* global self */

/**
 * TodoFilters
 *
 * @export
 * @class TodoFilters
 */
export default class TodoFilters extends HTMLUListElement {
  constructor () {
    super()

    this.hashchangeListener = event => this.as.forEach(a => a.classList[location.hash === a.getAttribute('href') ? 'add' : 'remove']('selected'))
  }

  connectedCallback () {
    self.addEventListener('hashchange', this.hashchangeListener)
    this.hashchangeListener()
  }

  disconnectedCallback () {
    self.removeEventListener('hashchange', this.hashchangeListener)
  }

  get as () {
    return Array.from(this.querySelectorAll('a'))
  }
}
