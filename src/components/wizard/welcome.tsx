'use client'

import React from 'react'
import { BarChart3, Shield, PieChart, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

export function Welcome() {
  const { nextStep, setIntroSeen } = usePortfolioWizardStore()

  const handleStart = () => {
    setIntroSeen(true)
    nextStep()
  }

  return (
    <main className="overflow-hidden h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-5">
          <h1 
            className="text-4xl md:text-5xl mb-2 text-zinc-900 dark:text-white font-semibold" 
            style={{ fontFamily: 'lynstonebold, sans-serif' }}
          >
            Bienvenido al Creador de Portfolios
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-200 max-w-3xl mx-auto">
            Una herramienta intuitiva para crear y gestionar tu portfolio de inversiones de manera profesional y eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="rounded-lg border p-4 bg-white border-zinc-300 dark:bg-black/40 dark:backdrop-blur-sm dark:border-transparent"
            >
              <div className="mb-2">
                <feature.icon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-base font-semibold mb-1 text-zinc-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white text-center">
            Cómo funciona
          </h3>
          <div 
            className="rounded-lg border p-4 max-w-3xl mx-auto bg-white border-zinc-300 dark:bg-black/40 dark:backdrop-blur-sm dark:border-transparent"
          >
            <ol className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white font-semibold flex-shrink-0 text-xs">1</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-200">Completa un breve cuestionario de perfil de riesgo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white font-semibold flex-shrink-0 text-xs">2</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-200">Selecciona las empresas que te interesan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white font-semibold flex-shrink-0 text-xs">3</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-200">Establece los porcentajes de inversión</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white font-semibold flex-shrink-0 text-xs">4</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-200">Revisa la diversificación y análisis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white font-semibold flex-shrink-0 text-xs">5</span>
                <span className="text-sm text-zinc-600 dark:text-zinc-200">Obtén tu portfolio personalizado</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Button 
            onClick={handleStart}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2 font-medium"
          >
            Comenzar ahora
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  )
} 