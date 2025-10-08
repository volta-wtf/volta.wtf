// Importar solo los iconos que actualmente necesitamos
import {
  MinusIcon as _MinusIcon,
  PlusIcon as _PlusIcon,

  MoonIcon as _MoonIcon,
  SunIcon as _SunIcon,
  CircleArrowLeftIcon as _CircleArrowLeftIcon,
  CircleXIcon as _CircleXIcon,
  XIcon as _XIcon,
  MenuIcon as _MenuIcon,
  //   CheckIcon as _CheckIcon,
  //   ChevronRightIcon as _ChevronRightIcon,
  //   ChevronLeftIcon as _ChevronLeftIcon,
  //   ChevronUpIcon as _ChevronUpIcon,
  ChevronDownIcon as _ChevronDownIcon,
  SearchIcon as _SearchIcon,
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
  //   InfoIcon as _InfoIcon,
  //   AlertTriangleIcon as _AlertTriangleIcon,
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
  back: _CircleArrowLeftIcon,
  close: _XIcon,
  clear: _CircleXIcon,

  select: _ChevronDownIcon,

  menu: _MenuIcon,

  themeDark: _MoonIcon,
  themeLight: _SunIcon,

  // Acciones generales
  increase: _PlusIcon,
  decrease: _MinusIcon,

  // Búsqueda
  search: _SearchIcon,

  // Estados
  // active: _CheckIcon,
  // inactive: _XIcon,

  // Navegación
  // next: _ChevronRightIcon,
  // previous: _ChevronLeftIcon,
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
  // info: _InfoIcon,
  // warning: _AlertTriangleIcon,
  // error: _AlertCircleIcon,

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
export type IconName = keyof typeof defaultIcons

// Función de utilidad para capitalizar nombres de iconos
export function capitalizeIconName<T extends IconName>(name: T): Capitalize<T> {
  return (name.charAt(0).toUpperCase() + name.slice(1)) as Capitalize<T>
}

// Obtener todas las claves de iconos como array
export const iconNames = Object.keys(defaultIcons) as IconName[]