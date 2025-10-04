// Importar solo las funciones que actualmente necesitamos
import {
  addDays as _addDays,
  format as _format
} from "date-fns"

// Re-exportar funciones de date-fns que están en uso
export const addDays = _addDays
export const format = _format

// Funciones personalizadas de fecha
export function formatDateRange(from: Date, to: Date) {
  return `${_format(from, 'MMM d')} - ${_format(to, 'MMM d, yyyy')}`
}

// 📝 Funciones adicionales disponibles (descomenta según necesites):
//
// import {
//   addWeeks as _addWeeks,
//   addMonths as _addMonths,
//   subDays as _subDays,
//   subWeeks as _subWeeks,
//   subMonths as _subMonths,
//   isToday as _isToday,
//   isSameDay as _isSameDay,
//   isSameMonth as _isSameMonth,
//   isAfter as _isAfter,
//   isBefore as _isBefore,
//   startOfWeek as _startOfWeek,
//   endOfWeek as _endOfWeek,
//   startOfMonth as _startOfMonth,
//   endOfMonth as _endOfMonth,
//   getDay as _getDay,
//   getDaysInMonth as _getDaysInMonth
// } from "date-fns"
//
// export const addWeeks = _addWeeks
// export const addMonths = _addMonths
// export const subDays = _subDays
// export const subWeeks = _subWeeks
// export const subMonths = _subMonths
// export const isToday = _isToday
// export const isSameDay = _isSameDay
// export const isSameMonth = _isSameMonth
// export const isAfter = _isAfter
// export const isBefore = _isBefore
// export const startOfWeek = _startOfWeek
// export const endOfWeek = _endOfWeek
// export const startOfMonth = _startOfMonth
// export const endOfMonth = _endOfMonth
// export const getDay = _getDay
// export const getDaysInMonth = _getDaysInMonth