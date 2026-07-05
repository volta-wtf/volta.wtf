"use client"

import {
  AtSign,
  BarChart3,
  Bell,
  Calendar,
  CheckSquare,
  ChevronRight,
  GraduationCap,
  Handshake,
  Mail,
  MessageCircle,
  MessageSquare,
  Plus,
  ShoppingBag,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SettingsHoverMenu } from "./settings-hover-menu"

type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

function NavGroup({
  label,
  items,
  action,
  className,
}: {
  label?: string
  items: NavItem[]
  action?: React.ReactNode
  className?: string
}) {
  return (
    <SidebarGroup className={className}>
      {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
      {action}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton isActive={item.isActive} render={<a href={item.url} />}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const workflows: NavItem[] = [
  { title: "Comercial", url: "#", icon: Handshake },
  { title: "Atención", url: "#", icon: MessageCircle, isActive: true },
  { title: "Soporte", url: "#", icon: Wrench },
]

const management: NavItem[] = [
  { title: "Mensajes", url: "#", icon: MessageSquare },
  { title: "Correo", url: "#", icon: Mail },
  { title: "Agenda", url: "#", icon: Calendar },
  { title: "Ventas", url: "#", icon: ShoppingBag },
  { title: "Métricas", url: "#", icon: BarChart3 },
]

const resources: NavItem[] = [
  { title: "Tareas", url: "#", icon: CheckSquare },
  { title: "Contactos", url: "#", icon: Users },
  { title: "Cuentas", url: "#", icon: AtSign },
]

const secondaryBeforeSettings: NavItem[] = [
  { title: "Notificaciones", url: "#", icon: Bell },
]

const secondaryAfterSettings: NavItem[] = [
  { title: "Academy", url: "#", icon: GraduationCap },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-6 pt-6 pb-0">
        <span className="text-2xl font-bold font-brand tracking-tight">beast</span>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <NavGroup
          label="Flujos de trabajo"
          items={workflows}
          action={
            <SidebarGroupAction title="Nuevo flujo">
              <Plus />
              <span className="sr-only">Nuevo flujo</span>
            </SidebarGroupAction>
          }
        />
        <NavGroup label="Gestión" items={management} />
        <NavGroup label="Recursos" items={resources} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryBeforeSettings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SettingsHoverMenu />
              {secondaryAfterSettings.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <Avatar className="size-8 rounded-full">
                <AvatarFallback className="rounded-full">NA</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Nombre Apellido</span>
                <span className="truncate text-xs text-color-muted">Admin</span>
              </div>
              <ChevronRight className="ml-auto size-4 text-color-muted" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
