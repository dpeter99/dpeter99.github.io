import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('icon-row')
export class IconRow extends LitElement {

    @property({type:Array})
    icons:string[]

  render() {
    return html`
    <ul>
        ${this.icons.length}
        ${this.icons.map(i=>
            html`
            <ic-icon .icon=${i}></span>
            `
        )}            
    </ul>
    `;
  }

  static get styles() {
		return css`
        ul{
            display:flex;
            
        }
        `;
  }

}

declare global {
  interface HTMLElementTagNameMap {
    "icon-row": IconRow,
  }
}