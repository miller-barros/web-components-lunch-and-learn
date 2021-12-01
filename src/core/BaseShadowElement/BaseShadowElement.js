export const SHADOWS = new WeakMap();

class BaseShadowElement extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    // const shadow = this.attachShadow({ mode: 'closed' });

    SHADOWS.set(this, shadow);

    // console.log({ shadow, shadowRoot: this.shadowRoot });
  }

  setClassName(className) {
    this.classList.add(className);
  }

  setTemplate(template, styles) {
    SHADOWS.get(this).innerHTML = template;

    if (styles) {
      this.setStyles(styles);
    }
  }

  setStyles(styles) {
    const style = document.createElement('style');
    style.textContent = styles;

    SHADOWS.get(this).prepend(style);
  }
}

export default BaseShadowElement;
