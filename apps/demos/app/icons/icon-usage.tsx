"use client"

// Ejemplo de cómo usar el nuevo sistema de iconos
import { Icon } from "@/components/media/icon"

export function ExampleIconUsage() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Sistema de Iconos - Ejemplos de Uso</h2>

      {/* Opción 1: Nueva sintaxis concisa con props booleanos */}
      <div className="space-y-2">
        <h3 className="font-semibold">Sintaxis Súper Concisa (Más Nueva) 🚀</h3>

        {/* Colores diferentes */}
        <div className="flex items-center gap-2">
          <Icon.Decrease />
          <Icon.Decrease primary lg />
          <Icon name="decrease" color="primary" size="lg" />
        </div>

        {/* Colores diferentes */}
        <div className="flex items-center gap-2">
          <Icon.Increase primary lg/>
          <Icon.Decrease destructive lg/>
          <Icon.Increase success md/>
          <Icon.Decrease warning sm/>
          <Icon.Increase muted xs/>
        </div>

                 {/* Tamaños diferentes con el mismo color */}
         <div className="flex items-center gap-2">
           <Icon.Increase primary xs/>
           <Icon.Increase primary sm/>
           <Icon.Increase primary md/>
           <Icon.Increase primary lg/>
           <Icon.Increase primary xl/>
           <Icon.Increase primary size="2xl"/>
         </div>

        {/* Con interactividad */}
        <div className="flex items-center gap-2">
          <Icon.Increase
            primary
            lg
            onClick={() => console.log('¡Incrementar!')}
            aria-label="Incrementar valor"
          />
          <Icon.Decrease
            destructive
            lg
            onClick={() => console.log('¡Decrementar!')}
            aria-label="Decrementar valor"
          />
        </div>
      </div>

      {/* Opción 2: Sintaxis Icon.Name con props nombrados */}
      <div className="space-y-2">
        <h3 className="font-semibold">Sintaxis Icon.Name (Recomendada) ✨</h3>

        {/* Tamaños diferentes */}
        <div className="flex items-center gap-2">
          <Icon.Increase size="xs" />
          <Icon.Increase size="sm" />
          <Icon.Increase size="md" />
          <Icon.Increase size="lg" />
          <Icon.Increase size="xl" />
          <Icon.Increase size="2xl" />
        </div>

        {/* Colores diferentes */}
        <div className="flex items-center gap-2">
          <Icon.Decrease color="default" />
          <Icon.Decrease color="primary" />
          <Icon.Decrease color="destructive" />
          <Icon.Decrease color="success" />
          <Icon.Decrease color="warning" />
          <Icon.Decrease color="muted" />
        </div>

        {/* Con interactividad */}
        <div className="flex items-center gap-2">
          <Icon.Increase
            size="lg"
            color="primary"
            onClick={() => console.log('¡Incrementar!')}
            aria-label="Incrementar valor"
          />
          <Icon.Decrease
            size="lg"
            color="destructive"
            onClick={() => console.log('¡Decrementar!')}
            aria-label="Decrementar valor"
          />
        </div>
      </div>

      {/* Opción 3: Sintaxis anterior (para compatibilidad) */}
      <div className="space-y-2">
        <h3 className="font-semibold">Sintaxis Anterior (Compatibilidad)</h3>

        {/* Tamaños diferentes */}
        <div className="flex items-center gap-2">
          <Icon name="increase" size="xs" />
          <Icon name="increase" size="sm" />
          <Icon name="increase" size="md" />
          <Icon name="increase" size="lg" />
          <Icon name="increase" size="xl" />
          <Icon name="increase" size="2xl" />
        </div>

        {/* Colores diferentes */}
        <div className="flex items-center gap-2">
          <Icon name="decrease" color="default" />
          <Icon name="decrease" color="primary" />
          <Icon name="decrease" color="destructive" />
          <Icon name="decrease" color="success" />
          <Icon name="decrease" color="warning" />
          <Icon name="decrease" color="muted" />
        </div>

        {/* Con interactividad */}
        <div className="flex items-center gap-2">
          <Icon
            name="increase"
            size="lg"
            color="primary"
            onClick={() => console.log('¡Incrementar!')}
            aria-label="Incrementar valor"
          />
          <Icon
            name="decrease"
            size="lg"
            color="destructive"
            onClick={() => console.log('¡Decrementar!')}
            aria-label="Decrementar valor"
          />
        </div>
      </div>

      {/* Ejemplo en botones (como en activity-goal) */}
      <div className="space-y-2">
        <h3 className="font-semibold">En Botones (Ejemplos de Uso Real)</h3>
        <div className="flex gap-2">
          {/* ❌ Antes: */}
          {/* <MinusIcon /> */}
          {/* <PlusIcon /> */}

          {/* 🚀 Ahora (Sintaxis súper concisa): */}
          <button className="p-2 border rounded">
            <Icon.Decrease destructive sm />
          </button>
          <button className="p-2 border rounded">
            <Icon.Increase success sm />
          </button>
        </div>
      </div>
    </div>
  )
}

// Para usar en activity-goal.tsx, tienes varias opciones:
/*
// ❌ Antes:
import { MinusIcon, PlusIcon } from "lucide-react"
<MinusIcon />
<PlusIcon />

// 🚀 Ahora (Sintaxis súper concisa - Recomendada):
import { Icon } from "@/ui/lib"
<Icon.Decrease destructive sm />
<Icon.Increase success sm />

// ✨ O con la sintaxis Icon.Name:
import { Icon } from "@/lib/icon"
<Icon.Decrease color="destructive" size="sm" />
<Icon.Increase color="success" size="sm" />

// 🔄 O con la sintaxis anterior (para compatibilidad):
import { Icon } from "@/lib/icon"
<Icon name="decrease" color="destructive" size="sm" />
<Icon name="increase" color="success" size="sm" />
*/