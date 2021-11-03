# Event Driven Web Components • [TodoMVC](http://todomvc.com)

> Vanilla JS Web Components in an Event Driven Architecture


## Resources

- [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)


### Articles

- [Build an Event Driven TodoMVC App with 8 lightweight VanillaJS Web Components](https://dev.to/weedshaker/build-an-event-driven-todomvc-app-with-8-lightweight-vanillajs-web-components-5b65)
- [DOM and the event driven architecture - Introduction](https://dev.to/weedshaker/dom-and-the-event-driven-architecture-1519)
- [Web Components and now what?](https://dev.to/weedshaker/web-components-and-now-what-k97)


### Support

- [Twitter](https://twitter.com/weedshaker)

*Let us [know](https://github.com/tastejs/todomvc/issues) if you discover anything worth sharing.*


## Browser compatibility
- [IOS does not yet support "is"](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is), even though I used it deliberately. You can at anytime fall back to use web components without ["is"](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) => https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define and then it will work in any modern browser.


## Implementation

Frontend Event Driven Architecture works basically like the DOM itself. There are loosely coupled components (nodes), which emit events and those get captured by other components. They may also emit events on their behalf, which can be consumed.

