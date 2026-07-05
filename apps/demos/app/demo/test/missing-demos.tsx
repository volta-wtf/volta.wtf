"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArchiveIcon,
  ArrowLeftIcon,
  BadgeCheckIcon,
  BellIcon,
  Building2Icon,
  ChevronRightIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderCodeIcon,
  FolderIcon,
  FolderOpenIcon,
  FolderSearchIcon,
  HelpCircleIcon,
  KeyboardIcon,
  LanguagesIcon,
  LayoutIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareIcon,
  MonitorIcon,
  MoonIcon,
  MoreHorizontalIcon,
  PaletteIcon,
  PencilIcon,
  PlusIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  ShieldIcon,
  SunIcon,
  TrashIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react"
import { Bar, BarChart } from "recharts"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarGroup, MenubarLabel, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

const frameworks = [
  { value: "next.js", label: "Next.js" }, { value: "sveltekit", label: "SvelteKit" }, { value: "nuxt.js", label: "Nuxt.js" }, { value: "remix", label: "Remix" }, { value: "astro", label: "Astro" },
]

const chartData = [
  { month: "Ene", desktop: 186, mobile: 80 }, { month: "Feb", desktop: 305, mobile: 200 }, { month: "Mar", desktop: 237, mobile: 120 }, { month: "Abr", desktop: 73, mobile: 190 }, { month: "May", desktop: 209, mobile: 130 }, { month: "Jun", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--primary)" },
  mobile: { label: "Mobile", color: "var(--accent)" },
} satisfies ChartConfig

