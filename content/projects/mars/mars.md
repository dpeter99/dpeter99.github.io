---
title: Mars
date: 2021-07-07T19:26:48.000Z
draft: true
description: Mars is a command parser library designed for ARGUS
state:
  - on-hold
  - finished
lastmod: 2022-03-22T10:05:36.036Z
type: project
---

## Used Tech
- C#

Mars is a command parser library designed for [ARGUS]({{< ref "/projects/ARGUS/ARGUS.md" >}}).

Mars was inspired by Minecraft's Brigadier. It is a library that can parse console commands like ``/quote list 10``.
It uses a simpler approach than what Minecraft's library uses but it suits my needs better and is easier to pares the command tree for other uses.

The library has many unit tests that help with validating that nothing got broken while adding new features.

