'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface Portfolio {
  id: string;
  name: string;
  investmentAmount: number;
  riskProfile: string | null;
  companies: number;
  createdAt: string;
}

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  
  useEffect(() => {
    // En una aplicación real, cargaríamos los portfolios desde una API
    // Aquí simulamos algunos portfolios de ejemplo
    setPortfolios([
      {
        id: '1',
        name: 'Mi Portfolio Tecnológico',
        investmentAmount: 25000,
        riskProfile: 'agresivo',
        companies: 8,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Inversión Conservadora',
        investmentAmount: 50000,
        riskProfile: 'conservador',
        companies: 12,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis Portfolios</h1>
        <Button asChild>
          <Link href="/portfolio">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Portfolio
          </Link>
        </Button>
      </div>

      {portfolios.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-4">No tienes portfolios guardados</h2>
          <p className="text-muted-foreground mb-8">Crea tu primer portfolio para comenzar a invertir</p>
          <Button asChild>
            <Link href="/portfolio">
              <Plus className="mr-2 h-4 w-4" />
              Crear Portfolio
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{portfolio.name}</CardTitle>
                <CardDescription>Creado el {formatDate(portfolio.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inversión:</span>
                    <span className="font-medium">{formatCurrency(portfolio.investmentAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Perfil de riesgo:</span>
                    <span className="font-medium capitalize">{portfolio.riskProfile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Empresas:</span>
                    <span className="font-medium">{portfolio.companies}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 pt-4">
                <Button variant="outline" className="w-full">
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 