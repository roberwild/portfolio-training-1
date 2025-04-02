'use client';

import { useMemo } from 'react';
import { usePortfolioWizardStore } from '@/store/portfolio-wizard-store';
import { mockCompanies, riskProfileDescriptions } from '@/constants/portfolio-wizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle, AlertCircle, Shield, TrendingUp, Zap, ShieldAlert } from 'lucide-react';

// Colores para el gráfico
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FF6B6B', '#6C8EAD', '#B68CB8', '#FFC857',
  '#97A7B3', '#F44336', '#E91E63', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688'
];

// Función para recuperar información completa de la empresa por ID
const getCompanyById = (id: string) => {
  return mockCompanies.find(company => company.id === id) || null;
};

export const PortfolioSummary = () => {
  const { 
    portfolioName, 
    investmentAmount, 
    riskProfile, 
    selectedCompanies, 
    allocations 
  } = usePortfolioWizardStore();
  
  // Preparar datos para el gráfico
  const pieData = useMemo(() => {
    return selectedCompanies.map(id => {
      const company = getCompanyById(id);
      return {
        name: company?.name || 'Desconocido',
        value: allocations[id]?.percentage || 0,
      };
    });
  }, [selectedCompanies, allocations]);
  
  // Verificar si el portfolio está completamente asignado
  const isFullyAllocated = useMemo(() => {
    const totalPercentage = Object.values(allocations)
      .reduce((sum, allocation) => sum + allocation.percentage, 0);
    return Math.abs(totalPercentage - 100) < 0.1;
  }, [allocations]);
  
  // Formatear valores monetarios
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Generar resumen por sectores
  const sectorSummary = useMemo(() => {
    const sectorMap = new Map<string, { percentage: number; amount: number }>();
    
    selectedCompanies.forEach(id => {
      const company = getCompanyById(id);
      if (company) {
        const allocation = allocations[id];
        if (allocation) {
          const sectorName = company.sector;
          const currentSector = sectorMap.get(sectorName) || { percentage: 0, amount: 0 };
          
          sectorMap.set(sectorName, {
            percentage: currentSector.percentage + allocation.percentage,
            amount: currentSector.amount + allocation.amount
          });
        }
      }
    });
    
    return Array.from(sectorMap.entries())
      .sort((a, b) => b[1].percentage - a[1].percentage)
      .map(([name, data]) => ({
        name,
        percentage: data.percentage,
        amount: data.amount
      }));
  }, [selectedCompanies, allocations]);
  
  // Icono para el perfil de riesgo
  const getRiskProfileIcon = () => {
    if (!riskProfile) return null;
    
    switch (riskProfile) {
      case 'conservador':
        return <ShieldAlert className="h-8 w-8 text-blue-500" />;
      case 'moderado':
        return <Shield className="h-8 w-8 text-green-500" />;
      case 'equilibrado':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      case 'crecimiento':
        return <TrendingUp className="h-8 w-8 text-orange-500" />;
      case 'agresivo':
        return <Zap className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };
  
  // Clase CSS para el perfil de riesgo
  const getRiskProfileClass = () => {
    if (!riskProfile) return '';
    
    switch (riskProfile) {
      case 'conservador':
        return 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300';
      case 'moderado':
        return 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300';
      case 'equilibrado':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-300';
      case 'crecimiento':
        return 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-300';
      case 'agresivo':
        return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Resumen del Portfolio</h1>
      <p className="text-muted-foreground">
        Revisa los detalles de tu portfolio antes de finalizar.
      </p>
      
      {/* Información básica */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Nombre del Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-medium">
              {portfolioName || 'Sin nombre'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inversión Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(investmentAmount)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Empresas Incluidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedCompanies.length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Perfil de riesgo */}
      {riskProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Perfil de Riesgo</CardTitle>
            <CardDescription>
              Basado en tu evaluación de riesgo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-lg border flex gap-4 items-start ${getRiskProfileClass()}`}>
              <div className="text-current shrink-0">
                {getRiskProfileIcon()}
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2 capitalize">
                  Perfil {riskProfile}
                </h3>
                <p className="text-current">
                  {riskProfileDescriptions[riskProfile]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Visualización del portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico circular */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Distribución del Portfolio</CardTitle>
            <CardDescription>
              Visualización de la asignación por empresa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Distribución por sector */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Resumen por Sector</CardTitle>
            <CardDescription>
              Distribución de la inversión por sectores industriales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sector</TableHead>
                  <TableHead className="text-right">Porcentaje</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectorSummary.map((sector) => (
                  <TableRow key={sector.name}>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {sector.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {sector.percentage.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(sector.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Detalle de empresas */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle de la Inversión</CardTitle>
          <CardDescription>
            Resumen detallado de la asignación por empresa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead className="text-right">Porcentaje</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCompanies.map((id) => {
                  const company = getCompanyById(id);
                  const allocation = allocations[id];
                  
                  if (!company || !allocation) return null;
                  
                  return (
                    <TableRow key={id}>
                      <TableCell>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-xs text-muted-foreground">{company.ticker}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {company.sector}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {allocation.percentage.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {allocation.shares}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(allocation.amount)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Estado de asignación */}
      <div className={`p-4 rounded-lg border flex gap-4 items-start ${
        isFullyAllocated 
          ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300' 
          : 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300'
      }`}>
        <div className="text-current mt-1">
          {isFullyAllocated 
            ? <CheckCircle className="h-6 w-6" /> 
            : <AlertCircle className="h-6 w-6" />
          }
        </div>
        <div>
          <h3 className="font-medium text-base mb-1">
            {isFullyAllocated 
              ? 'Portfolio completamente asignado' 
              : 'Portfolio parcialmente asignado'
            }
          </h3>
          <p className="text-current text-sm">
            {isFullyAllocated 
              ? 'Has asignado el 100% de tu inversión. Tu portfolio está listo para ser finalizado.' 
              : 'La asignación actual no suma 100%. Vuelve al paso anterior para completar la asignación antes de finalizar.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}; 