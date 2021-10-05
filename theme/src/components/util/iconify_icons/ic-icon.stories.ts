import { html } from 'lit';
import { icons, statusToIcons } from './../../../icons';

import './ic-icon';

// This default export determines where your story goes in the story list
export default {
  title: 'YourComponent',
};

// 👇 We create a “template” of how args map to rendering
const Template = ({ aProperty }) => html`<ic-icon .icon=${aProperty}></ic-icon>`;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* 👇 The args you need here will depend on your component */
  aProperty: icons['mdi:wrench']
};