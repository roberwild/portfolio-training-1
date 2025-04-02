'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePortfolioWizardStore, CompanyAllocation } from '@/store/portfolio-wizard-store';
import { mockCompanies } from '@/constants/portfolio-wizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Lock, Unlock, RefreshCw, AlertCircle } from 'lucide-react';

// Función para recuperar información completa de la empresa por ID
const getCompanyById = (id: string) => {
  return mockCompanies.find(company => company.id === id) || null;
};

// Colores para los gráficos
const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FF6B6B', '#6C8EAD', '#B68CB8', '#FFC857',
  '#97A7B3', '#F44336', '#E91E63', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688'
];

export const PortfolioAllocation = () => {
  const { 
    selectedCompanies,
    investmentAmount,
    allocations,
    setAllocation,
    distributeEqually,
    rebalancePortfolio
  } = usePortfolioWizardStore();
  
  // Estado local para rastrear si mostramos la tabla en porcentaje o en acciones
  const [viewMode, setViewMode] = useState<'percentage' | 'shares'>('percentage');
  
  // Ejecutar distribución equitativa si no hay asignaciones previas
  useEffect(() => {
    const hasAllocations = selectedCompanies.some(id => allocations[id]?.percentage > 0);
    if (!hasAllocations && selectedCompanies.length > 0) {
      distributeEqually();
    }
  }, [selectedCompanies, allocations, distributeEqually]);
  
  // Calcular el total asignado y lo que queda por asignar
  const { totalAllocated, totalAmount, remainingAmount, remainingPercentage } = useMemo(() => {
    const total = Object.values(allocations).reduce((sum, allocation) => sum + allocation.percentage, 0);
    const totalAmount = Object.values(allocations).reduce((sum, allocation) => sum + allocation.amount, 0);
    return {
      totalAllocated: total,
      totalAmount,
      remainingAmount: investmentAmount - totalAmount,
      remainingPercentage: 100 - total
    };
  }, [allocations, investmentAmount]);
  
  // Preparar datos para los gráficos
  const pieData = useMemo(() => {
    return selectedCompanies.map(id => {
      const company = getCompanyById(id);
      return {
        name: company?.name || 'Desconocido',
        value: allocations[id]?.percentage || 0,
        sector: company?.sector || 'Desconocido',
        region: company?.region || 'Desconocido',
        id
      };
    });
  }, [selectedCompanies, allocations]);
  
  // Datos para el gráfico por sector
  const sectorData = useMemo(() => {
    const sectorMap = new Map<string, number>();
    
    selectedCompanies.forEach(id => {
      const company = getCompanyById(id);
      if (company) {
        const sectorName = company.sector;
        const allocation = allocations[id]?.percentage || 0;
        
        const current = sectorMap.get(sectorName) || 0;
        sectorMap.set(sectorName, current + allocation);
      }
    });
    
    return Array.from(sectorMap.entries()).map(([name, value]) => ({
      name,
      value
    }));
  }, [selectedCompanies, allocations]);
  
  // Datos para el gráfico por región
  const regionData = useMemo(() => {
    const regionMap = new Map<string, number>();
    
    selectedCompanies.forEach(id => {
      const company = getCompanyById(id);
      if (company) {
        const regionName = company.region;
        const allocation = allocations[id]?.percentage || 0;
        
        const current = regionMap.get(regionName) || 0;
        regionMap.set(regionName, current + allocation);
      }
    });
    
    return Array.from(regionMap.entries()).map(([name, value]) => ({
      name,
      value
    }));
  }, [selectedCompanies, allocations]);
  
  // Formatear valores monetarios
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Función para manejar cambios en el slider de porcentaje
  const handlePercentageChange = (id: string, percentage: number) => {
    const company = getCompanyById(id);
    if (!company) return;
    
    // Calcular el monto basado en el porcentaje
    const amount = (percentage / 100) * investmentAmount;
    
    // Calcular el número de acciones que se pueden comprar
    const shares = Math.floor(amount / company.price);
    
    // Actualizar la asignación
    setAllocation(id, {
      percentage,
      amount,
      shares
    });
  };
  
  // Función para manejar cambios en el input de acciones
  const handleSharesChange = (id: string, sharesStr: string) => {
    const shares = parseInt(sharesStr, 10);
    if (isNaN(shares) || shares < 0) return;
    
    const company = getCompanyById(id);
    if (!company) return;
    
    // Calcular el monto basado en las acciones
    const amount = shares * company.price;
    
    // Calcular el porcentaje basado en el monto
    const percentage = (amount / investmentAmount) * 100;
    
    // Actualizar la asignación
    setAllocation(id, {
      shares,
      amount,
      percentage
    });
  };
  
  // Función para bloquear/desbloquear una asignación
  const toggleLock = (id: string) => {
    const isLocked = allocations[id]?.isLocked || false;
    setAllocation(id, { isLocked: !isLocked });
  };
  
  // Formatear porcentaje
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Asignación de Portfolio</h1>
      <p className="text-muted-foreground">
        Distribuye tu inversión entre las empresas seleccionadas.
      </p>
      
      {/* Resumen de asignación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inversión Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(investmentAmount)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Asignado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalAmount)}
              <span className="text-sm ml-2 font-normal text-muted-foreground">
                {totalAllocated.toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pendiente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${
              Math.abs(remainingAmount) < 0.01 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {formatCurrency(remainingAmount)}
              <span className="text-sm ml-2 font-normal text-muted-foreground">
                {remainingPercentage.toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Visualización del portfolio */}
      <Card>
        <CardHeader>
          <CardTitle>Visualización del Portfolio</CardTitle>
          <CardDescription>
            Explora la distribución de tu inversión desde diferentes perspectivas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="companies">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="companies">Por Empresa</TabsTrigger>
              <TabsTrigger value="sectors">Por Sector</TabsTrigger>
              <TabsTrigger value="regions">Por Región</TabsTrigger>
            </TabsList>
            
            <TabsContent value="companies" className="pt-4">
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
            </TabsContent>
            
            <TabsContent value="sectors" className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sectorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="regions" className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Tabla de asignación */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Asignación de Inversión</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="view-mode" className="text-sm">Mostrar acciones</Label>
                <Switch
                  id="view-mode"
                  checked={viewMode === 'shares'}
                  onCheckedChange={(checked) => setViewMode(checked ? 'shares' : 'percentage')}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={distributeEqually}
                className="h-8 text-sm flex items-center gap-1"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Distribución Equitativa
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={rebalancePortfolio}
                className="h-8 text-sm"
              >
                Rebalancear
              </Button>
            </div>
          </div>
          <CardDescription>
            Ajusta los porcentajes o el número de acciones para cada empresa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead className="w-[50px]">Bloquear</TableHead>
                  <TableHead className="w-[200px] text-right">
                    {viewMode === 'percentage' ? 'Porcentaje' : 'Acciones'}
                  </TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="text-right">Precio unitario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No hay empresas seleccionadas.
                    </TableCell>
                  </TableRow>
                ) : (
                  selectedCompanies.map((id) => {
                    const company = getCompanyById(id);
                    const allocation = allocations[id] || {
                      companyId: id,
                      percentage: 0,
                      shares: 0,
                      amount: 0,
                      isLocked: false
                    };
                    
                    if (!company) return null;
                    
                    return (
                      <TableRow key={id}>
                        <TableCell>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-xs text-muted-foreground">{company.ticker}</div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleLock(id)}
                            className={`w-8 h-8 ${allocation.isLocked ? 'text-amber-500' : 'text-muted-foreground'}`}
                          >
                            {allocation.isLocked ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <Unlock className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {allocation.isLocked ? 'Desbloquear' : 'Bloquear'}
                            </span>
                          </Button>
                        </TableCell>
                        <TableCell>
                          {viewMode === 'percentage' ? (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>0%</span>
                                <span>{allocation.percentage.toFixed(1)}%</span>
                                <span>100%</span>
                              </div>
                              <Slider
                                value={[allocation.percentage]}
                                min={0}
                                max={100}
                                step={0.1}
                                onValueChange={(values) => handlePercentageChange(id, values[0])}
                                disabled={allocation.isLocked}
                              />
                            </div>
                          ) : (
                            <div className="flex justify-end">
                              <Input
                                type="number"
                                min={0}
                                value={allocation.shares}
                                onChange={(e) => handleSharesChange(id, e.target.value)}
                                className="w-24 text-right"
                                disabled={allocation.isLocked}
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(allocation.amount)}
                          <div className="text-xs text-muted-foreground">
                            {allocation.percentage.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(company.price)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Alerta sobre asignación incompleta */}
      {Math.abs(totalAllocated - 100) > 0.1 && (
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-lg flex gap-3">
          <div className="text-amber-600 dark:text-amber-400 mt-1">
            <AlertCircle size={20} />
          </div>
          <div>
            <h3 className="font-medium text-amber-900 dark:text-amber-200">
              Asignación incompleta
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              La asignación actual es del {totalAllocated.toFixed(1)}%. Para continuar, asegúrate de que el total sea 100%.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 