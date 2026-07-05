"use client"

import * as React from "react"
import {
  AtSign,
  Building2,
  Code2,
  CreditCard,
  Layers,
  ListChecks,
  Settings,
  ShoppingBag,
  Tag,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type MenuItem = {
  title: string
  url: string
  icon: LucideIcon
}

type MenuSection = {
  label: string
  items: MenuItem[]
}

const settingsMenu: MenuSection[] = [
  {
    label: "Mensajes",
    items: [
      { title: "Flujos de trabajo", url: "#", icon: Layers },
      { title: "Respuestas rápidas", url: "#", icon: Zap },
      { title: "Etiquetas", url: "#", icon: Tag },
    ],
  },
  {
    label: "Recursos",
    items: [
      { title: "Conexión de Cuentas", url: "#", icon: AtSign },
      { title: "Productos y Servicios", url: "#", icon: ShoppingBag },
    ],
  },
  {
    label: "Espacio de trabajo",
    items: [
      { title: "Datos del espacio", url: "#", icon: Building2 },
      { title: "Equipo de trabajo", url: "#", icon: Users },
      { title: "Roles y Permisos", url: "#", icon: ListChecks },
      { title: "Api y Webhooks", url: "#", icon: Code2 },
      { title: "Plan y Facturación", url: "#", icon: CreditCard },
    ],
  },
]

export function SettingsHoverMenu() {
  const [open, setOpen] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const scheduleClose = React.useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }, [cancelClose])

  const handleOpen = React.useCallback(() => {
    cancelClose()
    setOpen(true)
  }, [cancelClose])

  React.useEffect(() => cancelClose, [cancelClose])

  return (
    <SidebarMenuItem
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          render={<SidebarMenuButton tooltip="Configuración" />}
        >
          <Settings />
          <span>Configuración</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="right"
          align="start"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {settingsMenu.map((section, index) => (
            <React.Fragment key={section.label}>
              {index > 0 ? <DropdownMenuSeparator /> : null}
              <DropdownMenuGroup>
                <DropdownMenuLabel>{section.label}</DropdownMenuLabel>
                {section.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <DropdownMenuItem
                      key={item.title}
                      render={<a href={item.url} />}
                    >
                      <Icon />
                      {item.title}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
