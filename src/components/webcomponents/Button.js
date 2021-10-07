export default class Button extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({mode: 'open'});
	}

	connectedCallback(){
		this.render();
		this.dispatchEvent(new CustomEvent('hello',{
			detail: {value: 'hey'},
			bubbles: true,
			cancelable: true,
			composed: true
		  }))
	}

	render(){
		this.shadowRoot.innerHTML = /* html */ `
			<style>
				button {
				margin: 0;
				padding: 0;
				border: 0;
				background: none;
				font-size: 100%;
				vertical-align: baseline;
				font-family: inherit;
				font-weight: inherit;
				color: inherit;
				-webkit-appearance: none;
				appearance: none;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}
			</style>
			<button>${this.innerHTML}</button>
		`
	}
}
