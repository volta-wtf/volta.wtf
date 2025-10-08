"use client"

import * as React from "react"
import { defaultIcons, type IconName } from "@/lib/pictos"
import { productIcons } from "@/lib/icons"

// Crear namespace para Icon similar a Radix UI
const IconRoot = React.forwardRef<
    SVGSVGElement,
    React.SVGProps<SVGSVGElement> & {
        name: IconName
        "aria-label"?: string
    }
>(({ name, className, "aria-label": ariaLabel, ...props }, ref) => {
    const IconComponent = defaultIcons[name] || productIcons[name] as React.ComponentType<
        React.SVGProps<SVGSVGElement>
    >

    if (!IconComponent) {
        console.warn(`Icon "${name}" no encontrado en defaultIcons`)
        return null
    }

    return React.createElement(IconComponent, {
        ref,
        className,
        "aria-label": ariaLabel || name,
        ...props,
    })
})

IconRoot.displayName = "Icon.Root"

// Container para iconos (wrapper div)
const IconContainer = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return <div ref={ref} className={className} {...props} />
})

IconContainer.displayName = "Icon.Container"

// Namespace pattern similar a Radix UI
const Icon = {
    Root: IconRoot,
    Container: IconContainer,
}

export { Icon }