---
title: Game engine logic systems
slug: game-io-logic
description: null
author: dpeter99
date: 2019-08-22T15:20:28.000Z
lastmod: '2022-03-02T08:27:22.286Z'
draft: true
tags: []
categories: []
---

Almost all games need some way to connect actions in the game world with events they cause. The simplest example is pressing a button to open a door.
These connections in some cases can be hardcoded, "*every door needs a button to open*" and this is perfectly fine when we know that this will be true for the whole game.
But we can't always know the scope this precisely, and designers like to experiment to find the best way to interact with the game world.

# The problem

These logical connections need to be editable by as many people as possible. A level designer might want to add a door that needs a key, or a cinematic designer might want to play a complex sequence when the player reaches a segment of the level.
This means that these connections can't be implemented in code for each case. As that would either require a programmer to step in and write each connection, which would make development slow and cause friction between departments.
The other option would be that the designers would need to write the connection code, but this would mean that the designers need to be able to write code. This is rarely the case and would mean that many good designers would need to learn a new discipline.

# The solution

The solution to this problem is the creation of a system that handles the logical connection of different parts of the game. Such a system would need to be:
1. Easy to use, eg. set up new connections
2. Generic
3. Fast

## 1. Easy to use
The system needs to be easy to understand and use while developing the game. Any designer and non-programmer needs to be able to add new connections to create the game world they envisioned.
This means that the system needs good editor tooling and integration to allow for seamless workflows.

## 2. Generic
The system needs to be able to communicate with as many parts of the game and game engine, as possible.


# Existing solutions
There are existing similar systems in other game engines. I could find two already existing ones that we can take inspiration from. These are the ones that are at least Source Available and thus we can see how they are implemented.

## Source Engine
Source Engine is made by valve and is a highly battle-tested engine. It is one of the oldest engine but we can learn a lot from it as many of the ideas developed for it are now industry standard.

Source has an Input/Output System, it is a highly robust system for designing world logic. For example, all of Portal's puzzles are made using it. The main strength of it is that after making the basic components the designers can do everything else without much help from the programmers.
This is achieved with full integration with the Hammer world editor, and many smaller logical building blocks.

### I/O system
The [valve developers wiki](https://developer.valvesoftware.com/wiki/Inputs_and_Outputs) gives a really good overview of how it works, but I will try to summarize it here as well.

Let's start with what is visible from the system to the user. Anything that can move or has any amount of data or logic is called an entity in Source. These are special as they can have more data on them. One of the most basic examples for an entity is a model, as these need the path of the model to draw, and the textures or shaders to use.

A more interesting example of entities are the non visible ones, like spawners or particle emitters.
![The broken screen](source_entities.jpg)