"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, CheckCircle2, Clock, User } from "lucide-react"

interface ResolutionEntry {
  id: string
  scenarioTitle: string
  resolution: string
  operator: string
  timestamp: Date
  notes: string
}

const mockHistory: ResolutionEntry[] = [
  {
    id: "RES-001",
    scenarioTitle: "Unexpected Route Deviation",
    resolution: "Legitimate Action",
    operator: "J. Martinez",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    notes: "Driver confirmed road closure, took alternate route per dispatch guidance.",
  },
  {
    id: "RES-002",
    scenarioTitle: "Low Fuel Alert",
    resolution: "Requires Attention",
    operator: "S. Chen",
    timestamp: new Date(Date.now() - 120 * 60 * 1000),
    notes: "Escalated to dispatch. Vehicle directed to nearest fuel station.",
  },
  {
    id: "RES-003",
    scenarioTitle: "Speed Anomaly",
    resolution: "False Positive",
    operator: "J. Martinez",
    timestamp: new Date(Date.now() - 180 * 60 * 1000),
    notes: "GPS calibration issue. Telemetry shows normal speed range.",
  },
]

export function ResolutionHistory() {
  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const getResolutionColor = (resolution: string) => {
    switch (resolution) {
      case "Legitimate Action":
        return "bg-chart-3 text-white"
      case "Requires Attention":
        return "bg-chart-4 text-white"
      case "False Positive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-secondary p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Recent Resolutions</h3>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            Last 24h
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {mockHistory.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-border bg-secondary/30 p-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-chart-3" />
                      <p className="text-sm font-semibold text-foreground">{entry.scenarioTitle}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{entry.notes}</p>
                  </div>
                  <Badge className={getResolutionColor(entry.resolution)} variant="secondary">
                    {entry.resolution}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{entry.operator}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(entry.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
