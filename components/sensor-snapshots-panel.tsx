"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Clock, CheckCircle2 } from "lucide-react"
import type { SensorSnapshot } from "@/lib/types"
import Image from "next/image"

interface SensorSnapshotsPanelProps {
  snapshots: SensorSnapshot[]
}

export function SensorSnapshotsPanel({ snapshots }: SensorSnapshotsPanelProps) {
  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-secondary p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Sensor Snapshots</h3>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {snapshots.length} Images
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {snapshots.map((snapshot) => (
            <div key={snapshot.id} className="space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-secondary/30">
                <Image
                  src={snapshot.imageUrl || "/placeholder.svg"}
                  alt={`Sensor snapshot from ${snapshot.type}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 rounded-lg border border-border bg-secondary/50 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs uppercase">
                      {snapshot.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(snapshot.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-chart-3" />
                    <span className="font-mono text-xs text-muted-foreground">
                      {(snapshot.metadata.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {snapshot.metadata.detectedObjects.map((obj) => (
                    <Badge key={obj} variant="outline" className="text-xs">
                      {obj.replace("_", " ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
