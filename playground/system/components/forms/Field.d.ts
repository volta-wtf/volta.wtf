import * as React from "react";
/**
 * Field — structured form-field wrapper (label + control + help/error), faithful to shadcn/ui.
 */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> { orientation?: "vertical" | "horizontal" | "responsive"; }
export function Field(props: FieldProps): JSX.Element;
export function FieldContent(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function FieldTitle(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function FieldLabel(props: React.LabelHTMLAttributes<HTMLLabelElement> & { asChild?: boolean }): JSX.Element;
export function FieldDescription(props: React.HTMLAttributes<HTMLParagraphElement>): JSX.Element;
export function FieldError(props: React.HTMLAttributes<HTMLParagraphElement> & { errors?: Array<{ message?: string } | undefined> }): JSX.Element | null;
export function FieldGroup(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
export function FieldSet(props: React.FieldsetHTMLAttributes<HTMLFieldSetElement>): JSX.Element;
export function FieldLegend(props: React.HTMLAttributes<HTMLLegendElement> & { variant?: "legend" | "label" }): JSX.Element;
export function FieldSeparator(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
