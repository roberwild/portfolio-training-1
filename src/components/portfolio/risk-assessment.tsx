'use client';

import { useEffect } from 'react';
import { usePortfolioWizardStore, RiskProfile } from '@/store/portfolio-wizard-store';
import { riskAssessmentQuestions, riskProfileDescriptions } from '@/constants/portfolio-wizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle, ShieldAlert, Shield, TrendingUp, Zap } from 'lucide-react';

export const RiskAssessment = () => {
  const { 
    riskAnswers, 
    riskProfile, 
    setRiskAnswer, 
    calculateRiskProfile 
  } = usePortfolioWizardStore();

  // Calcular el perfil de riesgo cuando cambian las respuestas
  useEffect(() => {
    calculateRiskProfile();
  }, [riskAnswers, calculateRiskProfile]);

  // Iconos para cada perfil de riesgo
  const profileIcons: Record<RiskProfile, React.ReactNode> = {
    conservador: <ShieldAlert className="h-10 w-10" />,
    moderado: <Shield className="h-10 w-10" />,
    equilibrado: <AlertCircle className="h-10 w-10" />,
    crecimiento: <TrendingUp className="h-10 w-10" />,
    agresivo: <Zap className="h-10 w-10" />
  };

  // Colores para cada perfil de riesgo
  const profileColors: Record<RiskProfile, string> = {
    conservador: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300',
    moderado: 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300',
    equilibrado: 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300',
    crecimiento: 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300',
    agresivo: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300'
  };

  // Manejar el cambio en las opciones de respuesta
  const handleAnswerChange = (questionId: string, value: string) => {
    setRiskAnswer(questionId, parseInt(value, 10));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Evaluación de perfil de riesgo</h1>
      <p className="text-muted-foreground">
        Responde a las siguientes preguntas para determinar tu perfil de riesgo como inversor.
      </p>

      {/* Tarjeta informativa */}
      <Card>
        <CardHeader>
          <CardTitle>¿Por qué es importante conocer tu perfil?</CardTitle>
          <CardDescription>
            Tu perfil de riesgo nos ayudará a recomendar una distribución de activos adecuada a tus objetivos y tolerancia al riesgo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Construir un portfolio alineado con tu perfil de riesgo aumenta las probabilidades de que puedas mantener tu estrategia a largo plazo sin realizar cambios impulsivos basados en emociones durante periodos de volatilidad.
          </p>
        </CardContent>
      </Card>

      {/* Cuestionario */}
      <div className="space-y-6">
        {riskAssessmentQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={riskAnswers[question.id]?.toString() || ""}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                <div className="space-y-3">
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                      <Label htmlFor={`${question.id}-${option.value}`} className="cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resultado del perfil */}
      {riskProfile && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tu perfil de riesgo: {riskProfile.charAt(0).toUpperCase() + riskProfile.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-6 rounded-lg border ${profileColors[riskProfile]} flex gap-4 items-start`}>
              <div className="text-current shrink-0">
                {profileIcons[riskProfile]}
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2 capitalize">Perfil {riskProfile}</h3>
                <p className="text-current">
                  {riskProfileDescriptions[riskProfile]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 