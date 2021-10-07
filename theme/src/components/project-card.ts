import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import './project-title'

import style1 from './project-card.scss?lit';

@customElement('project-card')
export class ProjectCard extends LitElement {

  @property()
  href:string

  render() {
    return html`
      <div class="card card--outline">
        <a class="card__link" href="${this.href}"></a>
        <slot></slot>
        <slot name="description"></slot>        
      </div>
    `;
  }

  static get styles() {
		return [style1];
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "project-card": ProjectCard,
  }
}