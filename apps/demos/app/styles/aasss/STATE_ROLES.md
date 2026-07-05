# State Roles

State Roles describe temporary changes produced by interaction.

Unlike Interface Roles, they do not describe permanent responsibilities.

Unlike Intent Roles, they do not communicate meaning.

Unlike Context Roles, they do not define environments.

State only answers one question.

> **What is happening right now?**

---

# Philosophy

States are temporary.

They should never become part of the visual identity.

A Primary Button remains Primary regardless of whether it is:

- Hovered
- Focused
- Pressed
- Dragged

State modifies appearance.

It never changes meaning.

---

# The State Layer

```
Component

↓

Interface Role

↓

Intent Role

↓

Context Role

↓

State
```

Example

```
Button

↓

Control

↓

Primary

↓

Card

↓

Hovered
```

Every layer contributes independently.

---

# Permanent vs Temporary

Permanent

```
Surface

Primary

Sidebar
```

Temporary

```
Hovered

Focused

Pressed

Dragging
```

Temporary states should disappear when the interaction ends.

---

# State Categories

States can be grouped into four families.

```
Interaction

Selection

Focus

Availability
```

---

# Interaction States

Interaction occurs while the user manipulates an element.

---

## Resting

```css
--action-resting
```

Default appearance.

Represents the component before interaction.

Every interactive component begins in Resting.

---

## Hovered

```css
--action-hovered
```

Pointer is currently over the element.

Hover should communicate availability.

Never importance.

Hover must never become the only indicator of interactivity.

---

## Focused

```css
--action-focused
```

Keyboard or accessibility focus.

Focused should always remain clearly distinguishable.

Focus is not Hover.

Every focused element should remain visible regardless of input method.

---

## Pressed

```css
--action-pressed
```

User is actively pressing or activating the control.

Pressed communicates immediate physical feedback.

---

## Raised

```css
--action-raised
```

Represents elevation rather than interaction.

Useful for Floating Action Buttons, elevated controls and floating surfaces.

Raised is persistent.

Hovered is temporary.

---

## Dragging

```css
--action-dragging
```

Represents an element currently being moved.

Dragging should prioritize spatial feedback over color changes.

---

# Selection States

Selection represents ownership.

Selection is different from interaction.

Examples

```
Selected row

Selected tab

Selected text

Selected image
```

Selection usually persists after interaction ends.

Variables

```css
--selection

--selection-foreground
```

---

# Focus States

Focus communicates navigation.

Variables

```css
--ring

--caret
```

---

## Ring

```css
--ring
```

Primary accessibility indicator.

Ring should remain visible regardless of component type.

Examples

- buttons

- links

- inputs

- switches

---

## Caret

```css
--caret
```

Current insertion position.

Usually used inside editable controls.

Examples

- textareas

- editors

- inputs

---

# Navigation States

Navigation communicates current location.

---

## Active

```css
--active
```

Represents the current location or tool.

Examples

- active navigation item

- current workspace

- active tab

Unlike Primary, Active does not communicate importance.

It communicates presence.

---

## Visited

```css
--visited
```

Previously visited navigation destination.

Usually applied to hyperlinks.

---

## Target

```css
--target
```

Current navigation target.

Often used after deep linking or scrolling.

Examples

- anchor navigation

- table of contents

- search navigation

---

# Search States

Search introduces temporary emphasis.

Variables

```css
--search-text

--search-current
```

Search Text

Highlights every result.

Search Current

Highlights the currently active result.

---

# Availability

Availability describes whether interaction is possible.

Examples

- disabled

- readonly

- loading

- pending

Although these are usually implemented through opacity, motion or overlays, Theme may expose colors supporting these states.

---

# State Composition

States should stack naturally.

Example

```
Button

↓

Primary

↓

Hovered
```

or

```
Card

↓

Selected

↓

Focused
```

Every state modifies the existing role.

It never replaces it.

---

# Things States Should Never Define

States should never determine

- layout

- spacing

- typography

- semantic meaning

- hierarchy

States only modify temporary perception.

---

# Design Principles

State should disappear.

If the interaction ends, the visual modification should disappear.

Permanent visual changes belong somewhere else.

Usually

- Context

or

- Intent

---

# Summary

State Roles answer one question.

> **What is happening right now?**

They represent temporary interaction.

They never redefine responsibility.

They never redefine meaning.

They simply modify the current experience until the interaction finishes.