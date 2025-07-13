---
type: post
title: Game engine logic systems
slug: 2022-02-26-game-io-logic
description: Small exploration of game event systems for a University project
author: dpeter99
date: 2022-03-04T17:55:48.039Z
lastmod: 2022-03-04T17:56:28.214Z
draft: false
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





# Existing solutions

Presumably, all games that have a large world or complex level logic have some system to solve this. Sadly not many companies share these components, and finding talks about them in the GDC Vault is also hard.
There are 2 examples that I could find. From these, we can try to take inspiration. These solutions are at least Source Available and thus we can see how they are implemented.

## Source Engine
Source Engine is made by valve and is a highly battle-tested engine. It is one of the oldest engines but we can learn a lot from it as many of the ideas developed for it are now industry standard.

Source has an Input/Output System, it is a highly robust system for designing world logic. For example, all of Portal's puzzles are made using it. The main strength of it is that after making the basic components the designers can do everything else without much help from the programmers.
This is achieved with full integration with the Hammer world editor, and many smaller logical building blocks.

### I/O system
The [Valve developers wiki](https://developer.valvesoftware.com/wiki/Inputs_and_Outputs) gives a really good overview of how it works, but I will try to summarize it here as well.

Let's start with what is visible from the system to the user. Anything that can move or has any amount of data or logic is called an entity in Source. These are special as they can have more data on them. One of the most basic examples for an entity is a model, as these need the path of the model to draw, and the textures or shaders to use.

A more interesting example of entities are the non-visible ones, like spawners or particle emitters. These are not visible in the game, only in the editor.

![Source engine entities](./source_entities.jpg)

All of these entities have an Input-Output tab in the editor

In the Source engine, you can set up connections between entities by connecting one of the entities' outputs to another entity's input. These Outputs act as events and they are specific to the type of entity. For example a "trigger region entity" might have an output named ``OnTrigger``, they also have Outputs inherited from their parent classes. Then these Outputs can be mapped to the Inputs on other entities. These Inputs are basically actions they can perform. For example, a fire particle entity might have ``StartFire`` and ``Extinguish``. 

These connections can be easily managed from the editor. The user can set up connections to define a delay to apply to the event, and also send optional parameters.

![The broken screen](IO_menu.png)

The interface has a Convenient dropdown to select the output and an object picker to select the targets.

The power of this system comes from the fact that there are many Logical entities. This allows the implementation of more complex logic.

### Examples

Some examples of these integrations form Unity and Source:
- **[game_text](https://developer.valvesoftware.com/wiki/Game_text) entity**
This is used for displaying text on the screen like a chapter title.
- **[game_score](https://developer.valvesoftware.com/wiki/Game_score) entity**
This entity can be used to add or subtract a point from a player.
- **[light_spot](https://developer.valvesoftware.com/wiki/Light_spot) entity**
This is a basic spotlight that has Inputs to turn it on ( ``TurnOn`` ) and off ( ``TurnOff`` ) and also to set a patterns to use for flickering the light.
- **[logic_auto](https://developer.valvesoftware.com/wiki/Logic_auto) entity**
This is an entity that can fire Outputs automatically when the game starts up.
For example, it has ``OnMapSpawn``which is fired any time the map is loaded, there are also versions of this output for when the map is loaded from a save or as the start of a new game.
- **[logic_branch](https://developer.valvesoftware.com/wiki/Logic_branch) entity**
This entity holds a single bool value that can be toggled using its inputs (``Toggle`` and ``ToggleTest``) and it has outputs for when it is set to true and false (``OnTrue``, ``OnFalse``)
- **[logic_compare](https://developer.valvesoftware.com/wiki/Logic_compare) entity**
This entity can compare two inputs and fire an Output based on the values received by it.
- **[logic_relay](https://developer.valvesoftware.com/wiki/Logic_relay) entity**
Using this entity it is possible to forward a single event to many other entities.
- **[npc_maker](https://developer.valvesoftware.com/wiki/Npc_maker) entity**
This entity is responsible for spawning NPCs, it has properties to specify the type, squad, and relations, they will have.
There are inputs to stop and start spawning or spawn a single one.






### The internals
Most of the code for this is found in the [cbase.cpp](https://github.com/nillerusr/source-engine/blob/master/game/server/cbase.cpp#L251) file of the source code. After a bit of reading, we can see that it calls the ``g_EventQueue.AddEvent`` to actually send the event. This has a few parameters that, define the name of the Input to call, the name of the target as a string. It also takes in the rest of the things we can configure in the UI, the delay, the optional parameter.

After this, the [EventQueue](https://github.com/ValveSoftware/source-sdk-2013/blob/master/sp/src/game/server/eventqueue.h) puts this into a list sorted by the time the event needs to fire (Current time + delay).
An interesting thing to note is that EventQueue does not fire the event in the same call. The events are actually acted upon at the top of the core game update loop. This is done in the [ServiceEvents](https://github.com/nillerusr/source-engine/blob/master/game/server/cbase.cpp#L901) function.
This approach makes sure that long chains of events can't cause lag.



## Unity

Unity has released an example project that shows how a more complex game might be put together in their engine. This project is a small adventure game with localized logic puzzles.

They made an event system that they talked about in the accompanying [Unity Learn](https://learn.unity.com/tutorial/3d-game-kit-reference-guide?uv=2020.3&projectId=5c514897edbc2a001fd5bdd0#5c7f8528edbc2a002053b73e) course. In their scripts they send commands rather than events, this is only a naming difference, they mean the same thing as events.
This event system is a simple one that only has a fixed number of event types ( ``None, Activate, Deactivate, Open, Close, Spawn, Destroy, Start, Stop``). These are only to differentiate between the events sent to the same game object.

### Components
#### Sending commands
Sending commands can be done by any script inheriting from `SendGameCommand`. 
This has a ``Send()`` function that other scripts can use to send events. There are many, pre-made scripts, that inherit from `SendGameCommand`. 
For example, `SendOnCollisionEnter`, `SendOnCollisionExit`, `SendOnCollisionStay` These send a command (event) on the respective collision event. There is also a full set of these for trigger events.
The target of the events is a script called: `Game Command Receiver`.

![](Unity_GameKIT_Switch.png)
In the picture above, you can see these components in action. There is a simple box collider and when the player enters (layer filter set to `player`), it sends an `Activate`  command to the GameObject `Crystal`.

#### Receiving commands
Any GameObject that needs to receive commands (events) needs the `Game Command Receiver` component. This acts as a hub for directing the event to the right Function inside the right component, this is done by having an internal list of which event to send to which component of the GameObject. These are registered by the component that wants to receive a given event. 
Every script that wants to process commands is inherited from `GameCommandHandler` Witch registers itself in its `Awake` method.
It also gives fields for setting what event to listen to, setting a cooldown, and starting the timer.

There are many already made scripts that do inherit from `GameCommandHandler`.
These can do a variety of things like:
- `PlaySound` that will play a sound when it gets a command
- `SetGameObjectActive` will activate and deactivate a set of target game objects.
- `SimpleTranslator` Is a script that can move an object from a start position to an end position with a lot of configurable options. This is for example used for the Big doors in the demo scene ( `DoorHuge` in scene `Level1`  ).

![](Unity_GameKIT_Crystal.png)

In the above image, we can see the other half of the previous example. This is the target of the switch from before. It has the Command receiver script that was targeted in the switch. The inspector of the receiver shows a list of scripts that send events to this, so it is easier to navigate backwards in the connections. There is also a material switcher component that is set to listen to `Activate` events, it is also set so that it only fires once. When it fires, it will switch out the material, so the gem will glow with blue.

![](Unity_GameKIT_Crystal_2.png)

With the gizmos turned back on we can see that the system has a deep editor integration as it shows the connected components with arrows leading to and from event sources.

![](Unity_GameKIT_Counter.png)

There is also a second GameObject targeted by the Switch, this is a counter. When it gets activated 3 times, it fires a second command that moves the door down.

### Problems

The system doesn't allow a single component to target multiple objects, this results in the duplication of scripts on the same GameObjects. A good example of this is the switch above, where it has to trigger the graphical change on the Gem and the Counter increment.

The fact that there is a limited number of event types is also a means that expressing more complex or abstract actions becomes hard, and some commands might end up with non-intuitive names. 

The system also calls the target immediately, this means that if there is a chain in the calls (for example what a rellay component would do) the game might lag for a single frame while all the calls are made. 

# The requirements

For designing a system that solves these logical connections, we need to decide what are the main requirements for it.
At first, these requirements should be high level, to see what are the most important aspects.

A world and gameplay logic system would need to be:
1. Easy to use, eg. set up new connections
2. Generic
3. Fast

## 1. Easy to use
The system needs to be easy to understand and use while developing the game. Any designer and non-programmer need to be able to add new connections to create the game world they envisioned.
This means that the system needs good editor tooling and integration to allow for seamless workflows.
We have seen this in both Unity and Source examples, they both have deep integration with the editor.

## 2. Generic
The system needs to be able to communicate with as many parts of the game and game engine, as possible. This means that the system should be able to interact with almost any part of the game. This for example includes the physics system, the cinematic choreography, inventory, and the quest system.


## 3. Fast
A system with this level of integration and usage needs to be fast. This can be achieved by using a similar system as what Valve is using. By only dispatching events at the top of the event loop, we can make sure, a longer event chain doesn't make the game stop. But the Valve system isn't perfect either. They do full name-based lookups which allows for wild card addressing and targeting multiple entities with the same name. But it can be costly.

# The proposal so-far
This exploration of game world logic systems was made for a University project. Our group is making a larger open-world game, and the need for a way to interconnect our systems came up. The plan is to use a single unified system for interacting with the world and completing quests.
## Entities
From these examples, we have decided that in our system we will keep the idea of a single Component that marks the GameObject as something that can send and/or receive events. This component will mark the GO as an entity, and make sure it has a unique id (Most likely a UUID)

These Entities would register themselves to a list of all loaded entities that would allow for fast ID-based lookup of them when sending events. These might have a grouping based on the sub-scene to allow for fast and comprehensive unloading.

## The question of time travel
In our game, there is a chance that the target entity is not loaded, especially if the event is targeting multiple of the same type. The problem here is that if we just run the event when the entity gets loaded, then we might get undesired results. For example, when an explosion gets triggered, then that explosion will play out when that part of the map get's loaded next. This might only happen in-game days later.

To avoid this, we might need to introduce states or some other way to differentiate between events that got delayed because of the target not being loaded. A simple solution would be to have a companion function for all events that care about this difference. This secondary function would only get called when the event was delayed. This still means that each component is responsible for handling the difference. 

## The problem of cloning
There is also a second problem with only referring to entities with their UUID as this means that when a more complex entity is cloned, one that might have sub-entities, will have the same UUID as the one it was cloned from.

An example would be level designers using a prefab for a simple door. As they drag in the door, the UUID would stay the same and when firing a door open event, all the doors would open. Or when in-game a new enemy would spawn, it would also have conflicting internal IDs and no way to differentiate them from other enemies.

The solution to this problem is to make sure that when we clone any GameObject that is an entity, we regenerate the UUIDs
