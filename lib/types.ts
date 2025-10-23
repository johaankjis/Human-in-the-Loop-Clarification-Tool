export interface Vehicle {
  id: string
  name: string
  status: "active" | "idle" | "maintenance" | "alert"
  location: {
    lat: number
    lng: number
    address: string
  }
  lastUpdate: Date
}

export interface Scenario {
  id: string
  vehicleId: string
  type: "ambiguous" | "resolved" | "pending"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: Date
  anomalyScore: number
  requiresClarification: boolean
}

export interface TelemetryData {
  timestamp: Date
  speed: number
  fuelLevel: number
  engineTemp: number
  batteryVoltage: number
  odometer: number
}

export interface SensorSnapshot {
  id: string
  vehicleId: string
  timestamp: Date
  type: "camera" | "lidar" | "radar"
  imageUrl: string
  metadata: {
    confidence: number
    detectedObjects: string[]
  }
}

export interface AnomalyInsight {
  id: string
  scenarioId: string
  type: "speed" | "fuel" | "temperature" | "location" | "behavior"
  severity: "low" | "medium" | "high"
  description: string
  recommendation: string
  confidence: number
}
