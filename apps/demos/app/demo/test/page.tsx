"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, CheckIcon, StarIcon, UserIcon, SettingsIcon, BellIcon, SearchIcon, HomeIcon, ShoppingCartIcon, HeartIcon, PlusIcon, XIcon, ChevronDownIcon, ChevronRightIcon } from "lucide-react"

// Importar todos los componentes de registry/ui usando los alias configurados
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Calendar } from "@/components/ui/calendar"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { MissingComponentDemos } from "./missing-demos"

export default function DemoPage() {
  const [mounted, setMounted] = useState(false)
  const [date, setDate] = useState<Date>()
  const [sliderValue, setSliderValue] = useState([50])
  const [progressValue, setProgressValue] = useState(75)
  const [switchValue, setSwitchValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState<boolean | "indeterminate">(true)
  const [checkbox2Value, setCheckbox2Value] = useState<boolean | "indeterminate">(false)
  const [radioValue, setRadioValue] = useState("option1")
  const [selectValue, setSelectValue] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [toggleValue, setToggleValue] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDate(new Date())
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto p-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="text-center space-y-4 divide-primary divide-x divide-y divide-y-reverse">
        <h1 className="text-4xl font-bold font-brand">Demostración de Componentes</h1>
        <p className="text-lg text-muted-foreground outline border focus-visible:ring-3">
          Una colección completa de todos los componentes disponibles en la biblioteca
        </p>
        <h1 className="border text-4xl font-bold font-brand">Demostración de Componentes</h1>
      </div>

      {/* MARK: Colores */}
      <section className="space-y-4 hidden">
        <h2 className="text-2xl font-semibold">Colores</h2>
        <div className="flex flex-col gap-4">


          <div className="flex flex-col flex-1">

            <div className="flex">

              <div id="neutral" className="flex flex-1 border">
                <div style={{ backgroundColor: "var(--background)" }} className="flex-1 content-end w-4/5 p-1">Background</div>
                <div className="flex flex-col divide-y w-1/5">
                  <div style={{ backgroundColor: "var(--canvas)" }} className="p-1">Canvas</div>
                  <div style={{ backgroundColor: "var(--body)" }} className="p-1">Body</div>
                </div>
              </div>

              <div id="contrast" className="flex flex-1">
                <div style={{ backgroundColor: "var(--foreground)" }} className="flex flex-1 items-end text-inverse p-1">Foreground</div>
              </div>

            </div>

            <div className="flex">

              <div id="surfaces" className="flex flex-1 border">
                <div style={{ backgroundColor: "var(--surface)" }} className="flex-1 w-3/5 content-end p-1">Surface</div>
                <div style={{ backgroundColor: "var(--surface)" }} className="flex flex-col divide-y w-1/5">
                  <div style={{ backgroundColor: "var(--surface-bright)" }} className="flex-1 p-1 content-end">Surface<br />Bright</div>
                  <div style={{ backgroundColor: "var(--silent)" }} className="flex-1 p-1 content-end">Silent</div>
                  <div style={{ backgroundColor: "var(--muted)" }} className="flex-1 p-1 content-end">Muted</div>
                  <div style={{ backgroundColor: "var(--surface-dim)" }} className="flex-1 p-1 content-end">Surface<br />Dim</div>
                </div>
                <div className="flex flex-col divide-y w-1/5">
                  <div style={{ backgroundColor: "var(--surface-highest)" }} className="flex-1 p-1 content-end">Surface<br />Highest</div>
                  <div style={{ backgroundColor: "var(--surface-high)" }} className="flex-1 p-1 content-end">Surface<br />High</div>
                  <div style={{ backgroundColor: "var(--surface-base)" }} className="flex-1 p-1 content-end">Surface<br />Base</div>
                  <div style={{ backgroundColor: "var(--surface-low)" }} className="flex-1 p-1 content-end">Surface<br />Low</div>
                  <div style={{ backgroundColor: "var(--surface-lowest)" }} className="flex-1 p-1 content-end">Surface<br />Lowest</div>
                </div>
              </div>

              <div id="foreground" className="flex-1">
                <div id="content" className="flex flex-1">
                  <div style={{ backgroundColor: "var(--content)" }} className="text-inverse content-end w-4/5 p-1">Content</div>
                  <div className="divide-y flex flex-col w-1/5">
                    <div style={{ backgroundColor: "var(--display)" }} className="text-inverse p-1">Display</div>
                    <div style={{ backgroundColor: "var(--heading)" }} className="text-inverse p-1">Heading</div>
                    <div style={{ backgroundColor: "var(--text)" }} className="text-inverse p-1">Text</div>
                    <div style={{ backgroundColor: "var(--icon)" }} className="text-inverse p-1">Icon</div>
                    <div style={{ backgroundColor: "var(--border)" }} className="p-1">Border</div>
                  </div>
                </div>

                <div id="controls" className="flex flex-1">
                  <div style={{ backgroundColor: "var(--controls)" }} className="text-inverse content-end w-4/5 p-1">Controls</div>
                  <div className="divide-y flex flex-col w-1/5">
                    <div style={{ backgroundColor: "var(--outline)" }} className="p-1">Outline</div>
                    <div style={{ backgroundColor: "var(--track)" }} className="p-1">Track</div>
                    <div style={{ backgroundColor: "var(--input)" }} className="p-1">Input</div>
                    <div style={{ backgroundColor: "var(--button)" }} className="p-1">Button</div>
                  </div>
                </div>

                <div className="flex">

                  <div id="activity" style={{ backgroundColor: "var(--active)" }} className="text-inverse content-end w-2/5 p-1">Activity</div>

                  <div id="actions" className="divide-y w-1/5">
                    <div style={{ backgroundColor: "var(--link)" }} className="p-1 text-inverse">Link</div>
                    <div style={{ backgroundColor: "var(--visited)" }} className="p-1 text-inverse">Visited</div>
                    <div style={{ backgroundColor: "var(--active)" }} className="p-1 text-inverse">Active</div>
                    <div style={{ backgroundColor: "var(--ring)" }} className="p-1">Ring</div>
                  </div>

                  <div id="accent" style={{ backgroundColor: "var(--controls)" }} className="text-inverse content-end w-1/5 p-1">Accent</div>

                  <div id="interactivity" className="divide-y w-1/5">
                    <div style={{ backgroundColor: "var(--caret)" }} className="p-1 text-inverse">Caret</div>
                    <div style={{ backgroundColor: "var(--selection)", color: "var(--on-selection)" }} className="p-1">Selection</div>
                    <div style={{ backgroundColor: "var(--accented)", color: "var(--on-accented)" }} className="p-1">Accented</div>
                    <div style={{ backgroundColor: "var(--highlighted)", color: "var(--on-light)" }} className="p-1">Highlighted</div>
                    <div style={{ backgroundColor: "var(--selected)" }} className="p-1">Selected</div>
                  </div>

                </div>

                <div className="flex">

                  <div id="ambient" style={{ backgroundColor: "var(--ambient)" }} className="text-inverse content-end w-1/5 p-1">Ambient</div>

                  <div id="actions" className="flex flex-col divide-y w-1/5">
                    <div style={{ backgroundColor: "var(--decoration)", color: "var(--on-dark)" }} className="p-1 flex-1 content-end">Decoration</div>
                    <div style={{ backgroundColor: "var(--scrim)", color: "var(--on-dark)" }} className="p-1 flex-1 content-end">Scrim</div>
                    <div style={{ backgroundColor: "var(--backdrop)", color: "var(--on-dark)" }} className="p-1 flex-1 content-end">Backdrop</div>
                    <div style={{ backgroundColor: "var(--shadow)", color: "var(--on-dark)" }} className="p-1 flex-1 content-end">Shadow</div>
                  </div>

                  <div id="indication" className="flex flex-col divide-y w-1/5">
                    <div style={{ backgroundColor: "var(--indication)" }} className="p-1 flex-1 content-end">Indication</div>
                    <div style={{ backgroundColor: "var(--mark)" }} className="p-1">Mark</div>
                    <div style={{ backgroundColor: "var(--target)" }} className="p-1">Target</div>
                    <div style={{ backgroundColor: "var(--search-text)" }} className="p-1">Search text</div>
                  </div>

                  <div id="accent" style={{ backgroundColor: "var(--controls)" }} className="text-inverse content-end w-1/5 p-1">States</div>

                  <div id="states" className="flex flex-col divide-y w-1/5">
                    <div style={{ backgroundColor: "var(--state-hovered)", color: "var(--on-light)" }} className="p-1 flex-1 content-end">Hovered</div>
                    <div style={{ backgroundColor: "var(--state-focused)", color: "var(--on-light)" }} className="p-1 flex-1 content-end">Focused</div>
                    <div style={{ backgroundColor: "var(--state-pressed)", color: "var(--on-light)" }} className="p-1 flex-1 content-end">Pressed</div>
                    <div style={{ backgroundColor: "var(--state-dragging)", color: "var(--on-light)" }} className="p-1 flex-1 content-end">Dragging</div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          <div className="flex flex-col flex-1">

            <div className="flex">

              <div id="neutral" className="flex flex-col flex-1">
                <div style={{ backgroundColor: "var(--primary)" }} className="flex-1 content-end p-1">Primary</div>
                <div className="flex flex-col divide-y">
                  <div style={{ backgroundColor: "var(--primary-hover)" }} className="p-1">Hover</div>
                  <div style={{ backgroundColor: "var(--primary-pressed)" }} className="p-1">Pressed</div>
                  <div style={{ backgroundColor: "var(--primary-highlighted)" }} className="p-1">Highlighted</div>
                  <div style={{ backgroundColor: "var(--primary-highlighted-hover)" }} className="p-1">Hover</div>
                  <div style={{ backgroundColor: "var(--primary-highlighted-pressed)" }} className="p-1">Pressed</div>
                </div>
              </div>

              <div id="neutral" className="flex flex-col flex-1">
                <div style={{ backgroundColor: "var(--secondary)" }} className="flex-1 content-end p-1">Secondary</div>
                <div className="flex flex-col divide-y">
                  <div style={{ backgroundColor: "var(--secondary-hover)" }} className="p-1">Hover</div>
                  <div style={{ backgroundColor: "var(--secondary-pressed)" }} className="p-1">Pressed</div>
                  <div style={{ backgroundColor: "var(--secondary-highlighted)" }} className="p-1">Highlighted</div>
                  <div style={{ backgroundColor: "var(--secondary-highlighted-hover)" }} className="p-1">Hover</div>
                  <div style={{ backgroundColor: "var(--secondary-highlighted-pressed)" }} className="p-1">Pressed</div>
                </div>
              </div>

              <div id="neutral" className="flex flex-col flex-1">
                <div style={{ backgroundColor: "var(--tertiary)" }} className="flex-1 content-end p-1">Tertiary</div>
                <div className="flex flex-col divide-y">
                  <div style={{ backgroundColor: "var(--tertiary-hover)" }} className="p-1">Hover</div>
                  <div style={{ backgroundColor: "var(--tertiary-pressed)" }} className="p-1">Pressed</div>
                  <div style={{ backgroundColor: "var(--tertiary-highlighted)" }} className="p-1">Highlighted</div>
                  <div style={{ backgroundColor: "var(--tertiary-highlighted-hover)" }} className="p-1">Hover</div>
                  <div style={{ backgroundColor: "var(--tertiary-highlighted-pressed)" }} className="p-1">Pressed</div>
                </div>
              </div>


            </div>


          </div>



        </div>
      </section>

      {/* MARK: Borders */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Bordes</h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 p-card aspect-square m-1 outline-color border-outline">Outline</div>
          <div className="flex-1 p-card aspect-square m-1 rule-color border-rule">Border rule</div>
          <div className="flex-1 p-card aspect-square m-1 line-color border-line">Border line</div>
          <div className="flex-1 p-card aspect-square m-1 divider-color border-divider">Border divider</div>
          <div className="flex-1 p-card aspect-square m-1 border-color border">Border</div>
          <div className="flex-1 p-card aspect-square m-1 border-color-layout border-layout">Border layout</div>
          <div className="flex-1 p-card aspect-square m-1 border-color-region border-region">Border region</div>
          <div className="flex-1 p-card aspect-square m-1 border-color-overlay border-overlay">Border overlay</div>
          <div className="flex-1 p-card aspect-square m-1 border-color-element border-element">Border element</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 p-card aspect-6/3 m-1 outline-color border-y-outline">Outline</div>
          <div className="flex-1 p-card aspect-6/3 m-1 rule-color border-y-rule">Border rule</div>
          <div className="flex-1 p-card aspect-6/3 m-1 line-color border-y-line">Border line</div>
          <div className="flex-1 p-card aspect-6/3 m-1 divider-color border-y-divider">Border divider</div>
          <div className="flex-1 p-card aspect-6/3 m-1 border-color border-y">Border</div>
          <div className="flex-1 p-card aspect-6/3 m-1 border-color-layout border-y-layout">Border layout</div>
          <div className="flex-1 p-card aspect-6/3 m-1 border-color-region border-y-region">Border region</div>
          <div className="flex-1 p-card aspect-6/3 m-1 border-color-overlay border-y-overlay">Border overlay</div>
          <div className="flex-1 p-card aspect-6/3 m-1 border-color-element border-y-element">Border element</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 p-card aspect-square m-1 bg-outline">Outline</div>
          <div className="flex-1 p-card aspect-square m-1 bg-rule">Rule</div>
          <div className="flex-1 p-card aspect-square m-1 bg-line">Line</div>
          <div className="flex-1 p-card aspect-square m-1 bg-divider">Divider</div>
          <div className="flex-1 p-card aspect-square m-1 bg-border">Border</div>
          <div className="flex-1 p-card aspect-square m-1 bg-border-layout">Border layout</div>
          <div className="flex-1 p-card aspect-square m-1 bg-border-region">Border region</div>
          <div className="flex-1 p-card aspect-square m-1 bg-border-overlay">Border overlay</div>
          <div className="flex-1 p-card aspect-square m-1 bg-border-element">Border element</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col flex-1 aspect-square m-1 divider divide-y border-y">
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
          </div>
          <div className="flex flex-col flex-1 aspect-square m-1 divider-rule divide-y-rule">
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
          </div>
          <div className="flex flex-col flex-1 aspect-square m-1 divider-rule divide-y-rule">
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
          </div>
          <div className="flex flex-1 aspect-square m-1 divider divide-x">
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
            <div className="flex-1"></div>
          </div>
        </div>
      </section>

      {/* MARK: Navegación */}
      <section className="space-y-4 hidden">
        <h2 className="text-2xl font-semibold">Navegación</h2>
        <div className="space-y-6">

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Breadcrumb</h3>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Componentes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Demo</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Pagination</h3>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>

      {/* MARK: Botones */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Botones</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="tertiary">Terciario</Button>
          <Button variant="default">Button</Button>
          <Button variant="resting">Resting</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Pequeño</Button>
          <Button size="lg">Grande</Button>
          <Button disabled>Deshabilitado</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Primario</Badge>
          <Badge variant="secondary">Secundario</Badge>
          <Badge variant="tertiary">Terciario</Badge>
          <Badge variant="default">Por defecto</Badge>
          <Badge variant="resting">Resting</Badge>
          <Badge variant="destructive">Destructivo</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="link">Link</Badge>
        </div>
      </section>

      {/* MARK: Formularios */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Formularios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-demo">Input</Label>
              <Input
                id="input-demo"
                placeholder="Escribe algo aquí..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="textarea-demo">Textarea</Label>
              <Textarea
                id="textarea-demo"
                placeholder="Escribe un mensaje más largo..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Select</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Opción 1</SelectItem>
                  <SelectItem value="option2">Opción 2</SelectItem>
                  <SelectItem value="option3">Opción 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">

            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="checkbox-demo"
                  checked={checkboxValue}
                  onCheckedChange={setCheckboxValue}
                />
                <Label htmlFor="checkbox-demo">Acepto los términos y condiciones</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="checkbox-demo2"
                  checked={checkbox2Value}
                  onCheckedChange={setCheckbox2Value}
                />
                <Label htmlFor="checkbox-demo2">Mantenme al tanto de las novedades</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Radio Group</Label>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="radio1" />
                  <Label htmlFor="radio1">Opción 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="radio2" />
                  <Label htmlFor="radio2">Opción 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="radio3" />
                  <Label htmlFor="radio3">Opción 3</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="switch-demo"
                checked={switchValue}
                onCheckedChange={setSwitchValue}
              />
              <Label htmlFor="switch-demo">Recibir notificaciones</Label>
            </div>
          </div>
        </div>
      </section>

      {/* MARK: Controles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Controles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Slider</Label>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">Valor: {sliderValue[0]}</p>
            </div>

            <div className="space-y-2">
              <Label>Progress</Label>
              <Progress value={progressValue} className="w-full" />
              <p className="text-sm text-muted-foreground">Progreso: {progressValue}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Toggle</Label>
              <div className="flex space-x-2">
                <Toggle pressed={toggleValue} onPressedChange={setToggleValue}>
                  <StarIcon className="h-4 w-4" />
                </Toggle>
                <Toggle>
                  <HeartIcon className="h-4 w-4" />
                </Toggle>
                <Toggle>
                  <UserIcon className="h-4 w-4" />
                </Toggle>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Toggle Group</Label>
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <strong>B</strong>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <em>I</em>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <u>U</u>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>

      {/* MARK: Cards y Alerts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards y Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Título de la Card</CardTitle>
              <CardDescription>
                Esta es una descripción de la card que proporciona contexto adicional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>El contenido principal de la card va aquí.</p>
            </CardContent>
            <CardFooter>
              <Button>Acción</Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <Alert>
              <AlertTitle>¡Información!</AlertTitle>
              <AlertDescription>
                Este es un mensaje informativo para el usuario.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTitle>¡Error!</AlertTitle>
              <AlertDescription>
                Ha ocurrido un error que requiere atención.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* MARK: Avatar y Skeleton */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Avatar y Skeleton</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Avatars</Label>
              <div className="flex space-x-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Usuario" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Skeleton</Label>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARK: Tabs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tabs</h2>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <Card>
              <CardHeader>
                <CardTitle>Tab 1</CardTitle>
                <CardDescription>
                  Contenido del primer tab
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Este es el contenido del primer tab.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2">
            <Card>
              <CardHeader>
                <CardTitle>Tab 2</CardTitle>
                <CardDescription>
                  Contenido del segundo tab
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Este es el contenido del segundo tab.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3">
            <Card>
              <CardHeader>
                <CardTitle>Tab 3</CardTitle>
                <CardDescription>
                  Contenido del tercer tab
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Este es el contenido del tercer tab.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* MARK: Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Juan Pérez</TableCell>
              <TableCell>juan@example.com</TableCell>
              <TableCell>Administrador</TableCell>
              <TableCell>
                <Badge variant="default">Activo</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>María García</TableCell>
              <TableCell>maria@example.com</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>
                <Badge variant="secondary">Inactivo</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Carlos López</TableCell>
              <TableCell>carlos@example.com</TableCell>
              <TableCell>Moderador</TableCell>
              <TableCell>
                <Badge variant="default">Activo</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* MARK: Accordion y Collapsible */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Accordion y Collapsible</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Accordion</h3>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Qué es React?</AccordionTrigger>
                <AccordionContent>
                  React es una biblioteca de JavaScript para construir interfaces de usuario.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>¿Qué es TypeScript?</AccordionTrigger>
                <AccordionContent>
                  TypeScript es un superconjunto de JavaScript que añade tipos estáticos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>¿Qué es Next.js?</AccordionTrigger>
                <AccordionContent>
                  Next.js es un framework de React para aplicaciones web de producción.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Collapsible</h3>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex items-center justify-between w-full">
                  <span>¿Mostrar más información?</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <Card>
                  <CardContent className="pt-6">
                    <p>Esta es información adicional que se muestra cuando el collapsible está abierto.</p>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* MARK: Dialogs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dialogs</h2>
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Abrir Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Título del Dialog</DialogTitle>
                <DialogDescription>
                  Esta es una descripción del dialog que explica su propósito.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Usuario
                  </Label>
                  <Input id="username" defaultValue="@peduarte" className="col-span-3" />
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará permanentemente el elemento.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Eliminar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Abrir Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Título del Sheet</SheetTitle>
                <SheetDescription>
                  Esta es una descripción del sheet lateral.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sheet-name" className="text-right">
                    Nombre
                  </Label>
                  <Input id="sheet-name" defaultValue="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sheet-username" className="text-right">
                    Usuario
                  </Label>
                  <Input id="sheet-username" defaultValue="@peduarte" className="col-span-3" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>

      {/* MARK: Popovers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Popovers</h2>
        <div className="flex flex-wrap gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover para tooltip</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Este es un tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Abrir Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Configuración</h4>
                  <p className="text-sm text-muted-foreground">
                    Ajusta la configuración para tu preferencia.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Ancho</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Máx. ancho</Label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Alto</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Máx. alto</Label>
                    <Input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">
                    El framework React para producción – creado por Vercel.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">
                      Desde diciembre 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </section>

      {/* MARK: Calendar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Calendar</h2>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </section>

      {/* MARK: Scroll Area */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Scroll Area</h2>
        <ScrollArea className="h-72 w-full rounded-md border p-4">
          <div className="space-y-4">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="text-sm">
                {i + 1}. Este es un elemento de la lista que se puede desplazar.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>

      {/* MARK: Aspect Ratio */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Aspect Ratio</h2>
        <div className="w-full max-w-sm">
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">16:9 Aspect Ratio</p>
            </div>
          </AspectRatio>
        </div>
      </section>

      {/* MARK: Separators */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Separators</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Separador horizontal</h3>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">
              Contenido después del separador
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm">Elemento 1</div>
            <Separator orientation="vertical" className="h-4" />
            <div className="text-sm">Elemento 2</div>
            <Separator orientation="vertical" className="h-4" />
            <div className="text-sm">Elemento 3</div>
          </div>
        </div>
      </section>

      {/* MARK: Componentes adicionales */}
      <MissingComponentDemos />

      {/* MARK: Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Typography</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Fonts</h3>
            <p className="font-brand">Brand - Prueba de texto</p>
            <p className="font-content">Content - Prueba de texto</p>
            <p className="font-decoration">Decoration - Prueba de texto</p>
            <p className="font-code">Code - Prueba de texto</p>
            <p className="font-digit">Digit - Prueba de texto</p>
            <p className="font-math">Math - Prueba de texto</p>
          </div>
        </div>
      </section>

      <div className="text-center pt-8">
        <p className="text-sm text-muted-foreground">
          Todos los componentes están disponibles en registry/ui
        </p>
      </div>
    </div>
  )
}