"use client"

import * as React from "react"
import {
    defaultIcons,
    type DefaultIconName,
    defaultIconNames,
} from "@/lib/pictos"
import {
    productIcons,
    type ProductIconName,
    productIconNames,
} from "@/lib/icons"

export type IconName = DefaultIconName | ProductIconName

// Props base del primitive
export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName
    clickable?: boolean // no se propaga al DOM; lo consumen los wrappers de estilo
}

// Renderizador base: resuelve el pictograma por "name"
const IconRoot = React.forwardRef<SVGSVGElement, IconProps>(
    ({ name, className, clickable, ...props }, ref) => {
        const IconComponent =
            (defaultIcons as Record<string, React.ComponentType<any>>)[name] ??
            (productIcons as Record<string, React.ComponentType<any>>)[name]

        if (!IconComponent) {
            if (process.env.NODE_ENV !== "production") {
                console.warn(`Icon "${name}" no encontrado`)
            }
            return null
        }
        // clickable NO se pasa al <svg>, para evitar atributos inválidos
        return <IconComponent ref={ref} className={className} {...props} />
    }
)
IconRoot.displayName = "Icon.Root"

// Container (primitive)
const IconContainer = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
))
IconContainer.displayName = "Icon.Container"

// Función de utilidad para capitalizar nombres de iconos
function capitalizeIconName<T extends IconName>(name: T): Capitalize<T> {
    return (name.charAt(0).toUpperCase() + name.slice(1)) as Capitalize<T>
}

// Instalador de propiedades estáticas: Icon.Search, Icon.Close, etc.
const INSTALLED = Symbol("icon.statics.installed")

export function installIcons<
    C extends React.ForwardRefExoticComponent<any>
>(IconComp: C): C & Record<string, React.ForwardRefExoticComponent<any>> {
    // Evita reinstalaciones (HMR/SSR)
    if ((IconComp as any)[INSTALLED]) return IconComp as any

    const allNames = [...defaultIconNames, ...productIconNames] as IconName[]

    for (const n of allNames) {
        const key = capitalizeIconName(n) as string

        // Si el consumidor definió un estático manualmente, respétalo
        if ((IconComp as any)[key]) continue

            ; (IconComp as any)[key] = React.forwardRef<SVGSVGElement, Omit<IconProps, "name">>(
                (props, ref) => <IconComp {...(props as any)} ref={ref} name={n} />
            )
            ; (IconComp as any)[key].displayName = `Icon.${key}`
    }

    ; (IconComp as any)[INSTALLED] = true
    return IconComp as any
}

// "Icon" como objeto principal con Root y Container como propiedades estáticas
export const Icon = {
    Root: IconRoot,
    Container: IconContainer,
}

export type { DefaultIconName, ProductIconName }
