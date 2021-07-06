---
title: "Shadow Engine"
date: 2021-07-06T18:06:26+02:00
draft: false
status: "dev"
---

Shadow Engine is my hobby game engine i have been working on for for quite a while now.

### History
The engine started off as a cpp rewrite of my 2D game engien RelicEngine made in C, but this scope was quickly outgrown. Both engines were started for University Homeworks, as we ususally get the option of miking something big as a proof that we understood the language. But as I started working on Shadow Engine the scope expanded quite fast. As a result I chose only the input system as the Homework assignment. But i did continue working on it after the CPP course ended. Next year I had a Dx12 optional course so that is why Shadow Engine uses Dx12 as the renderer. At the end of that semester I had a working but really simlple rederer. And in the comming months I did start the rewrite of that to be more robust and use more fatures. This is where the code is now (2021.07).

### State of the code
There are two main branches in the SE repo. 
 - ``Main/master`` contins a version that is actually runnable. This is using the old naive renderer that is quite slow and does not allow for many features.
 - ``d3d12`` The rewiting of the renderer this is currently not supposed to run. The renderer currently only has the back end allocation and resource management components.