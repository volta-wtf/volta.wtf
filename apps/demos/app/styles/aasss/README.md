# Theme

Theme is the visual contract between the Design Architecture and the Interface Architecture.

Unlike Primitives and Semantic, Theme does not define values.

Theme defines responsibilities.

Its purpose is to expose a stable visual language that applications and components can consume without knowing how colors, spacing or other primitives are implemented internally.

```
Primitives
        ↓
Semantic
        ↓
Theme
        ↓
Globals
        ↓
Utilities
        ↓
Components
```

A component should never know whether a color comes from a primitive palette, a semantic token or a brand palette.

It should only know that it needs a **surface**, a **foreground**, an **accent**, or a **destructive action**.

This abstraction allows the visual identity to evolve without changing component implementations.

---

# Philosophy

Theme exists to describe **intent**, never implementation.

A component should not ask for:

```
Blue 600
```

or

```
Gray 100
```

or even

```
Primary Blue
```

Instead it should ask for

```
Surface

Primary

Foreground

Border

Accent
```

Those responsibilities remain stable even if the entire visual identity changes.

---

# Goals

Theme has four primary goals.

## Stability

Components should continue working even if the design language changes.

Changing a primitive value should never require changing component code.

---

## Consistency

The same responsibility should always produce the same visual meaning.

If **Primary** represents the main action in one screen, it should represent the main action everywhere.

---

## Readability

Variable names should describe purpose rather than appearance.

Good

```
surface
```

Bad

```
gray-100
```

---

## Scalability

New themes should require changing mappings, not component implementations.

---

# Responsibilities

Theme is responsible for defining:

- Interface roles
- Visual intentions
- Contextual variants
- Component aliases
- Readable foregrounds
- Interactive states

Theme is **not** responsible for:

- Brand palettes
- Primitive values
- Color generation
- Typography scales
- Shadows
- Border radius
- Motion

Those belong to lower layers.

---

# Theme Pipeline

Theme sits between Semantic and the Interface.

```
Primitive

↓

Semantic

↓

Theme

↓

Globals

↓

Utilities

↓

Components

↓

Layouts

↓

Applications
```

Each layer has a different responsibility.

Primitives define values.

Semantic defines vocabulary.

Theme defines responsibilities.

Components consume responsibilities.

---

# Theme Grammar

Every Theme variable answers one question.

> What responsibility does this value have inside the interface?

Variables should never describe appearance.

Variables should describe purpose.

For example

Good

```
surface
foreground
primary
destructive
selection
```

Bad

```
gray
light-gray
green
blue
red
```

---

# Categories

Theme is divided into several conceptual groups.

## Interface Roles

Foundation colors describing the structure of the interface.

Examples

```
background
foreground
surface
content
control
ambient
shadow
scrim
backdrop
state
```

---

## Intent Roles

Variables expressing meaning.

Examples

```
primary
secondary
tertiary

affirmative
informative
cautionary
destructive
```

---

## Accent Roles

Auxiliary emphasis.

Examples

```
accent
active
decoration
inverse
```

---

## Context Roles

Specializations of interface roles.

Examples

```
card
popover
dialog
sidebar
canvas
body
```

---

## State Roles

Interaction feedback.

Examples

```
hover

focus

pressed

selected

disabled
```

---

## Content Roles

Readable content.

Examples

```
text

heading

display

icon

mark

code
```

---

## Structural Roles

Layout separators.

Examples

```
border

divider

rule

line

outline
```

---

## Interactive Roles

Interactive controls.

Examples

```
button

action

input

track

thumb
```

---

# Inheritance

Theme is heavily based on inheritance.

A variable should only exist when it changes responsibility.

For example

```
surface

↓

card

↓

card-foreground
```

Card inherits Surface.

Card Foreground inherits Foreground.

Nothing is duplicated.

---

# Naming

Theme names should always describe responsibilities.

Good examples

```
surface

foreground

primary

selection

border
```

Avoid

```
gray100

light

blue

green

button-blue
```

Responsibilities survive redesigns.

Colors do not.

---

# Component Contract

Components should only consume Theme variables.

They should never reference Semantic or Primitives directly.

Correct

```
Button

↓

primary

foreground
```

Incorrect

```
Button

↓

blue-600

gray-100
```

---

# Design Principle

Theme should read like a language.

Developers should be able to understand what a variable does without seeing its value.

For example

```
surface

foreground

accent

border

selection

shadow
```

already describe an interface.

No hexadecimal values are required to understand the design.

That is the primary objective of Theme.