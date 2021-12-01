import BaseElement from '../../core/BaseElement';

import template from './Checkbox.html';
import styles from './Checkbox.css';

class Checkbox extends BaseElement {
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
    this.setClassName('my-checkbox');
    this.setTemplate(template, styles);

    this.querySelector('span').textContent = this.label;

    this.onChange = this.onChange.bind(this);
    this.onRemove = this.onRemove.bind(this);

    // Adds change listener
    this.querySelector('input')
      .addEventListener('change', this.onChange);

    // Adds remove button click listener
    this.querySelector('button')
      .addEventListener('click', this.onRemove);

    console.log('Checkbox.connectedCallback', this.name);
  }

  disconnectedCallback() {
    // Removes change listener
    this.querySelector('input')
      .removeEventListener('change', this.onChange);

    // Removes emove button click listener
    this.querySelector('button')
      .removeEventListener('click', this.onRemove);

    console.log('Checkbox.disconnectedCallback', this.name);
  }

  // CUSTOM METHODS

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

customElements.define('my-checkbox', Checkbox);

export default Checkbox;
