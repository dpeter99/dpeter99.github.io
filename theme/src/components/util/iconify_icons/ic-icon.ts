import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { IconifyIconService } from './ic-icon-service';

@customElement('ic-icon')
export class IconifyIconComponent extends LitElement {

    @property({ attribute: false })
    iconData: {body:string}

    @property()
    icon: string

    render() {
        if(this.icon != undefined){
            this.iconData = IconifyIconService.getIcon(this.icon);
        }
        
        let svg;

        if(this.iconData?.body != undefined){
            svg = html`
                ${unsafeSVG(this.iconData.body)}
            `
        }
        else{
            svg = html``;
        }

        return html`   
        <svg>
            ${svg}
        </svg>
        `;
    }

    static get styles() {
        return css`
        svg{
            width:24px;
            height:24px;
        }
        :host{
            width:24px;
            height:24px;
        }
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "ic-icon": IconifyIconComponent,
    }
}