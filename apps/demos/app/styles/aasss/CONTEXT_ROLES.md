# Context Roles

Context Roles represent specialized environments within the interface.

Unlike Interface Roles, they do not introduce new responsibilities.

Instead, they specialize an existing responsibility for a particular context.

For example

```
Surface

↓

Card
```

A Card is still a Surface.

It simply has different constraints.

Likewise,

```
Foreground

↓

Card Foreground
```

does not create a new foreground concept.

It simply guarantees readable contrast inside Cards.

---

# Philosophy

Context Roles exist to solve contextual problems.

Not semantic problems.

Not branding problems.

Not interaction problems.

They adapt an existing responsibility to a specific environment.

For example

```
Surface

↓

Card

↓

Card Foreground
```

The Card remains a Surface.

Only its implementation changes.

---

# Inheritance

Every Context Role inherits another role.

```
Surface

↓

Card

↓

Card Foreground
```

```
Surface

↓

Popover

↓

Popover Foreground
```

```
Surface

↓

Sidebar

↓

Sidebar Foreground
```

No new meaning is introduced.

Only context.

---

# Application Contexts

These variables represent specialized application surfaces.

---

## Body

```css
--body
```

Represents the operating system browser or application chrome.

Typical usage

- browser theme-color
- installed PWA title bar
- mobile navigation bars

Body is not part of the application interface.

It belongs to the host environment.

---

## Canvas

```css
--canvas
```

Represents the application's working canvas.

Canvas usually fills the entire viewport.

Examples

- dashboard background

- editor background

- workspace

Canvas commonly consumes Background.

---

## Silent

```css
--silent
```

A visually quiet container.

Used when structure is required but emphasis is intentionally minimized.

Examples

- utility panels

- inspectors

- secondary navigation

---

# Surface Contexts

Every container below is a specialization of Surface.

---

## Card

```css
--card
```

Standard contained surface.

Used to group related information.

Cards should remain visually neutral.

---

## Picker

```css
--picker
```

Temporary selection surface.

Examples

- date picker

- color picker

- emoji picker

---

## Dropdown

```css
--dropdown
```

Contextual list attached to another control.

Dropdowns usually inherit Surface while introducing higher elevation.

---

## Popover

```css
--popover
```

Floating contextual container.

Popovers supplement existing content.

They should not interrupt workflows.

---

## Dialog

```css
--dialog
```

Focused interaction container.

Dialogs temporarily interrupt the current workflow to request attention or confirmation.

---

## Modal

```css
--modal
```

Highest priority interaction container.

Unlike Dialog, Modal usually blocks interaction outside itself.

---

## Popup

```css
--popup
```

Small floating transient surface.

Examples

- context menus

- floating notifications

- quick actions

---

# Regional Contexts

These variables define permanent application regions.

Unlike floating surfaces, they establish layout structure.

---

## Sidebar

```css
--sidebar
```

Permanent navigation or utility region.

May expose additional contextual variables.

```
sidebar-primary

sidebar-accent

sidebar-border

sidebar-ring
```

---

## Header

```css
--header
```

Primary top region of an application.

Usually provides navigation and context.

---

## Footer

```css
--footer
```

Persistent bottom region.

Commonly used for auxiliary navigation or application information.

---

## Aside

```css
--aside
```

Supporting lateral region.

Often used for inspectors, metadata or secondary content.

---

## Main

```css
--main
```

Primary application workspace.

Represents the main content area.

---

# Contextual Foregrounds

Every contextual surface should expose its own readable foreground whenever necessary.

Examples

```
card-foreground

popover-foreground

surface-foreground

sidebar-foreground

selection-foreground

code-foreground
```

These variables should only exist when the inherited Foreground no longer guarantees sufficient readability.

Avoid creating contextual foregrounds without necessity.

---

# Context vs Intent

Context answers

> Where does this element exist?

Intent answers

> What does this element communicate?

These are independent concepts.

```
Card

↓

Primary
```

is valid.

```
Popover

↓

Destructive
```

is valid.

```
Sidebar

↓

Secondary
```

is valid.

Contexts should never encode meaning.

---

# Design Principles

Context Roles should always inherit another role.

If a variable cannot clearly identify its parent responsibility, it probably belongs somewhere else.

Good

```
Surface

↓

Card
```

Good

```
Foreground

↓

Card Foreground
```

Bad

```
Blue Card
```

Bad

```
Warning Card
```

Those represent appearance or intent rather than context.

---

# Summary

Context Roles specialize responsibilities.

They never create new responsibilities.

They exist to adapt Interface Roles to specific environments while preserving a consistent visual language.

A Card is still a Surface.

A Sidebar is still a Surface.

A Card Foreground is still a Foreground.

Context changes implementation.

Responsibility remains the same.