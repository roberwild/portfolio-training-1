'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PortfolioSuccessPage() {
  return (
    <div className="w-full max-w-2xl mx-auto my-16 p-8 border rounded-lg shadow-sm bg-white">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900">¡Portfolio creado con éxito!</h1>
        
        <p className="text-gray-600 mb-6">
          Tu portfolio ha sido guardado y puedes verlo en la página de portfolios.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button asChild className="flex-1 bg-red-600 hover:bg-red-700">
            <Link href="/portfolios">
              Ver mis portfolios 
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="flex-1">
            <Link href="/portfolio">
              Crear otro portfolio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 