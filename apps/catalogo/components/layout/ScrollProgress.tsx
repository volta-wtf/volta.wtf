"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface ScrollProgressProps {
  className?: string
  /** Elemento a trackear el scroll. Si no se especifica, se usa la ventana */
  element?: HTMLElement | null
  /** ID del elemento a trackear (sin #) o selector CSS completo */
  target?: string
}

export const ScrollProgress = ({
  className,
  element,
  target,
}: ScrollProgressProps) => {
  const [progress, setProgress] = useState(0)
  const animationIdRef = useRef<number | undefined>(undefined)
  const pollIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const currentElementRef = useRef<HTMLElement | Window | null>(null)
  // Crear un ID único verdaderamente único para cada instancia
  const instanceIdRef = useRef<string>(`${Math.random().toString(36).slice(2, 11)}`)

  useEffect(() => {
    const instanceId = instanceIdRef.current
    console.log(`ScrollProgress [${instanceId}]: Inicializando con target "${target}"`)

    const updateProgress = () => {
      const scrollElement = currentElementRef.current
      if (!scrollElement) return

      let scrollTop: number
      let scrollHeight: number
      let clientHeight: number

      try {
        if (scrollElement === window) {
          scrollTop = window.pageYOffset || document.documentElement.scrollTop
          scrollHeight = document.documentElement.scrollHeight
          clientHeight = window.innerHeight
        } else {
          const el = scrollElement as HTMLElement
          scrollTop = el.scrollTop
          scrollHeight = el.scrollHeight
          clientHeight = el.clientHeight
        }

        const maxScroll = scrollHeight - clientHeight
        const currentProgress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0

        console.log(`ScrollProgress [${instanceId}]: scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, clientHeight: ${clientHeight}, maxScroll: ${maxScroll}, progress: ${currentProgress}%`)

        setProgress(Math.min(100, Math.max(0, currentProgress)))
      } catch (error) {
        console.error(`ScrollProgress [${instanceId}]: Error calculating progress`, error)
      }
    }

    // Usar requestAnimationFrame para scroll suave y sin demora
    const handleScroll = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      animationIdRef.current = requestAnimationFrame(() => {
        updateProgress()
      })
    }

    const connectToElement = (elementToListen: HTMLElement | Window) => {
      // Desconectar elemento anterior si existe
      if (currentElementRef.current && currentElementRef.current !== elementToListen) {
        currentElementRef.current.removeEventListener('scroll', handleScroll)
        console.log(`ScrollProgress [${instanceId}]: Desconectando elemento anterior`)
      }

      currentElementRef.current = elementToListen
      console.log(`ScrollProgress [${instanceId}]: Conectando a`, elementToListen)

      // Agregar listener
      elementToListen.addEventListener('scroll', handleScroll, { passive: true })

      // Calcular progreso inicial
      updateProgress()
    }

    const findAndConnectElement = () => {
      let elementToListen: HTMLElement | Window | null = null

      if (target) {
        // Si el target no empieza con # . [ o :, asumir que es un ID
        const selector = target.startsWith('#') || target.startsWith('.') || target.startsWith('[') || target.startsWith(':')
          ? target
          : `#${target}`

        const foundElement = document.querySelector(selector) as HTMLElement
        if (foundElement) {
          elementToListen = foundElement
          console.log(`ScrollProgress [${instanceId}]: Encontrado elemento dinámico`, foundElement, `scrollHeight: ${foundElement.scrollHeight}, clientHeight: ${foundElement.clientHeight}`)
        } else {
          console.log(`ScrollProgress [${instanceId}]: Elemento "${selector}" aún no existe, reintentando...`)
          return false
        }
      } else if (element) {
        elementToListen = element
      } else {
        elementToListen = window
      }

      if (elementToListen) {
        connectToElement(elementToListen)
        return true
      }
      return false
    }

    // Intentar conectar inmediatamente
    if (findAndConnectElement()) {
      // Elemento encontrado, limpiar polling si existe
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = undefined
      }
    } else {
      // Elemento no encontrado, iniciar polling para elementos dinámicos
      console.log(`ScrollProgress [${instanceId}]: Iniciando polling para elemento dinámico`)
      pollIntervalRef.current = setInterval(() => {
        if (findAndConnectElement()) {
          // Elemento encontrado, limpiar polling
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current)
            pollIntervalRef.current = undefined
          }
          console.log(`ScrollProgress [${instanceId}]: Elemento dinámico encontrado, polling detenido`)
        }
      }, 100) // Verificar cada 100ms
    }

    // Limpiar al desmontar
    return () => {
      console.log(`ScrollProgress [${instanceId}]: Limpiando`)

      // Limpiar polling
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
      }

      // Limpiar listener
      if (currentElementRef.current) {
        currentElementRef.current.removeEventListener('scroll', handleScroll)
      }

      // Limpiar animación
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [element, target])

  // Debug: Log del render
  console.log(`ScrollProgress [${instanceIdRef.current}]: Renderizando con progress ${progress}% para target "${target}"`)

  return (
    <div
      className={cn("w-full h-px bg-primary/10 overflow-hidden", className)}
      data-scroll-progress-target={target}
      data-scroll-progress-id={instanceIdRef.current}
    >
      <div
        className="h-full bg-primary/70 transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}