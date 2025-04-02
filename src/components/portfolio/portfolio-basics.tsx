'use client';

import { useState, useEffect } from 'react';
import { usePortfolioWizardStore } from '@/store/portfolio-wizard-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Info } from 'lucide-react';

export const PortfolioBasics = () => {
  const { portfolioName, investmentAmount, setPortfolioBasics } = usePortfolioWizardStore();
  
  // Estado local para gestionar los inputs
  const [name, setName] = useState(portfolioName);
  const [amount, setAmount] = useState(investmentAmount);
  const [inputAmount, setInputAmount] = useState(investmentAmount.toString());
  
  // Formatear el valor como moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Actualizar el valor del input cuando cambia el slider
  const handleSliderChange = (value: number[]) => {
    const newAmount = value[0];
    setAmount(newAmount);
    setInputAmount(newAmount.toString());
    setPortfolioBasics(name, newAmount);
  };
  
  // Actualizar el valor del slider cuando cambia el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setInputAmount(rawValue);
    
    const numValue = parseInt(rawValue, 10);
    if (!isNaN(numValue)) {
      // Limitar entre min y max
      const constrainedValue = Math.min(Math.max(numValue, 1000), 1000000);
      setAmount(constrainedValue);
      setPortfolioBasics(name, constrainedValue);
    }
  };
  
  // Aplicar restricciones cuando el input pierde el foco
  const handleInputBlur = () => {
    const numValue = parseInt(inputAmount, 10);
    if (isNaN(numValue) || numValue < 1000) {
      setAmount(1000);
      setInputAmount('1000');
      setPortfolioBasics(name, 1000);
    } else if (numValue > 1000000) {
      setAmount(1000000);
      setInputAmount('1000000');
      setPortfolioBasics(name, 1000000);
    }
  };
  
  // Actualizar el nombre del portfolio
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setPortfolioBasics(newName, amount);
  };
  
  // Sincronizar el estado local con el store cuando el componente se monta
  useEffect(() => {
    setName(portfolioName);
    setAmount(investmentAmount);
    setInputAmount(investmentAmount.toString());
  }, [portfolioName, investmentAmount]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Información básica del portfolio</h1>
      <p className="text-muted-foreground">
        Empecemos definiendo los datos fundamentales de tu nuevo portfolio de inversión.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Nombre del Portfolio</CardTitle>
          <CardDescription>
            Elige un nombre descriptivo para identificar fácilmente este portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="portfolioName">Nombre</Label>
              <Input
                id="portfolioName"
                placeholder="Ej: Mi Portfolio Global"
                value={name}
                onChange={handleNameChange}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Monto de Inversión</CardTitle>
          <CardDescription>
            Define el capital total que destinarás a este portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="investmentAmount">Cantidad a invertir</Label>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(amount)}
                </span>
              </div>
              
              <div className="flex flex-col space-y-4">
                <Slider
                  id="investmentSlider"
                  min={1000}
                  max={1000000}
                  step={1000}
                  value={[amount]}
                  onValueChange={handleSliderChange}
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>€1.000</span>
                  <span>€1.000.000</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Label htmlFor="investmentAmountInput">Introduzca un valor exacto</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">€</span>
                  <Input
                    id="investmentAmountInput"
                    type="text"
                    value={inputAmount}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg flex gap-3">
        <div className="text-blue-600 dark:text-blue-400 mt-1">
          <Info size={20} />
        </div>
        <div>
          <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-1">
            ¿Por qué es importante definir bien estos datos?
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            El nombre te ayudará a organizar tus diferentes estrategias. El monto de inversión determinará cómo se distribuirán tus recursos entre las distintas empresas seleccionadas. Podrás ajustar estos valores posteriormente si fuera necesario.
          </p>
        </div>
      </div>
    </div>
  );
}; 