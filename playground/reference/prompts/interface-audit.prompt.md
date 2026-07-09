
# Objective

Act as a Lead UI Engineer and Design Systems Engineer.

Your task is to audit the current implementation status of this project's user interface.

Do NOT review backend logic unless it directly affects the UI.

Do NOT write code.

Your goal is to understand what has actually been built.

---

# Analyze

Inspect the entire UI implementation.

Understand:

- Application structure
- Navigation
- Layouts
- Screens
- Views
- Components
- Design System
- Styling architecture
- Responsive behavior
- Interaction patterns
- Accessibility
- Loading and empty states

Base every conclusion on the actual implementation.

Do not make assumptions.

---

# 1. UI Coverage

Identify:

- Fully implemented screens
- Partially implemented screens
- Placeholder screens
- Missing screens
- Hidden or unfinished views

Estimate the overall completion percentage of the interface.

---

# 2. Navigation

Review:

- Global navigation
- Sidebar
- Header
- Routing
- Breadcrumbs
- Page transitions
- Navigation consistency

Identify missing or broken navigation flows.

---

# 3. Layout System

Evaluate:

- Page layouts
- Responsive layouts
- Panels
- Sidebars
- Toolbars
- Scroll behavior
- Spacing consistency

Highlight inconsistencies.

---

# 4. Design System Adoption

Analyze how consistently the Design System is being used.

Evaluate:

- Primitive components
- Semantic components
- Component composition
- Variants
- Tokens
- Typography
- Colors
- Spacing
- Icons
- Radius
- Shadows

Identify places where the implementation bypasses or violates the Design System.

---

# 5. Component Inventory

Create an inventory of:

Implemented components

Partially implemented components

Unused components

Duplicated components

Components that should probably exist but don't.

---

# 6. Screen Quality

For each major screen evaluate:

- Visual consistency
- Information hierarchy
- Layout quality
- Component reuse
- Empty states
- Loading states
- Error states
- Responsive readiness

---

# 7. UX Completeness

Identify missing UX patterns such as:

- Validation
- Feedback
- Skeleton loaders
- Progress indicators
- Confirmation dialogs
- Search
- Filtering
- Sorting
- Pagination
- Keyboard navigation
- Accessibility
- Focus management

Only report patterns that are actually missing.

---

# 8. Visual Consistency

Review:

- Alignment
- Spacing
- Typography
- Icon usage
- Color consistency
- Borders
- Elevation
- Density
- Component sizing

Point out inconsistencies and recurring patterns.

---

# 9. Missing UI Work

Create a prioritized list of remaining UI work.

Separate into:

Critical

Important

Nice to Have

For each item explain why it belongs in that category.

---

# 10. Overall Assessment

Provide:

Overall implementation progress (0–100%)

UI maturity

Design System maturity

Consistency score

Maintainability score

Top strengths

Top weaknesses

Highest priority improvements

---

# Reporting Style

Support every conclusion with evidence from the repository.

Be objective.

Do not invent missing features.

Do not suggest redesigns unless they solve a real inconsistency.

Focus on implementation status rather than design opinions.

Think like a Lead UI Engineer preparing a progress report for the product team.