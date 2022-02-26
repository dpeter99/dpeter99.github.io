---
type: project
title: Apophis
slug: apophis
description: null
author: null
date: '2022-02-26T14:27:38.781Z'
lastmod: '2022-02-26T14:50:55.992Z'
draft: true
tags: []
categories: []
highlited: false
status: null
---

Aphophis is a small university game engine. It was made for a Kotlin course as a homework.
It is not designed to be blazing fast but as a testbed for new ideas. The fact that it is written in a managed language (Kotlin running on JVM) makes rapid testing easier.

This is a low priority project and only gets developed when I don't have time or resources to work on some of the bigger projects.
Because it is written in Kotlin I'm not planning on developing it further than a testbed for ideas. This is not because it is impossible to write performant good engines in Kotlin or Java but because I'm not fully comfortable with the language and I already have a game engine in C++ called ShadowEngine.

# Basic structure

## The engine
Apophis engine has the core rendering loop and entity management. And any basic functionality that is needed for games.
This includes the experimental Compose UI and the new input system.

### The entities
The entity system closely follows the one I made for ShadowEngine. It is based on the fact that all entities have an internal and external hierarchy. This allows entities to have complex internal structure as opposed to what for example unity has with a flat component list.

### The in game UI
This was one of the bigger experiments in during development. The engine provides the Compose Desktop UI library as the main in game UI solution.
This means that one could theoretically use the same code for the game interface as they use for an android app.
Achieving this was surprisingly easy, tho currently no input is propagated to the Compose subsystem. For that the new input system needs to be finished.

### The input system
This is another experiment that I'm using the engine for. The idea is to provide an extensible and highly configurable input system. Others usually call such a highly complex system an Action system as it abstracts all actual device inputs to actions that are meaningful form a game play perspective. Most of the functionality is modelled after what the "New input system" is capable of in Unity.
If this version proves to be useful it will be ported over to ShadowEngine, and replace the one that exists there.

## The editor
The editor is the part of the engin that has the inspectors and hierarchy displays and helps run the game in a Unity/UE4 style.
It acts as a wrapper around the main engine core and passes any relevant events to it.
