'use client';

import { usePortfolioWizardStore } from '@/store/portfolio-wizard-store';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Definición de los pasos del wizard
const steps = [
  { id: 0, title: 'Datos Básicos' },
  { id: 1, title: 'Evaluación de Riesgo' },
  { id: 2, title: 'Selección de Empresas' },
  { id: 3, title: 'Asignación' },
  { id: 4, title: 'Resumen' }
];

export const WizardProgress = () => {
  const { currentStep, maxStepVisited, goToStep } = usePortfolioWizardStore();

  // Ocultar la barra de progreso en la pantalla inicial
  if (currentStep === -1) {
    return null;
  }

  // Función para navegar a un paso previo
  const handleStepClick = (stepId: number) => {
    // Solo permitir clicks en pasos ya visitados
    if (stepId <= maxStepVisited) {
      goToStep(stepId);
    }
  };

  return (
    <nav aria-label="Progreso del wizard">
      <ol className="flex items-center w-full">
        {steps.map((step, i) => (
          <li 
            key={step.id} 
            className={cn(
              "flex items-center",
              i < steps.length - 1 ? "flex-1" : ""
            )}
          >
            <button
              type="button"
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full shrink-0 transition-colors",
                currentStep === step.id ? "bg-primary text-primary-foreground" : "",
                currentStep !== step.id && step.id <= maxStepVisited ? "bg-primary/20" : "",
                currentStep !== step.id && step.id > maxStepVisited ? "bg-muted" : "",
                step.id <= maxStepVisited ? "hover:bg-primary/90 hover:text-primary-foreground cursor-pointer" : "cursor-default"
              )}
              onClick={() => handleStepClick(step.id)}
              disabled={step.id > maxStepVisited}
              aria-current={currentStep === step.id ? "step" : undefined}
            >
              {step.id < currentStep || (step.id <= maxStepVisited && step.id !== currentStep) ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span>{step.id + 1}</span>
              )}
              <span className="sr-only">{step.title}</span>
            </button>
            
            <div className={cn(
              "flex-1 ml-4",
              i < steps.length - 1 ? "flex items-center" : ""
            )}>
              <span className={cn(
                "text-sm font-medium",
                currentStep === step.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.title}
              </span>
              
              {i < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className={cn(
                    "h-px w-full bg-muted",
                    (step.id < currentStep || step.id === currentStep) && maxStepVisited > step.id ? "bg-primary" : ""
                  )} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}; 