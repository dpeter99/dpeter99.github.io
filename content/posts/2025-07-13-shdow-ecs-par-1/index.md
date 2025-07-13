---
title: Shadow engine ECS Part 1
date: 2025-07-13T09:00:59.000Z
---

# Rethinking Entity-Component Systems: A Graph-Based Approach

When building a game engine from scratch, one of the most fundamental decisions you'll make is how to represent and manage your game world. The Entity-Component-System (ECS) pattern has become the gold standard for many modern engines, but after working with various implementations, I've started to question whether the traditional approach is always the best fit for every game.

In this series, I'll be exploring a different take on ECS design—one that borrows concepts from graph theory to create a more flexible and intuitive system for game developers.

## The Traditional Approach: Classes vs. Pure ECS

Most game engines fall into one of two camps:

**The Object-Oriented Approach** (think early Unity, older engines):
Every game object is a class—Player, Zombie, Spider, SuperBoss—all inheriting from a common Entity or GameObject base class. This approach is intuitive but becomes unwieldy as your game grows. You end up with deep inheritance hierarchies and tight coupling between data and behavior.

**The Pure ECS Approach** (modern Unity DOTS, Bevy, etc.):
Entities are just IDs, Components are pure data, and Systems operate on collections of entities that have specific component combinations. This approach excels at performance and modularity but can feel disconnected when building complex, unique game objects.

## The Problem with Pure ECS

Pure ECS shines when dealing with uniform operations—rendering thousands of sprites, updating physics for hundreds of objects, or processing AI for dozens of enemies. The SQL-like query system makes these operations efficient and clean:

```cpp
// Pseudocode: Update all entities with Transform and Velocity
for (auto& entity : query<Transform, Velocity>()) {
    entity.get<Transform>().position += entity.get<Velocity>().value * deltaTime;
}
```

But pure ECS starts to break down when you need to create unique, complex entities that appear only once in your game. Consider a boss fight with multiple phases, complex state management, and dozens of interconnected behaviors. In a pure ECS system, you often end up with:

- One-off component-system pairs that only apply to a single entity
- Complex state machines spread across multiple systems
- Logic scattered across different files, making it hard to understand the complete behavior of a single entity

This is why many Unity tutorials still separate MonoBehaviours (with their update methods) from pure ECS—the component-per-entity approach is simply more intuitive for complex, unique objects.

## Learning from Unreal Engine

Unreal Engine's Actor-Component system offers an interesting middle ground. Actors can contain components, but these components can also have their own hierarchical structure. For example:

```
Player Actor
├── Skeleton Component
│   ├── Torso
│   └── Head
│       └── Camera
└── Inventory Component
    ├── Weapon Slot
    └── Consumable Slots
```

This internal hierarchy is separate from the world hierarchy, where the same Player might have attached objects:

```
World Hierarchy:
├── Player
│   ├── Picked-up Weapon
│   └── Temporary Power-up Effect
```

Unreal distinguishes between "Children" (internal component structure) and "Attachments" (world relationships). This dual hierarchy system provides flexibility that pure ECS lacks.

## A Graph-Based Vision

What if we could generalize this concept further? Instead of being limited to two types of relationships, what if we treated our entire game world as a graph where:

- **Nodes** represent entities (both leaf and non-leaf)
- **Edges** represent relationships between entities
- **Leaf nodes** function like traditional components
- **Non-leaf nodes** can store their own data AND have child nodes

In this system:
- **Node = Entity** (can store custom data)
- **Leaf Node = Component** (traditional component behavior)
- **Edges = Relationships** (parent-child, internal structure, attachments, etc.)

This approach offers several advantages:

1. **Flexibility**: You can create simple entities using just leaf components, or complex entities with custom data and internal structure
2. **Intuitive API**: Developers can choose between traditional ECS queries and object-oriented instance methods
3. **Multiple Relationship Types**: Beyond parent-child, you could have "ownership", "attachment", "dependency", or any custom relationship your game needs
4. **Unified Mental Model**: Everything is a node in a graph, making the system conceptually simpler

## What's Coming Next

In the next post, I'll dive deeper into the API design—how developers would actually use this graph-based ECS system. We'll explore:

- The developer-facing API for creating and manipulating nodes
- How traditional ECS queries would work alongside instance methods
- Memory layout considerations for performance
- Real-world examples of complex entities built with this system

The goal isn't to replace pure ECS where it excels, but to provide a more flexible foundation that can adapt to different game development needs. Sometimes you need the raw performance of pure ECS, and sometimes you need the intuitive structure of object-oriented design. Why not have both?

---

*This is part of a series on building a game engine from scratch. Follow along as we explore the challenges and solutions in modern game engine architecture.*