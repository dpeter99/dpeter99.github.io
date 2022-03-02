---
title: Forge 1.18 update
date: '2021-11-12T01:00:43.391Z'
draft: false
lastmod: '2022-03-01T10:08:05.717Z'
---

For anyone asking for 1.18 forge here is the rundown of the process that goes into updating it.

::: warning
**For players**

Mods that work with 1.18.1 do not automatically mean they work with 1.18.2
This means that modders need to update their mods individually, and the update may take time, even after forge is done.
:::

::: warning
**For technical people**

There is a Recommended Build for 1.18.1 (``1.18.1 - 39.1.0``)

The upgrade progress for 1.18.2 will probably take more time.
This is because ForgeFlower needs to be upgraded to support new Java features used by Mojang.
:::

## 1.18.2

Work on the new version will only start when the full release drops.
Dis doesn't mean that the pre-release and release candidate versions don't get inspected and tested but these do not result in actual forge builds that are distributed.

### Progress

 - [x] Step 0: Have vanilla decompiling and compiling again without forge on top. This is needed because the decompiling is not perfect.
 - [x] Step 1: Have forge compiling, this means that all the code modifications that forge adds still produce a compiling code. This process often requires disabling patches/features temporarily
 - [ ] Step 2: Once forge compiles and the initial set of patches can be produced, then forge can start to be properly developed, until it's in a usable state enough to use. In this phase, we make sure that none of the forge extra code parts break the original functionality.
 - [ ] Step 3: fix all the missing features (that make sense to fix), cleanup, add new hooks, etc. This is the longest part as people have to figure out what Mojang did and how to expose it to the modders in a safe way-- this will take some weeks, and result in the recommended build



## 1.18.0 and 1.18.1

### Progress

 - [x] Step 0: Have vanilla decompiling and compiling again without forge on top. This is needed because the decompiling is not perfect.
 - [x] Step 1: Have forge compiling, this means that all the code modifications that forge adds still produce a compiling code. This process often requires disabling patches/features temporarily
 - [x] Step 2: Once forge compiles and the initial set of patches can be produced, then forge can start to be properly developed, until it's in a usable state enough to use. In this phase, we make sure that none of the forge extra code parts break the original functionality.
 - [x] Step 3: fix all the missing features (that make sense to fix), cleanup, add new hooks, etc. This is the longest part as people have to figure out what Mojang did and how to expose it to the modders in a safe way-- this will take some weeks, and result in the recommended build


Most of this takes a long time and people are doing it in their free time so be patient and don't ask them.
If everything goes right the first forge version will hopefully not take longer than a few weeks. But this doesn't mean that mods will be updated as well. Mods (just as forge) are made by people in their free time for free, and real-life should and always will be the priority.
