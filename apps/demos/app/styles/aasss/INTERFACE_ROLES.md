# Interface Roles

Interface Roles define the structural responsibilities of the interface.

Unlike Intent Roles, they do not communicate meaning.

Unlike Semantic, they do not expose primitive values.

Their responsibility is to describe **what a visual element represents inside the interface**, independently of brand identity.

They are the foundation upon which every component, layout and application is built.

```
Primitives
        ↓
Semantic
        ↓
Interface Roles
        ↓
Intent Roles
        ↓
Components
```

---

# Philosophy

Every interface is composed of only a few visual responsibilities.

A page does not need hundreds of colors.

It needs backgrounds.

It needs readable content.

It needs containers.

It needs interaction.

Everything else is a specialization of those concepts.

For this reason Interface Roles remain intentionally small and stable.

---

# Role Hierarchy

```
Background

└── Surface

    ├── Card

    ├── Popover

    ├── Dialog

    ├── Sidebar

    └── ...

Foreground

└── Content

    ├── Text

    ├── Icon

    ├── Heading

    └── ...

Control

└── Button

└── Input

└── Action

Ambient

└── Shadow

└── Scrim

└── Backdrop
```

Interface Roles describe families.

Components consume specializations.

---

# Background

```css
--background
```

The visual foundation of the interface.

Background represents the outermost layer of an application.

Every other visual element exists on top of it.

Typical usage:

- application background
- workspace
- page
- dashboard
- fullscreen views

Avoid using Background for contained components.

Containers belong to Surface.

Related

```
surface

canvas

body
```

---

# Foreground

```css
--foreground
```

The primary readable color.

Foreground provides the maximum readable contrast available against the current Background.

Typical usage

- headings
- body text
- icons
- controls

Foreground should represent the highest emphasis level.

Lower emphasis belongs to Content variants.

Related

```
content

text

icon
```

---

# Surface

```css
--surface
```

Neutral container color.

Surface introduces hierarchy through elevation instead of semantic meaning.

A Surface never indicates success, warning or danger.

Those responsibilities belong to Intent Roles.

Typical usage

- cards
- sidebars
- dialogs
- sheets
- popovers
- floating panels

Surface establishes visual grouping.

It should remain visually neutral.

Related

```
surface-low

surface-high

surface-base

card

popover
```

---

# Content

```css
--content
```

Default foreground for anything placed inside a Surface.

Unlike Foreground, Content adapts to local contexts.

Typical usage

- labels
- body text
- icons
- supporting graphics

Most components should consume Content instead of Foreground directly.

Foreground should be reserved for the highest readable emphasis.

---

# Control

```css
--control
```

Neutral appearance for interactive elements.

Control represents an interactable object before semantic intent is applied.

Examples

- buttons
- inputs
- switches
- sliders
- segmented controls

Primary buttons are not different controls.

They are Controls using the Primary intent.

```
Control

↓

Primary

↓

Hover
```

---

# Ambient

```css
--ambient
```

Visual atmosphere.

Ambient exists to create depth without becoming readable content.

Examples

- glows
- translucent layers
- decorative gradients
- glass effects

Never use Ambient for text.

Never use Ambient to communicate state.

---

# State

```css
--state
```

Reference color for interaction feedback.

State itself is not visible.

Instead it generates interaction variants.

Examples

```
hover

focus

pressed

dragging

disabled
```

State should remain independent of semantic meaning.

---

# Indication

```css
--indication
```

Temporary emphasis intended to guide attention.

Unlike Primary, Indication does not represent hierarchy.

Unlike Selection, it is temporary.

Typical usage

- search matches
- onboarding
- guided tours
- mark
- current editing position

Indication should disappear once the interaction finishes.

---

# Shadow

```css
--shadow
```

Reference color used to produce elevation.

Shadow communicates distance from the interface.

Not importance.

Shadow should never be used as decoration.

Variants

```
shadow-soft

shadow-base

shadow-hard
```

---

# Scrim

```css
--scrim
```

Overlay placed directly over media.

Purpose

Increase readability.

Examples

- hero images
- video players
- image captions
- floating controls

Scrim affects only the media behind it.

Variants

```
scrim-soft

scrim-base

scrim-hard
```

---

# Backdrop

```css
--backdrop
```

Overlay separating application content from modal content.

Backdrop isolates attention.

Unlike Scrim, it affects the application itself.

Examples

- dialogs
- drawers
- sheets
- alerts
- popovers with modal behavior

Variants

```
backdrop-soft

backdrop-base

backdrop-hard
```

---

# Relationships

Every Interface Role exists independently.

```
Background

↓

Surface

↓

Content

↓

Control
```

is a common composition.

```
Background

↓

Ambient

↓

Scrim

↓

Content
```

is another.

The system should encourage composition rather than specialization.

---

# Design Principles

Interface Roles should never describe appearance.

Good

```
surface

foreground

content

shadow
```

Bad

```
gray

white

light

dark

glass

paper
```

The role must remain valid even if the visual language changes completely.

---

# Summary

Interface Roles answer a single question:

> **What responsibility does this element have within the interface?**

They define structure.

They never define meaning.

Meaning belongs to Intent Roles.

Values belong to Semantic.

Implementation belongs to Components.