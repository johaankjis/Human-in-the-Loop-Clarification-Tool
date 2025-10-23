"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ScenarioList } from "@/components/scenario-list"
import { StatsOverview } from "@/components/stats-overview"
import { MapPanel } from "@/components/map-panel"
import { TelemetryPanel } from "@/components/telemetry-panel"
import { SensorSnapshotsPanel } from "@/components/sensor-snapshots-panel"
import { AnomalyInsightsPanel } from "@/components/anomaly-insights-panel"
import { ClarificationActions } from "@/components/clarification-actions"
import { ResolutionHistory } from "@/components/resolution-history"
import type { Scenario } from "@/lib/types"
import {
  mockScenarios,
  mockVehicles,
  mockTelemetryData,
  mockSensorSnapshots,
  mockAnomalyInsights,
} from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(mockScenarios[0])
  const { toast } = useToast()

  const vehicle = mockVehicles.find((v) => v.id === selectedScenario.vehicleId)
  const telemetryData = mockTelemetryData[selectedScenario.vehicleId] || []
  const sensorSnapshots = mockSensorSnapshots.filter((s) => s.vehicleId === selectedScenario.vehicleId)
  const anomalyInsights = mockAnomalyInsights.filter((i) => i.scenarioId === selectedScenario.id)

  const handleResolve = (resolution: string, notes: string) => {
    toast({
      title: "Scenario Resolved",
      description: `Resolution "${resolution}" submitted successfully. Anomaly detection models updated.`,
    })
  }

  if (!vehicle) return null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-6">
        <div className="mx-auto max-w-[1800px] space-y-6">
          <StatsOverview />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column: Scenario List */}
            <div className="space-y-6 lg:col-span-1">
              <ScenarioList selectedScenarioId={selectedScenario.id} onSelectScenario={setSelectedScenario} />
              <ResolutionHistory />
            </div>

            {/* Right Column: Context Panels and Actions */}
            <div className="space-y-6 lg:col-span-2">
              <ClarificationActions scenario={selectedScenario} onResolve={handleResolve} />

              <AnomalyInsightsPanel insights={anomalyInsights} />

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <MapPanel vehicle={vehicle} />
                <TelemetryPanel data={telemetryData} vehicleId={vehicle.id} />
              </div>

              <SensorSnapshotsPanel snapshots={sensorSnapshots} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
