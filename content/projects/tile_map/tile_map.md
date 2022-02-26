---
title: Tile_map
date: 2017-02-02T21:32:27.000Z
draft: false
description: TileMap was a custom tile amp implementation in Unity targeted for large generated worlds.
state: abandoned
type: project
lastmod: '2022-02-26T20:24:54.938Z'
---
TileMap's idea was started before Unity had an official Tilemap integrated into the engine. That implementation came out while I was making this. And while I did work on it after that, the inspiration died out soon after. This was also one of the few larger projects that I worked on. 

### How it works
The base idea of the system is to split the map into chunks. For each of these chunks then we construct a mesh that we can manually submit for unity to draw. This way the whole visible area can be drawn by only a few meshes. The system has built-in support for layers as opposed to Unity's solution that uses multiple Tilemap objects for the same thing. It can also generate a collision mesh for the map.

### Problems
It uses a separate object for each tile which is not memory efficient. 