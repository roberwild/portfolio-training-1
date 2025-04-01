'use client'

import React from 'react'
import { BarChart3, Shield, PieChart, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { usePortfolioWizardStore } from '@/lib/store/portfolio-wizard'

const features = [
  {
    title: 'Personalización Total',
    description: 'Adapta tu portfolio a tus objetivos específicos de inversión',
    icon: BarChart3,
  },
  {
    title: 'Gestión de Riesgos',
    description: 'Evalúa y ajusta el nivel de riesgo según tu perfil',
    icon: Shield,
  },
  {
    title: 'Diversificación Inteligente',
    description: 'Distribuye tus inversiones de manera óptima',
    icon: PieChart,
  },
  {
    title: 'Análisis Detallado',
    description: 'Visualiza y comprende la composición de tu portfolio',
    icon: TrendingUp,
  },
]

const steps = [
  'Completa un breve cuestionario de perfil de riesgo',
  'Selecciona las empresas que te interesan',
  'Establece los porcentajes de inversión',
  'Revisa la diversificación y análisis',
  'Obtén tu portfolio personalizado',
]

export function Welcome() {
  const { nextStep, setIntroSeen } = usePortfolioWizardStore()

  const handleStart = () => {
    setIntroSeen(true)
    nextStep()
  }

  return (
    <main className="overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 text-white">
            Bienvenido al Creador de Portfolios
          </h1>
          <p className="text-lg text-white/90">
            Una herramienta intuitiva para crear y gestionar tu portfolio de inversiones de manera profesional y eficiente.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-black/30 border-white/10 backdrop-blur">
              <CardContent className="p-4">
                <feature.icon className="w-5 h-5 text-primary mb-2" />
                <h3 className="text-white text-base font-medium mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-sm leading-snug">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-2xl mx-auto w-full mb-8">
          <h2 className="text-xl font-bold text-white text-center mb-4">
            Cómo funciona
          </h2>
          <div className="bg-black/30 backdrop-blur rounded-lg border border-white/10 p-4">
            <ol className="space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="flex items-center gap-3 text-white">
                  <span className="flex-none flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="text-center mt-4">
          <Button
            onClick={handleStart}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md text-base font-medium inline-flex items-center gap-2"
          >
            Comenzar ahora
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </main>
  )
} 