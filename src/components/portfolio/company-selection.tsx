'use client';

import { useState, useMemo, useEffect } from 'react';
import { usePortfolioWizardStore } from '@/store/portfolio-wizard-store';
import { mockCompanies, allSectors, allRegions } from '@/constants/portfolio-wizard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Search, ArrowUpDown, Info, X, Filter, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type SortField = 'name' | 'sector' | 'region' | 'marketCap' | 'price' | 'dividend' | 'volatility';
type SortDirection = 'asc' | 'desc';

export const CompanySelection = () => {
  const { 
    filters,
    excludedSectors,
    selectedCompanies,
    toggleCompanySelection,
    setFilters,
    toggleExcludedSector
  } = usePortfolioWizardStore();
  
  // Estado local para filtros
  const [activeFilters, setActiveFilters] = useState(filters);
  
  // Estado para búsqueda y ordenación
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Formatear valores de capitalización de mercado
  const formatMarketCap = (value: number) => {
    if (value >= 1000000000000) {
      return `${(value / 1000000000000).toFixed(1)}T`;
    } else if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(0)}B`;
    } else {
      return `${(value / 1000000).toFixed(0)}M`;
    }
  };
  
  // Reiniciar todos los filtros
  const resetFilters = () => {
    const defaultFilters = {
      sectors: [],
      regions: [],
      marketCapRange: [0, 1000000000000] as [number, number],
      minDividend: 0,
      maxVolatility: 100,
    };
    setActiveFilters(defaultFilters);
    setFilters(defaultFilters);
  };
  
  // Función para eliminar un filtro específico
  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case 'sector':
        if (value) {
          setActiveFilters(prev => ({
            ...prev,
            sectors: prev.sectors.filter(sector => sector !== value)
          }));
          setFilters({ sectors: activeFilters.sectors.filter(sector => sector !== value) });
        }
        break;
      case 'region':
        if (value) {
          setActiveFilters(prev => ({
            ...prev,
            regions: prev.regions.filter(region => region !== value)
          }));
          setFilters({ regions: activeFilters.regions.filter(region => region !== value) });
        }
        break;
      case 'marketCap':
        setActiveFilters(prev => ({
          ...prev,
          marketCapRange: [0, 1000000000000]
        }));
        setFilters({ marketCapRange: [0, 1000000000000] });
        break;
      case 'dividend':
        setActiveFilters(prev => ({
          ...prev,
          minDividend: 0
        }));
        setFilters({ minDividend: 0 });
        break;
      case 'volatility':
        setActiveFilters(prev => ({
          ...prev,
          maxVolatility: 100
        }));
        setFilters({ maxVolatility: 100 });
        break;
      default:
        break;
    }
  };
  
  // Manejar cambios en sectores
  const handleSectorChange = (sector: string, checked: boolean) => {
    if (checked) {
      const newSectors = [...activeFilters.sectors, sector];
      setActiveFilters(prev => ({ ...prev, sectors: newSectors }));
      setFilters({ sectors: newSectors });
    } else {
      const newSectors = activeFilters.sectors.filter(s => s !== sector);
      setActiveFilters(prev => ({ ...prev, sectors: newSectors }));
      setFilters({ sectors: newSectors });
    }
  };
  
  // Manejar cambios en regiones
  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      const newRegions = [...activeFilters.regions, region];
      setActiveFilters(prev => ({ ...prev, regions: newRegions }));
      setFilters({ regions: newRegions });
    } else {
      const newRegions = activeFilters.regions.filter(r => r !== region);
      setActiveFilters(prev => ({ ...prev, regions: newRegions }));
      setFilters({ regions: newRegions });
    }
  };
  
  // Manejar cambios en capitalización de mercado
  const handleMarketCapChange = (values: number[]) => {
    setActiveFilters(prev => ({ ...prev, marketCapRange: [values[0], values[1]] }));
    setFilters({ marketCapRange: [values[0], values[1]] });
  };
  
  // Manejar cambios en dividendo mínimo
  const handleDividendChange = (values: number[]) => {
    setActiveFilters(prev => ({ ...prev, minDividend: values[0] }));
    setFilters({ minDividend: values[0] });
  };
  
  // Manejar cambios en volatilidad máxima
  const handleVolatilityChange = (values: number[]) => {
    setActiveFilters(prev => ({ ...prev, maxVolatility: values[0] }));
    setFilters({ maxVolatility: values[0] });
  };
  
  // Manejar exclusión de sectores completos
  const handleExcludeSector = (sector: string) => {
    toggleExcludedSector(sector);
  };
  
  // Sincronizar estado local con el store cuando el componente se monta
  useEffect(() => {
    setActiveFilters(filters);
  }, [filters]);
  
  // Calcular número de filtros activos
  const activeFilterCount = 
    activeFilters.sectors.length + 
    activeFilters.regions.length + 
    (activeFilters.marketCapRange[0] > 0 || activeFilters.marketCapRange[1] < 1000000000000 ? 1 : 0) +
    (activeFilters.minDividend > 0 ? 1 : 0) +
    (activeFilters.maxVolatility < 100 ? 1 : 0);
  
  // Función para aplicar filtros a las empresas
  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter(company => {
      // Filtrar por sectores excluidos (prioridad máxima)
      if (excludedSectors.includes(company.sector)) {
        return false;
      }
      
      // Filtrar por sectores seleccionados
      if (filters.sectors.length > 0 && !filters.sectors.includes(company.sector)) {
        return false;
      }
      
      // Filtrar por regiones seleccionadas
      if (filters.regions.length > 0 && !filters.regions.includes(company.region)) {
        return false;
      }
      
      // Filtrar por rango de capitalización de mercado
      if (
        company.marketCap < filters.marketCapRange[0] || 
        company.marketCap > filters.marketCapRange[1]
      ) {
        return false;
      }
      
      // Filtrar por dividendo mínimo
      if (company.dividend < filters.minDividend) {
        return false;
      }
      
      // Filtrar por volatilidad máxima
      if (company.volatility > filters.maxVolatility) {
        return false;
      }
      
      // Filtrar por término de búsqueda
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          company.name.toLowerCase().includes(searchLower) ||
          company.ticker.toLowerCase().includes(searchLower) ||
          company.sector.toLowerCase().includes(searchLower) ||
          company.region.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [filters, excludedSectors, searchQuery]);
  
  // Ordenar las empresas filtradas
  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => {
      let compareResult = 0;
      
      // Ordenar según el campo seleccionado
      switch (sortField) {
        case 'name':
          compareResult = a.name.localeCompare(b.name);
          break;
        case 'sector':
          compareResult = a.sector.localeCompare(b.sector);
          break;
        case 'region':
          compareResult = a.region.localeCompare(b.region);
          break;
        case 'marketCap':
          compareResult = a.marketCap - b.marketCap;
          break;
        case 'price':
          compareResult = a.price - b.price;
          break;
        case 'dividend':
          compareResult = a.dividend - b.dividend;
          break;
        case 'volatility':
          compareResult = a.volatility - b.volatility;
          break;
        default:
          break;
      }
      
      // Invertir el resultado si la dirección es descendente
      return sortDirection === 'desc' ? -compareResult : compareResult;
    });
  }, [filteredCompanies, sortField, sortDirection]);
  
  // Paginación
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCompanies.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCompanies, currentPage]);
  
  // Calcular el total de páginas
  const totalPages = Math.ceil(sortedCompanies.length / itemsPerPage);
  
  // Cambiar página
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  // Manejar cambio de ordenación
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Si es el mismo campo, invertir la dirección
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si es un campo nuevo, establecerlo y usar dirección descendente por defecto
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  // Formatear valores monetarios
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Selección de Empresas</h1>
      <p className="text-muted-foreground">
        Filtra y selecciona hasta 20 empresas para incluir en tu portfolio.
      </p>
      
      {/* Sectores excluidos - Alerta superior */}
      {excludedSectors.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-lg flex gap-3">
          <div className="text-amber-600 dark:text-amber-400 mt-1">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-medium text-amber-900 dark:text-amber-200 mb-1">
              Sectores Excluidos
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
              Has decidido excluir completamente los siguientes sectores de tu portfolio:
            </p>
            <div className="flex flex-wrap gap-2">
              {excludedSectors.map(sector => (
                <Badge key={sector} variant="outline" className="bg-amber-100 dark:bg-amber-900 border-amber-300 dark:border-amber-700">
                  {sector}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Panel superior con estadísticas y búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Empresas Seleccionadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {selectedCompanies.length} <span className="text-sm font-normal text-muted-foreground">de 20</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nombre, ticker, sector o región..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Mensaje de límite alcanzado */}
      {selectedCompanies.length >= 20 && (
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-lg flex gap-3">
          <div className="text-amber-600 dark:text-amber-400 mt-1">
            <AlertCircle size={20} />
          </div>
          <div>
            <h3 className="font-medium text-amber-900 dark:text-amber-200">
              Límite de selección alcanzado
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Has alcanzado el máximo de 20 empresas seleccionadas. Para añadir más, primero debes eliminar alguna de las ya seleccionadas.
            </p>
          </div>
        </div>
      )}
      
      {/* Contenedor principal con filtros y tabla */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Panel de filtros */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Filtros</CardTitle>
                {activeFilterCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="h-8 text-sm"
                  >
                    Reiniciar
                  </Button>
                )}
              </div>
              <CardDescription>
                {activeFilterCount === 0 
                  ? "Sin filtros aplicados" 
                  : `${activeFilterCount} filtro${activeFilterCount !== 1 ? 's' : ''} activo${activeFilterCount !== 1 ? 's' : ''}`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filtros aplicados */}
              {activeFilterCount > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Filtros aplicados:</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeFilters.sectors.map(sector => (
                      <Badge key={`sector-${sector}`} variant="secondary" className="py-1">
                        {sector}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 ml-1 p-0" 
                          onClick={() => removeFilter('sector', sector)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </Badge>
                    ))}
                    
                    {activeFilters.regions.map(region => (
                      <Badge key={`region-${region}`} variant="secondary" className="py-1">
                        {region}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 ml-1 p-0" 
                          onClick={() => removeFilter('region', region)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </Badge>
                    ))}
                    
                    {(activeFilters.marketCapRange[0] > 0 || activeFilters.marketCapRange[1] < 1000000000000) && (
                      <Badge variant="secondary" className="py-1">
                        Cap: {formatMarketCap(activeFilters.marketCapRange[0])} - {formatMarketCap(activeFilters.marketCapRange[1])}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 ml-1 p-0" 
                          onClick={() => removeFilter('marketCap')}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </Badge>
                    )}
                    
                    {activeFilters.minDividend > 0 && (
                      <Badge variant="secondary" className="py-1">
                        Div ≥ {activeFilters.minDividend}%
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 ml-1 p-0" 
                          onClick={() => removeFilter('dividend')}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </Badge>
                    )}
                    
                    {activeFilters.maxVolatility < 100 && (
                      <Badge variant="secondary" className="py-1">
                        Vol ≤ {activeFilters.maxVolatility}%
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 ml-1 p-0" 
                          onClick={() => removeFilter('volatility')}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {/* Opciones de filtro en acordeón */}
              <Accordion type="multiple" defaultValue={['sectors', 'regions']} className="w-full">
                {/* Sectores */}
                <AccordionItem value="sectors">
                  <AccordionTrigger className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Sectores
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {allSectors.map(sector => (
                        <div key={sector} className="flex items-start space-x-2">
                          <Checkbox 
                            id={`sector-${sector}`} 
                            checked={activeFilters.sectors.includes(sector)}
                            onCheckedChange={(checked) => handleSectorChange(sector, checked === true)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label 
                              htmlFor={`sector-${sector}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {sector}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Regiones */}
                <AccordionItem value="regions">
                  <AccordionTrigger className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Regiones
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {allRegions.map(region => (
                        <div key={region} className="flex items-start space-x-2">
                          <Checkbox 
                            id={`region-${region}`} 
                            checked={activeFilters.regions.includes(region)}
                            onCheckedChange={(checked) => handleRegionChange(region, checked === true)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label 
                              htmlFor={`region-${region}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {region}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Capitalización de mercado */}
                <AccordionItem value="marketCap">
                  <AccordionTrigger className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Cap. Mercado
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">
                          {formatMarketCap(activeFilters.marketCapRange[0])}
                        </span>
                        <span className="text-sm">
                          {formatMarketCap(activeFilters.marketCapRange[1])}
                        </span>
                      </div>
                      <Slider
                        min={0}
                        max={1000000000000}
                        step={1000000000}
                        value={[activeFilters.marketCapRange[0], activeFilters.marketCapRange[1]]}
                        onValueChange={handleMarketCapChange}
                        className="my-4"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Rendimiento de dividendos */}
                <AccordionItem value="dividend">
                  <AccordionTrigger className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Dividendos
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <Label>Mínimo: {activeFilters.minDividend}%</Label>
                      </div>
                      <Slider
                        min={0}
                        max={10}
                        step={0.1}
                        value={[activeFilters.minDividend]}
                        onValueChange={handleDividendChange}
                        className="my-4"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Volatilidad */}
                <AccordionItem value="volatility">
                  <AccordionTrigger className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Volatilidad
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <Label>Máxima: {activeFilters.maxVolatility}%</Label>
                      </div>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[activeFilters.maxVolatility]}
                        onValueChange={handleVolatilityChange}
                        className="my-4"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Excluir sectores */}
                <AccordionItem value="exclude">
                  <AccordionTrigger className="text-base font-medium">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Excluir Sectores
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p className="text-sm text-muted-foreground mb-4">
                        Sectores que deseas excluir completamente:
                      </p>
                      <div className="grid grid-cols-1 gap-3">
                        {allSectors.map(sector => (
                          <div key={`exclude-${sector}`} className="flex items-start space-x-2">
                            <Checkbox 
                              id={`exclude-${sector}`} 
                              checked={excludedSectors.includes(sector)}
                              onCheckedChange={() => handleExcludeSector(sector)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <Label 
                                htmlFor={`exclude-${sector}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {sector}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabla de selección de empresas */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Empresas Disponibles</CardTitle>
              <CardDescription>
                {filteredCompanies.length === 0 
                  ? "No hay empresas que cumplan con los criterios de filtrado."
                  : `Mostrando ${paginatedCompanies.length} de ${filteredCompanies.length} empresas disponibles.`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <span className="sr-only">Seleccionar</span>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          onClick={() => handleSort('name')}
                          className="flex items-center gap-1 font-medium"
                        >
                          Empresa
                          <ArrowUpDown size={14} />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          onClick={() => handleSort('sector')}
                          className="flex items-center gap-1 font-medium"
                        >
                          Sector
                          <ArrowUpDown size={14} />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button 
                          variant="ghost" 
                          onClick={() => handleSort('region')}
                          className="flex items-center gap-1 font-medium"
                        >
                          Región
                          <ArrowUpDown size={14} />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button 
                          variant="ghost" 
                          onClick={() => handleSort('marketCap')}
                          className="flex items-center gap-1 font-medium justify-end ml-auto"
                        >
                          Cap. Mercado
                          <ArrowUpDown size={14} />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button 
                          variant="ghost" 
                          onClick={() => handleSort('price')}
                          className="flex items-center gap-1 font-medium justify-end ml-auto"
                        >
                          Precio
                          <ArrowUpDown size={14} />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button 
                          variant="ghost" 
                          onClick={() => handleSort('dividend')}
                          className="flex items-center gap-1 font-medium justify-end ml-auto"
                        >
                          Div (%)
                          <ArrowUpDown size={14} />
                        </Button>
                      </TableHead>
                      <TableHead className="text-right">
                        <Button 
                          variant="ghost" 
                          onClick={() => handleSort('volatility')}
                          className="flex items-center gap-1 font-medium justify-end ml-auto"
                        >
                          Vol (%)
                          <ArrowUpDown size={14} />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCompanies.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No hay empresas que cumplan con los criterios de búsqueda o filtrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedCompanies.map((company) => (
                        <TableRow key={company.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedCompanies.includes(company.id)}
                              onCheckedChange={() => toggleCompanySelection(company.id)}
                              disabled={selectedCompanies.length >= 20 && !selectedCompanies.includes(company.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{company.name}</div>
                            <div className="text-xs text-muted-foreground">{company.ticker}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-normal">
                              {company.sector}
                            </Badge>
                          </TableCell>
                          <TableCell>{company.region}</TableCell>
                          <TableCell className="text-right font-mono">
                            {formatMarketCap(company.marketCap)}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatCurrency(company.price)}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {company.dividend.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {company.volatility.toFixed(0)}%
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Mostrando página {currentPage} de {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Información adicional */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg flex gap-3">
        <div className="text-blue-600 dark:text-blue-400 mt-1">
          <Info size={20} />
        </div>
        <div>
          <h3 className="font-medium text-blue-900 dark:text-blue-200">
            Sobre la selección de empresas
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Selecciona un conjunto diversificado de empresas que representen diferentes sectores y regiones para construir un portfolio bien balanceado. En el siguiente paso podrás decidir qué porcentaje de tu inversión asignar a cada una.
          </p>
        </div>
      </div>
    </div>
  );
}; 