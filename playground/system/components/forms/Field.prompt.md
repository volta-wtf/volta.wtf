**Field** — consistent form-field scaffolding: label, control, description, and error message stacked with the right spacing. Group several with `FieldGroup`; wrap a related set in `FieldSet` + `FieldLegend`.

```jsx
<Field>
  <FieldLabel htmlFor="u">Username</FieldLabel>
  <Input id="u" placeholder="shadcn" />
  <FieldDescription>This is your public display name.</FieldDescription>
</Field>

<Field>
  <FieldLabel htmlFor="p">Password</FieldLabel>
  <Input id="p" type="password" aria-invalid />
  <FieldError>Password must be at least 8 characters.</FieldError>
</Field>
```
