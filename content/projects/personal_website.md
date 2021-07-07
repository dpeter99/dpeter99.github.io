---
title: "Personal website"
date: 2021-07-07T13:10:53+02:00
draft: false
highlighted: true
description: "The website you are on right now. It lists most of my current and old projects, and in the future some posts as well."
state: "active"
---

As in this website. 😀

The site is automatically built form the source files hosted on github, and published to the gh-pages branch. I'm using GH pages for the hosting.

### The setup
This site uses Hugo to build the static files that get served. This means that all of the pages get generated from ``.md`` files. This makes adding and changeling content really easy, no need to touch html files. Adding a new project or post is as simple as adding a new ``.md`` file in the correct folder. From there it choses the correct template to generate the rest of the page. The templates are in the theme, witch I'm making from the ground up. Currently I use webpack to package and compile the theme. This is needed for scss compilation and later TS compilation as well.

### The theme
The theme is using SCSS for the styles.
SCSS allows for more descriptive styles and also the creation of reusable components. With this I can make so called ``mixin``s that can be included into multiple styles later. For example this is what I use for media selectors:
```scss {linenos=table,hl_lines=[1],linenostart=1}
@include mixins.media-breakpoint-up(lg) { 
    grid-template-columns: repeat(2, minmax(240px, 1fr));
}
```
This than when scss compiles gets converted to the appropriate media query.

SCSS needs to be compiled to normal css that every browser can understand. This is done by webpack and the ``sass-loader`` plugin.
