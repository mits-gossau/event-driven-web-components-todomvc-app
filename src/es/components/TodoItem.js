// @ts-check

/* global customElements */
/* global CustomEvent */
/* global HTMLElement */
/* global location */
/* global self */

/**
 * TodoItem
 *
 * @export
 * @class TodoItem
 */
export default class TodoItem extends HTMLElement {
  constructor (value, checked = false) {
    super()

    this.value = value
    this.checked = checked
    this.inputListener = event => {
      if (event.target === this.checkbox) {
        this.checked = this.checkbox.checked
        this.hashchangeListener()
        this.dispatchEvent(new CustomEvent('toggle', {
          detail: {
            item: this,
            checked: this.checked
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
    }
    this.clickListener = event => {
      if (event.target === this.button) {
        this.setAttribute('remove', 'true')
        this.dispatchEvent(new CustomEvent('destroy', {
          detail: {
            item: this,
            value: this.input.value
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
        this.remove()
      }
    }
    this.dblclickListener = event => {
      this.li.classList.toggle('editing')
      this.input.focus()
    }
    this.editListener = event => {
      if (!event.detail.escape && !event.detail.value) return this.clickListener({ target: this.button }) // destroy
      if (!event.detail.escape) this.value = event.detail.value
      // the lines below could be spared by simply this.render() but then the elements would be recreated
      this.li.classList.remove('editing')
      this.label.textContent = this.value
      this.input.value = this.value // reapply the value, since the NewTodo.js input field is going to clear itself before emitting the event
    }
    this.toggleAllListener = event => {
      this.checked = event.detail.checked
    }
    this.hashchangeListener = event => (this.hidden = this.isHidden())
  }

  connectedCallback () {
    if (this.shouldComponentRender()) this.render()
    this.addEventListener('input', this.inputListener)
    this.addEventListener('click', this.clickListener)
    this.addEventListener('dblclick', this.dblclickListener)
    this.addEventListener('edit', this.editListener)
    self.addEventListener('toggle-all', this.toggleAllListener)
    self.addEventListener('hashchange', this.hashchangeListener)
    this.hashchangeListener()
  }

  disconnectedCallback () {
    this.removeEventListener('input', this.inputListener)
    this.removeEventListener('click', this.clickListener)
    this.removeEventListener('dblclick', this.dblclickListener)
    this.removeEventListener('edit', this.editListener)
    self.removeEventListener('toggle-all', this.toggleAllListener)
    self.removeEventListener('hashchange', this.hashchangeListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRender () {
    return !this.innerHTML
  }

  render () {
    this.loadNewTodo().then(TodoItem =>
      (this.innerHTML = `
        <li ${this.checked ? 'class="completed"' : ''}>
          <div class="view">
            <input class="toggle" type="checkbox" ${this.checked ? 'checked' : ''}>
            <label>${this.value}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${this.value}" is="new-todo" new-todo="edit" allow-empty>
        </li>
      `)
    )
  }

  /**
   * fetch NewTodo.js
   *
   * @returns {Promise<CustomElementConstructor|any>}
   */
  loadNewTodo () {
    return this.childComponentsPromise || (this.childComponentsPromise = import('./NewTodo.js').then(module => {
      if (!customElements.get('new-todo')) customElements.define('new-todo', module.default)
      return module.default
    }))
  }

  isHidden () {
    return location.hash.includes('completed') && !this.checked ? true : !!(location.hash.includes('active') && this.checked)
  }

  get li () {
    return this.querySelector('li')
  }

  /**
   * @readonly
   * @return {HTMLInputElement}
   */
  get checkbox () {
    return this.querySelector('input[type=checkbox]')
  }

  get label () {
    return this.querySelector('label')
  }

  get button () {
    return this.querySelector('button')
  }

  /**
   * @readonly
   * @return {HTMLInputElement}
   */
  get input () {
    return this.querySelector('input.edit')
  }

  get checked () {
    return this._checked
  }

  set checked (checked) {
    this._checked = checked
    if (this.checkbox) this.checkbox.checked = checked
    if (this.li) this.li.classList[checked ? 'add' : 'remove']('completed')
  }
}
