import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import './project-title'

import style1 from './project-card.scss?lit';

console.log(style1);

@customElement('project-card')
export class ProjectCard extends LitElement {

  render() {
    return html`
      <div class="card card--outline">
        <a class="card__link" href="{{.Permalink}}"></a>
        <slot></slot>

        <p> <%= meta.description %> <!--{{.Description}}--></p>

        
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