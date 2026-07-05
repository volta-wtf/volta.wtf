// Importar solo los iconos que actualmente necesitamos
import {
  MinusIcon as _MinusIcon,
  PlusIcon as _PlusIcon,

  MoreHorizontalIcon as _MoreHorizontalIcon,
  MoreVerticalIcon as _MoreVerticalIcon,

  MoonIcon as _MoonIcon,
  SunIcon as _SunIcon,
  CircleArrowLeftIcon as _CircleArrowLeftIcon,
  CircleXIcon as _CircleXIcon,
  XIcon as _XIcon,
  MenuIcon as _MenuIcon,
  CheckIcon as _CheckIcon,
  ChevronUpIcon as _ChevronUpIcon,
  ChevronRightIcon as _ChevronRightIcon,
  ChevronDownIcon as _ChevronDownIcon,
  ChevronLeftIcon as _ChevronLeftIcon,
  SearchIcon as _SearchIcon,
  Loader2Icon as _Loader2Icon,
  //   PencilIcon as _PencilIcon,
  //   TrashIcon as _TrashIcon,
  //   SaveIcon as _SaveIcon,
  //   BellIcon as _BellIcon,
  //   MessageCircleIcon as _MessageCircleIcon,
  //   MailIcon as _MailIcon,
  //   UserIcon as _UserIcon,
  //   SettingsIcon as _SettingsIcon,
  //   LogOutIcon as _LogOutIcon,
  //   HelpCircleIcon as _HelpCircleIcon,
  InfoIcon as _InfoIcon,
  CircleCheckIcon as _CircleCheckIcon,
  TriangleAlertIcon as _TriangleAlertIcon,
  OctagonXIcon as _OctagonXIcon,
  //   AlertCircleIcon as _AlertCircleIcon,
  //   FilterIcon as _FilterIcon,
  //   ArrowUpDownIcon as _ArrowUpDownIcon,
  //   DownloadIcon as _DownloadIcon,
  //   UploadIcon as _UploadIcon,
  //   FileIcon as _FileIcon,
  //   FolderIcon as _FolderIcon,
} from "lucide-react"

// Mapeo semántico de iconos - Nombres que describen el CONTEXTO, no la forma
export const defaultIcons = {
  // System icons
  // back: _CircleArrowLeftIcon,
  close: _XIcon,

  optionsH: _MoreHorizontalIcon,
  optionsV: _MoreVerticalIcon,

  ellipsis: _MoreHorizontalIcon,

  // clear: _CircleXIcon,

  // Select, dropdown, menú asociado a un campo (arrow_drop_down)
  dropright: _ChevronRightIcon,
  dropdown: _ChevronDownIcon,
  dropup: _ChevronUpIcon,
  // Accordion, panel expandible, sección colapsable (expand_more)
  showMore: _ChevronDownIcon,
  showLess: _ChevronUpIcon,
  expand: _ChevronDownIcon,
  collapse: _ChevronUpIcon,
  // Navegación jerárquica (tree, sidebar) (chevron_right)
  goInternal: _ChevronRightIcon,

  scrollDown: _ChevronDownIcon,
  scrollUp: _ChevronUpIcon,

  checked: _CheckIcon, // Checkboxes
  selected: _CheckIcon,

  separator: _MinusIcon,

  // menu: _MenuIcon,

  // themeDark: _MoonIcon,
  // themeLight: _SunIcon,

  // Acciones generales
  // increase: _PlusIcon,
  // decrease: _MinusIcon,

  // Búsqueda
  search: _SearchIcon,

  // Estados
  // active: _CheckIcon,
  // inactive: _XIcon,

  // Navegación
  next: _ChevronRightIcon,
  prev: _ChevronLeftIcon,



  // up: _ChevronUpIcon,
  // down: _ChevronDownIcon,

  // Contenido
  // edit: _PencilIcon,
  // delete: _TrashIcon,
  // save: _SaveIcon,
  // cancel: _XIcon,

  // Comunicación
  // notification: _BellIcon,
  // message: _MessageCircleIcon,
  // email: _MailIcon,

  // Usuario
  // profile: _UserIcon,
  // settings: _SettingsIcon,
  // logout: _LogOutIcon,

  // Información
  // help: _HelpCircleIcon,
  info: _InfoIcon,
  success: _CircleCheckIcon,
  warning: _TriangleAlertIcon,
  error: _OctagonXIcon,
  loading: _Loader2Icon,

  // Datos
  // search: _SearchIcon,
  // filter: _FilterIcon,
  // sort: _ArrowUpDownIcon,

  // Archivos
  // download: _DownloadIcon,
  // upload: _UploadIcon,
  // file: _FileIcon,
  // folder: _FolderIcon,
} as const

// Type para autocompletado
export type DefaultIconName = keyof typeof defaultIcons

// Obtener todas las claves de iconos como array
export const defaultIconNames = Object.keys(defaultIcons) as DefaultIconName[]
