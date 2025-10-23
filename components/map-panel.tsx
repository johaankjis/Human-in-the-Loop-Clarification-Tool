"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation } from "lucide-react"
import type { Vehicle } from "@/lib/types"

interface MapPanelProps {
  vehicle: Vehicle
}

export function MapPanel({ vehicle }: MapPanelProps) {
  const getStatusColor = (status: Vehicle["status"]) => {
    switch (status) {
      case "active":
        return "bg-chart-3"
      case "alert":
        return "bg-chart-5"
      case "idle":
        return "bg-chart-4"
      case "maintenance":
        return "bg-muted-foreground"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-secondary p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Vehicle Location</h3>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            GPS Active
          </Badge>
        </div>
      </div>

      <div className="relative aspect-video bg-secondary/30">
        {/* Map visualization placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            {/* Grid overlay for map aesthetic */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, oklch(0.65 0.19 240) 1px, transparent 1px),
                  linear-gradient(to bottom, oklch(0.65 0.19 240) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Vehicle marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className={`h-4 w-4 animate-pulse rounded-full ${getStatusColor(vehicle.status)}`} />
                <div
                  className={`absolute inset-0 animate-ping rounded-full ${getStatusColor(vehicle.status)} opacity-75`}
                />
              </div>
            </div>

            {/* Route path visualization */}
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 100 200 Q 200 100 300 200 T 500 200"
                stroke="oklch(0.55 0.22 200)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-secondary p-2">
            <Navigation className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Current Location</p>
            <p className="text-sm font-medium text-foreground">{vehicle.location.address}</p>
            <p className="font-mono text-xs text-muted-foreground">
              {vehicle.location.lat.toFixed(4)}, {vehicle.location.lng.toFixed(4)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-secondary/50 p-3">
          <div>
            <p className="text-xs text-muted-foreground">Last Update</p>
            <p className="font-mono text-sm font-medium text-foreground">
              {Math.floor((Date.now() - vehicle.lastUpdate.getTime()) / 60000)}m ago
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm font-medium capitalize text-foreground">{vehicle.status}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
