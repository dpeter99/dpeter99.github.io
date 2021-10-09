---
title: Archivist
slug: archivist
description: Archivist is a unoppinionated static site generator
author: null
date: '2021-10-08T17:52:23.980Z'
lastmod: '2021-10-09T12:48:43.016Z'
draft: false
tags: []
categories:
    - project
highlited: true
status:
    - active
    - done
---

Archivist is a static site generator that generated this very page you are reading and everything on this site.

Archivist is currently in alpha but, I consider most of the API stable. But it can still change, so any feedback is appreciated.

## Why?
The need for Archivist first came to me when trying out [Bikeshed](https://github.com/tabatkins/bikeshed) [^bikeshed].
I needed something to generate single-page sites for me, but I found that Bikesed was lacking. 
So came Archivist, my static site generator that would allow as much customization as one could want.

## How it works
Archivist is a pipeline base system where the pipelines run a set of user-defined modules. Each module transforms the files as it wants. (Render markdown, remove a section, etc.)
There are a set of built-in modules that help with first-time setup, but if one needs they can rewrite any or even all of the modules. This allows the user to swap out core components such as the markdown renderer or the template engine. This is usually not allowed by other generators. By allowing this much flexibility Archivist is more of a framework than a traditional site generator.

Archivist is written for the Deno runtime. what this means is that for the use of the generator you don't need to download massive npm packages. It can be run in any folder as long as you have Deno itself downloaded.
This is possible because Deno uses the proper URL includes and caches the results. Deno can also be configured to only allow reading, writing in certain folders to increase security.

## Who is it for?
Because archivist is not an out of box solution and needs some level of programming knowledge to set up, it is targeted towards programmers or sites that have a dedicated programmer.



[^bikeshed]: Bikeshed was not able to generate markdown tables. And according to a discussion on GitHub, the creator wasn't willing to add it, as it already supported manually creating HTML tables. This was not an option for me.
