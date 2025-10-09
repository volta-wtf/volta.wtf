"use client"

import { addDays } from "@/registry/primitives/lib/date"

import { Calendar } from "@/registry/components/ui/calendar"
import { Card, CardContent } from "@/registry/components/ui/card"

const start = new Date(2025, 5, 5)

export function CardsCalendar() {
  return (
    <Card className="hidden max-w-[260px] p-0 sm:flex">
      <CardContent className="p-0">
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={start}
          selected={{
            from: start,
            to: addDays(start, 8),
          }}
        />
      </CardContent>
    </Card>
  )
}
