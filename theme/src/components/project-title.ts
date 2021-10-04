import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import style1 from './project-card.scss';

console.log(style1);

@customElement('project-title')
export class ProjectTitle extends LitElement {

    @property()
    title: string;


  render() {
    return html`
    <div class="project-title">
        <h2 class="card__title">
            ${this.title}
        </h2>

        <div class="icons">
            {{ $type := .Param "state" }}

            {{ with or (eq $type "active") (in $type "active") }}
            <span class="iconify" data-icon="mdi:wrench"></span>
            {{ end }}
            {{ with or (eq $type "on-hold") (in $type "on-hold")}}
            <span class="iconify" data-icon="mdi:pause-circle"></span>
            {{ end }}
            {{ with or (eq $type "deep-freezed") (in $type "deep-freezed") }}
            <span class="iconify" data-icon="mdi:snowflake"></span>
            {{ end }}
            {{ with or (eq $type "abandoned") (in $type "abandoned") }}
            <span class="iconify" data-icon="mdi:skull-outline"></span>
            {{ end }}
            {{ with or (eq $type "finished") (in $type "finished") }}
            <span class="iconify" data-icon="mdi:check-decagram"></span>
            {{ end }}
            {{ with (eq $type "not-active") }}
            ...
            {{ end }}

        </div>

        {{ $repo := .Param "repo" }}
        {{ if $repo}}
        <div class="project_links">
            <a href="{{ $repo }}">
                <span class="iconify" data-icon="fa-brands:github"></span>
            </a>
        </div>
        {{ end }}

    </div>
    `;
  }

  static get styles() {
		return [style1];
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "project-title": ProjectTitle,
  }
}