---
title: How does unity do it? Part 1
slug: how-does-unity-do-it-part-1
description: ""
date: 2022-04-26T08:42:48.920Z
lastmod: 2022-04-26T09:30:27.815Z
draft: true
categories: ""
type: post
---

In this series I will be showing of some of the less known Unity features that I have found while trying to learn from the official packages. As most of these packages are written in c# and compiled when they are imported. This means that all of the code is easy to browse. And more importanlty they use the same c# API that we can use. Meaning that if they can do something so can we! 

# The core update loop

In this first part I1m going to talk about the ``PlayerLoop`` in Unity.

I found out about this class and what it can do while investigating how the new DOTS packages work. If you have used it than you probably notices that there is no "Entity Manager" that would get the usualy ``Update`` function and start the complex update od the entities. But than how does it get executed? 

This is where the ``PlayerLoop`` comes in. It represents the core update loop of unity. This means it is basically a list of static functions to call in each update.
The class allows you to add and even remove from this list. 

Most of what I found out came from [this brilliant article](https://blog.beardphantom.com/post/190674647054/unity-2018-and-playerloop) by beardphantom (Mika Notarnicola). They give a really good explanation on what you can do with it.

This class and API gives us the ability to make or replace whole parts of the engine with new systems. This can be useful when you have to optimize for small devices or need all the performance for big games.
You could also replace the whole loop if you wanted and treat the engine more like a framework. You can make sure that only the things that you use and need are running. This level of optimization is usually not needed for a game but when you need it is really useful.

So this is how DOTS does it, they add their own system to be run in the core update loop of unity and so cna you.

### Helpers
I have a helper class in my Unity utils package that makes adding a new system easier.
[The code](https://github.com/dpeter99/UnityUtils/blob/main/Runtime/PlayerLoopHelpers.cs)