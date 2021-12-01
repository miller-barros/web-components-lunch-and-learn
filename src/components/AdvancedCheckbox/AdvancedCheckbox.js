import BaseShadowElement, { SHADOWS } from '../../core/BaseShadowElement';

import template from './AdvancedCheckbox.html';
import styles from './AdvancedCheckbox.css';

class AdvancedCheckbox extends BaseShadowElement {
  static get observedAttributes() {
    return ['label'];
  }

  // It will cause and error if instantiated using document.createElement('my-checkbox')
  // The constructor shouldn't have any DOM interaction
  // constructor() {
  //   super();
  //   this.setClassName('my-checkbox');
  //   this.setTemplate(template, styles);
  //   ...
  // }

  // ATTRIBUTE GETTERS

  get label() {
    return this.getAttribute('label');
  }

  get name() {
    return this.getAttribute('name');
  }

  // LIFECYCLE METHODS

  connectedCallback() {
    const shadow = this.shadowRoot;
    // const shadow = SHADOWS.get(this);

    this.setClassName('my-checkbox');

    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);

    // For template tag
    // shadow.appendChild(document.getElementById('checkbox-template').content.cloneNode(true));
    // this.setStyles(styles);

    // For template string
    this.setTemplate(template, styles);
    this.updateLabel();

    // Adds change listener
    shadow.querySelector('input')
      .addEventListener('change', this.onChange);

    // Adds remove button click listener
    shadow.querySelector('button')
      .addEventListener('click', this.onRemove);

    console.log('AdvancedCheckbox.connectedCallback', this.name);

    this.ready = true;
  }

  disconnectedCallback() {
    const shadow = this.shadowRoot;
    // const shadow = SHADOWS.get(this);

    // Removes change listener
    shadow.querySelector('input')
      .removeEventListener('change', this.onChange);

    // Removes emove button click listener
    shadow.querySelector('button')
      .removeEventListener('click', this.onRemove);

    console.log('AdvancedCheckbox.disconnectedCallback', this.name);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // prevents DOM interaction before connectedCallback to be called
    if (!this.ready) return;

    if (name === 'label') this.updateLabel();

    console.log('AdvancedCheckbox.attributeChangedCallback', this.name, {
      name,
      oldValue,
      newValue,
    });
  }

  // CUSTOM METHODS

  updateLabel() {
    const shadow = this.shadowRoot;
    // const shadow = SHADOWS.get(this);

    shadow.querySelector('span').textContent = this.label;
  }

  onChange(e) {
    e.stopPropagation();

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        name: this.name,
        checked: e.target.checked,
      },
    }));
  }

  onRemove() {
    this.remove();
    this.dispatchEvent(new CustomEvent('remove', {
      detail: {
        name: this.name,
      },
    }));
  }
}

customElements.define('adv-checkbox', AdvancedCheckbox);

export default AdvancedCheckbox;
