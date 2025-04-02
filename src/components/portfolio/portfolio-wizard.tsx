'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePortfolioWizardStore } from '@/store/portfolio-wizard-store';
import { WizardProgress } from './wizard-progress';
import { PortfolioBasics } from './portfolio-basics';
import { RiskAssessment } from './risk-assessment';
import { CompanySelection } from './company-selection';
import { PortfolioAllocation } from './portfolio-allocation';
import { PortfolioSummary } from './portfolio-summary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, RefreshCw, Check } from 'lucide-react';

export const PortfolioWizard = () => {
  const router = useRouter();
  const { 
    currentStep, 
    maxStepVisited, 
    goToStep, 
    portfolioName,
    investmentAmount,
    riskProfile,
    selectedCompanies,
    allocations,
    resetWizard
  } = usePortfolioWizardStore();

  // Verificar si el paso actual está permitido (no puede avanzar más allá del maxStepVisited + 1)
  // NOTA: Este useEffect DEBE estar antes de cualquier return para cumplir con las reglas de hooks
  useEffect(() => {
    if (currentStep > maxStepVisited + 1) {
      goToStep(maxStepVisited + 1);
    }
  }, [currentStep, maxStepVisited, goToStep]);

  // Si estamos en la pantalla de bienvenida, solo mostramos esa
  if (currentStep === -1) {
    return null;
  }

  // Determinar si se puede avanzar al siguiente paso
  const canAdvance = () => {
    switch (currentStep) {
      case 0: // Portfolio Basics
        return portfolioName.trim() !== '' && investmentAmount > 0;
      case 1: // Risk Assessment
        return riskProfile !== null;
      case 2: // Company Selection
        return selectedCompanies.length > 0;
      case 3: // Portfolio Allocation
        // Verificar que todos los porcentajes sumen 100%
        const totalPercentage = Object.values(allocations)
          .reduce((sum, allocation) => sum + allocation.percentage, 0);
        return Math.abs(totalPercentage - 100) < 0.01; // Permitir un pequeño margen de error
      default:
        return true;
    }
  };

  // Manejar navegación al paso anterior
  const handlePrevious = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  // Manejar navegación al paso siguiente
  const handleNext = () => {
    if (canAdvance() && currentStep < 4) {
      goToStep(currentStep + 1);
    }
  };

  // Manejar finalización del proceso
  const handleFinish = () => {
    // Aquí se podría guardar el portfolio en una base de datos
    // Y luego redirigir a la página de éxito
    resetWizard();
    router.push('/portfolio/success');
  };

  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PortfolioBasics />;
      case 1:
        return <RiskAssessment />;
      case 2:
        return <CompanySelection />;
      case 3:
        return <PortfolioAllocation />;
      case 4:
        return <PortfolioSummary />;
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  // Determinar si estamos en el último paso
  const isLastStep = currentStep === 4;

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4 py-8">
      {/* Barra de progreso */}
      <div className="mb-8">
        <WizardProgress />
      </div>
      
      {/* Contenido del paso actual */}
      <div className="flex-1 mb-8">
        {renderStep()}
      </div>
      
      {/* Botones de navegación */}
      <div className="flex justify-between mt-auto">
        {currentStep > 0 ? (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>
        ) : (
          <div /> /* Espacio vacío para mantener la estructura flex */
        )}
        
        {isLastStep ? (
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={resetWizard}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Comenzar Nuevo
            </Button>
            <Button
              onClick={handleFinish}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4" />
              Finalizar
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canAdvance()}
            className="flex items-center gap-2"
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}; 