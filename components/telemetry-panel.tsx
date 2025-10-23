"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Gauge, Droplet, Thermometer, Battery, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TelemetryData } from "@/lib/types"

interface TelemetryPanelProps {
  data: TelemetryData[]
  vehicleId: string
}

export function TelemetryPanel({ data, vehicleId }: TelemetryPanelProps) {
  const latestData = data[data.length - 1]

  const chartData = data.slice(-20).map((d, i) => ({
    time: i,
    speed: d.speed,
    temp: d.engineTemp,
  }))

  const metrics = [
    {
      label: "Speed",
      value: latestData.speed.toFixed(1),
      unit: "mph",
      icon: Gauge,
      color: "text-chart-1",
    },
    {
      label: "Fuel",
      value: latestData.fuelLevel.toFixed(0),
      unit: "%",
      icon: Droplet,
      color: "text-chart-2",
    },
    {
      label: "Engine Temp",
      value: latestData.engineTemp.toFixed(0),
      unit: "°F",
      icon: Thermometer,
      color: "text-chart-5",
    },
    {
      label: "Battery",
      value: latestData.batteryVoltage.toFixed(1),
      unit: "V",
      icon: Battery,
      color: "text-chart-3",
    },
  ]

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-secondary p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Live Telemetry</h3>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {vehicleId}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-border bg-secondary/50 p-3">
              <div className="flex items-center gap-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <p className="font-mono text-xl font-bold text-foreground">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.unit}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Speed & Temperature Trends
            </h4>
          </div>

          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.02 240)" />
                <XAxis dataKey="time" stroke="oklch(0.65 0.01 240)" tick={{ fontSize: 10 }} />
                <YAxis stroke="oklch(0.65 0.01 240)" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.12 0.015 240)",
                    border: "1px solid oklch(0.22 0.02 240)",
                    borderRadius: "0.5rem",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="speed" stroke="oklch(0.65 0.19 240)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="temp" stroke="oklch(0.55 0.22 25)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  )
}