function DropdownMenuDemo() {
  const [appearance, setAppearance] = React.useState({
    statusBar: true,
    activityBar: false,
    panel: false,
  })
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })
  const [panelPosition, setPanelPosition] = React.useState("bottom")
  const [paymentMethod, setPaymentMethod] = React.useState("card")
  const [theme, setTheme] = React.useState("light")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Menú completo
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            Perfil
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Facturación
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Configuración
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Atajos de teclado
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Equipo</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invitar usuarios</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Mensaje</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Más opciones</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Calendly</DropdownMenuItem>
                      <DropdownMenuItem>Slack</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Webhook</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Avanzado...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            Nuevo equipo
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Soporte</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Apariencia</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={appearance.statusBar}
            onCheckedChange={(checked) =>
              setAppearance({ ...appearance, statusBar: checked === true })
            }
          >
            Barra de estado
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={appearance.activityBar}
            onCheckedChange={(checked) =>
              setAppearance({ ...appearance, activityBar: checked === true })
            }
            disabled
          >
            Barra de actividad
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={appearance.panel}
            onCheckedChange={(checked) =>
              setAppearance({ ...appearance, panel: checked === true })
            }
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel inset>Posición del panel</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={panelPosition}
            onValueChange={setPanelPosition}
          >
            <DropdownMenuRadioItem value="top">Arriba</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Abajo</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right" disabled>
              Derecha
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications.email}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, email: checked === true })
            }
          >
            <MailIcon />
            Email
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.sms}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, sms: checked === true })
            }
          >
            <MessageSquareIcon />
            SMS
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.push}
            onCheckedChange={(checked) =>
              setNotifications({ ...notifications, push: checked === true })
            }
          >
            <BellIcon />
            Push
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Método de pago</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
          >
            <DropdownMenuRadioItem value="card">
              <CreditCardIcon />
              Tarjeta
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="paypal">
              <WalletIcon />
              PayPal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bank">
              <Building2Icon />
              Transferencia
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Archivo</DropdownMenuLabel>
          <DropdownMenuItem>
            <FileIcon />
            Nuevo archivo
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderIcon />
            Nueva carpeta
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderOpenIcon />
              Abrir reciente
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Proyectos recientes</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <FileCodeIcon />
                    Proyecto Alpha
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileCodeIcon />
                    Proyecto Beta
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <MoreHorizontalIcon />
                      Más proyectos
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <FileCodeIcon />
                          Proyecto Gamma
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileCodeIcon />
                          Proyecto Delta
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <FolderSearchIcon />
                    Explorar...
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SaveIcon />
            Guardar
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DownloadIcon />
            Exportar
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Vista</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={appearance.statusBar}
            onCheckedChange={(checked) =>
              setAppearance({ ...appearance, statusBar: checked === true })
            }
          >
            <EyeIcon />
            Mostrar barra lateral
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={appearance.panel}
            onCheckedChange={(checked) =>
              setAppearance({ ...appearance, panel: checked === true })
            }
          >
            <LayoutIcon />
            Mostrar barra de estado
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <PaletteIcon />
              Tema
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Apariencia</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">
                      <SunIcon />
                      Claro
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <MoonIcon />
                      Oscuro
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <MonitorIcon />
                      Sistema
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem>
            <PencilIcon />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Compartir
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <TrashIcon />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <HelpCircleIcon />
            Ayuda y soporte
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileTextIcon />
            Documentación
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            Cerrar sesión
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function MissingComponentDemos() {
  return (
    <div className="space-y-12">
      {/* Menús */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Menús</h2>
        <div className="flex flex-col gap-8">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Dropdown Menu</h3>
            <div>
              <DropdownMenuDemo />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Context Menu</h3>
            <ContextMenu>
              <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-md border border-dashed text-sm">
                Clic derecho aquí
              </ContextMenuTrigger>
              <ContextMenuContent className="w-52">
                <ContextMenuItem>
                  Atrás
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem disabled>
                  Adelante
                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked>
                  Mostrar marcadores
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuRadioGroup value="pedro">
                  <ContextMenuLabel>Personas</ContextMenuLabel>
                  <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                </ContextMenuRadioGroup>
              </ContextMenuContent>
            </ContextMenu>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Menubar</h3>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Archivo</MenubarTrigger>
                <MenubarContent>
                  <MenubarGroup>
                    <MenubarLabel>
                      Heading
                    </MenubarLabel>
                    <MenubarItem>
                      Nueva pestaña <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                  </MenubarGroup>
                  <MenubarGroup>
                    <MenubarItem>
                      Nueva ventana <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger>Compartir</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>Email</MenubarItem>
                        <MenubarItem>Mensajes</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarGroup>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Editar</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Deshacer <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Rehacer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarCheckboxItem checked>
                    Mostrar URLs completas
                  </MenubarCheckboxItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Navigation Menu</h3>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Inicio</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-2 p-2">
                      <li>
                        <NavigationMenuLink
                          render={
                            <Link
                              href="/"
                              className="block rounded-md p-3 hover:bg-accent"
                            />
                          }
                        >
                          <div className="font-medium">VOLTA</div>
                          <p className="text-sm text-muted-foreground">
                            Componentes y estilos para tus apps.
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    render={<Link href="/components" />}
                  >
                    Componentes
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Command</h3>
            <Command className="max-w-md rounded-lg border shadow-md">
              <CommandInput placeholder="Buscar comando..." />
              <CommandList>
                <CommandEmpty>Sin resultados.</CommandEmpty>
                <CommandGroup heading="Sugerencias">
                  <CommandItem>Calendario</CommandItem>
                  <CommandItem>Buscar emoji</CommandItem>
                  <CommandItem disabled>Calculadora</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Ajustes">
                  <CommandItem>
                    Perfil
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    Facturación
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      </section>

      {/* Overlays */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Overlays adicionales</h2>
        <div className="flex flex-wrap gap-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Abrir Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer</DrawerTitle>
                <DrawerDescription>
                  Panel deslizable desde la parte inferior.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Confirmar</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Button
            variant="outline"
            onClick={() =>
              toast("Evento creado", {
                description: "Domingo, 3 de diciembre a las 9:00 AM",
                action: {
                  label: "Deshacer",
                  onClick: () => console.log("Deshacer"),
                },
              })
            }
          >
            Mostrar Toast
          </Button>

          <Button variant="outline" render={<Link href="/demo" />}>
            Ver demo Sidebar
          </Button>
        </div>
      </section>

      {/* Formularios adicionales */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Formularios adicionales</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Combobox</h3>
              <Combobox items={frameworks}>
                <ComboboxInput placeholder="Selecciona un framework..." />
                <ComboboxContent>
                  <ComboboxEmpty>Sin resultados.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item.value} value={item}>
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Native Select</h3>
              <NativeSelect defaultValue="option1">
                <NativeSelectOption value="option1">Opción 1</NativeSelectOption>
                <NativeSelectOption value="option2">Opción 2</NativeSelectOption>
                <NativeSelectOption value="option3">Opción 3</NativeSelectOption>
              </NativeSelect>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Input OTP</h3>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Input Group</h3>
              <div className="grid max-w-sm gap-4">
                <InputGroup>
                  <InputGroupInput placeholder="Buscar..." />
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">12 resultados</InputGroupAddon>
                </InputGroup>
                <InputGroup>
                  <InputGroupInput placeholder="ejemplo.com" className="pl-1!" />
                  <InputGroupAddon>
                    <InputGroupText>https://</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Field</h3>
            <form className="max-w-md">
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Método de pago</FieldLegend>
                  <FieldDescription>
                    Todas las transacciones son seguras y encriptadas.
                  </FieldDescription>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="card-name">Nombre en la tarjeta</FieldLabel>
                      <Input id="card-name" placeholder="Evil Rabbit" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="card-number">Número de tarjeta</FieldLabel>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox id="same-address" defaultChecked />
                      <FieldLabel htmlFor="same-address" className="font-normal">
                        Igual que dirección de envío
                      </FieldLabel>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="comments">Comentarios</FieldLabel>
                      <Textarea
                        id="comments"
                        placeholder="Comentarios adicionales"
                        className="resize-none"
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </form>
          </div>
        </div>
      </section>

      {/* Layout y visualización */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Layout y visualización</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Carousel</h3>
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Resizable</h3>
            <ResizablePanelGroup
              orientation="horizontal"
              className="max-w-md rounded-lg border"
            >
              <ResizablePanel defaultSize={50}>
                <div className="flex h-40 items-center justify-center p-4">
                  <span className="font-semibold">Uno</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-40 items-center justify-center p-4">
                  <span className="font-semibold">Dos</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <h3 className="text-lg font-medium">Chart</h3>
            <ChartContainer config={chartConfig} className="min-h-[220px] w-full max-w-xl">
              <BarChart accessibilityLayer data={chartData}>
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </section>

      {/* Utilidades UI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Utilidades UI</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Button Group</h3>
              <ButtonGroup>
                <Button variant="resting">Button</Button>
                <ButtonGroupSeparator />
                <Button size="icon" variant="resting">
                  <PlusIcon />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <ButtonGroup className="hidden sm:flex">
                  <Button variant="outline" size="icon" aria-label="Volver">
                    <ArrowLeftIcon />
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="outline">Archivar</Button>
                  <Button variant="outline">Reportar</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button variant="outline">Posponer</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="outline" size="icon" aria-label="Más opciones" />
                      }
                    >
                      <MoreHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <ArchiveIcon />
                          Archivar
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ButtonGroup>
              </ButtonGroup>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Kbd</h3>
              <div className="flex flex-col gap-3">
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>⇧</Kbd>
                  <Kbd>⌥</Kbd>
                  <Kbd>⌃</Kbd>
                </KbdGroup>
                <KbdGroup>
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>B</Kbd>
                </KbdGroup>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Spinner</h3>
              <div className="flex items-center gap-3">
                <Spinner />
                <span className="text-sm text-muted-foreground">Cargando...</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Item</h3>
              <div className="flex max-w-md flex-col gap-4">
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>Item básico</ItemTitle>
                    <ItemDescription>
                      Un item simple con título y descripción.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button variant="outline" size="sm">
                      Acción
                    </Button>
                  </ItemActions>
                </Item>
                <Item variant="outline" size="sm" render={<a href="#" />}>
                  <ItemMedia>
                    <BadgeCheckIcon className="size-5" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Tu perfil ha sido verificado.</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <ChevronRightIcon className="size-4" />
                  </ItemActions>
                </Item>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Empty</h3>
              <Empty className="border">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FolderCodeIcon />
                  </EmptyMedia>
                  <EmptyTitle>Sin proyectos</EmptyTitle>
                  <EmptyDescription>
                    Aún no has creado ningún proyecto. Empieza creando el primero.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <div className="flex gap-2">
                    <Button>Crear proyecto</Button>
                    <Button variant="outline">Importar</Button>
                  </div>
                </EmptyContent>
              </Empty>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
