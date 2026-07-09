# Objective

Act as a Senior Staff Software Engineer performing a technical audit of this repository.

Your first objective is NOT to write code.

Your objective is to understand the project completely and produce an accurate assessment of its current state.

Assume this is an active project under development.

---

# Analyze

Inspect the entire repository and understand:

- Overall architecture
- Folder structure
- Main technologies
- Design patterns
- Coding conventions
- Component organization
- State management
- Styling strategy
- Build system
- Routing
- Reusable abstractions
- Existing documentation
- TODOs
- Dead code
- Technical debt

Do not make assumptions until you've inspected the relevant files.

---

# Evaluate

Determine:

## 1. Project maturity

Estimate:

- Prototype
- MVP
- Production-ready
- Mature product

Explain why.

---

## 2. Current progress

Identify:

- What's already implemented
- What's partially implemented
- What's missing
- What appears abandoned
- Features in progress

---

## 3. Architecture

Evaluate:

- Scalability
- Maintainability
- Separation of concerns
- Component composition
- Reusability
- Coupling
- Cohesion

Highlight both strengths and weaknesses.

---

## 4. Code quality

Review:

- Naming consistency
- Folder organization
- Repeated logic
- Over-engineering
- Under-engineering
- Complexity
- Readability
- Type safety
- Error handling

---

## 5. Design System (if present)

Evaluate:

- Component hierarchy
- Primitive vs semantic components
- Token organization
- Styling consistency
- Variant strategy
- Accessibility
- Composition quality

---

## 6. Risks

Identify:

- Technical debt
- Architectural risks
- Performance risks
- Maintainability risks
- Areas likely to become problematic

Explain why.

---

## 7. Opportunities

Suggest improvements ordered by impact.

Separate into:

Quick Wins

Medium Improvements

High Impact Refactors

Long-term Improvements

Only include suggestions supported by evidence from the repository.

---

## 8. Missing pieces

Identify things that should probably exist but currently don't.

Examples:

- Tests
- Documentation
- CI
- Error boundaries
- Storybook
- Accessibility
- Performance monitoring
- Developer tooling

Only mention items that are actually missing.

---

## 9. Overall assessment

Provide an executive summary including:

Strengths

Weaknesses

Current priorities

Estimated completion level (0–100%)

Confidence level in your assessment

---

# Important

Do NOT start writing code.

Do NOT refactor anything.

Do NOT invent missing context.

If something cannot be determined, explicitly say so.

Support every important conclusion with evidence from the repository.

Be critical but objective.

Think like a Staff Engineer preparing a report for the project's owner.

The folder you need to insect is playground/designer