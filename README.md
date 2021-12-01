# Web Components - Lunch & Learn

## What are Web Components?

Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.

Web components are based on existing web standards. Features to support web components are currently being added to the HTML and DOM specs, letting web developers easily extend HTML with new elements with encapsulated styling and custom behavior.

## Specs

Web components are based on four main specifications:

- ES Modules
- Custom Elements
- Shadow DOM
- HTML Template



## ES Modules

The [ES Modules specification](https://html.spec.whatwg.org/multipage/webappapis.html#integration-with-the-javascript-module-system) defines the inclusion and reuse of JS documents in a standards based, modular, performant way.



## Custom Elements

One of the key features of the Web Components system, custom elements allow new HTML tags to be defined. The [Custom Elements specification](https://w3c.github.io/webcomponents/spec/custom) lays the foundation for designing and using new types of DOM elements.

  - Lifecycle hooks
  - Attribute changing observer

### Example:

Javascript:
```js
class MyCustomElement extends HTMLElement {
    static get observedAttributes() {
        return ['my-attribute'];
    }

    constructor() {
        super();
    }

    connectedCallback() {}

    disconnectedCallback() {}

    // Requires explicit declare the observed attributes on observedAttributes
    attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('my-custom-element', MyCustomElement);
```

HTML:
```html
<my-custom-element my-attribute=""></my-custom-element>
```

### Support (source: [caniuse.com/custom-elementsv1](https://caniuse.com/custom-elementsv1)):

- **Safari (cur 15.1)**: 10.1+ partial support - supports "Autonomous custom elements" but not "Customized built-in elements"
- **Safari on iOS (cur 15)**: 10.3+ partial support - supports "Autonomous custom elements" but not "Customized built-in elements"
- **Firefox (cur 94)**: 63+ full support
- **Chrome (cur 96)**: 67+ full support
  - 54-66 partial support - supports "Autonomous custom elements" but not "Customized built-in elements"
- **Edge (cur 96)**: 79+ full support



## Shadow DOM

Method of establishing and maintaining functional boundaries between DOM trees and how these trees interact with each other within a document, thus enabling better functional encapsulation within the DOM & CSS. The [shadow DOM specification](https://w3c.github.io/webcomponents/spec/shadow) defines how to use encapsulated style and markup in web components.

Shadow DOM has two working modes:

- **Open**: exposes the element's Shadow Dom through `Element.shadowRoot`
- **Closed**: doesn't expose the element's Shadow Dom, unless you set it to the instance (e.g. `this.shadow = this.attachShadow({ mode: 'closed' })`)

### Example:

```js
this.attachShadow({ mode: 'open' });
console.log(this.shadowRoot); // -> #shadow-root (open)
```

```js
const shadow = this.attachShadow({ mode: 'closed' });
console.log(this.shadowRoot) // -> null
console.log(shadow) // -> #shadow-root (closed)
```

### Support (source: [caniuse.com/shadowdomv1](https://caniuse.com/shadowdomv1)):
- **Safari (cur 15.1)**: 10+ full support
- **Safari on iOS (cur 15)**: 11+ full support
  - 10-10.3 partial support - certain CSS selectors do no work (`:host > .local-child`) and styling slitted content (`::slotted`) is buggy
- **Firefox (cur 94)**: 63+ full support
- **Chrome (cur 96)**: 53+ full support
- **Edge (cur 96)**: 79+ full support



## HTML templates

Method of declaring a portion of reusable markup that is parsed but not rendered until cloned. The [HTML template element](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) specification defines how to declare fragments of markup that go unused at page load, but can be instantiated later on at runtime.

  - Slots

### Support (source: [caniuse.com/template](https://caniuse.com/template)):
- **Safari (cur 15.1)**: 9+ full support
- **Safari on iOS (cur 15)**: 9+ full support
  - 8-8.4 partial support - does not support `Document.importNode` and `Node.cloneNode` on templates, nested templates or elements that contain templates
- **Firefox (cur 94)**: 22+ full support
- **Chrome (cur 96)**: 35+ full support
  - 26-35 partial support - does not support `Document.importNode` on templates, nested templates or elements that contain templates
- **Edge (cur 96)**: 15+ full support
  - 13-14 partial support - does not support `Document.importNode` and `Node.cloneNode` on templates, nested templates or elements that contain templates
