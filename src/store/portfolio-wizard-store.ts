import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type RiskProfile = 'conservador' | 'moderado' | 'equilibrado' | 'crecimiento' | 'agresivo';

export interface Company {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  region: string;
  marketCap: number;
  price: number;
  dividend: number;
  volatility: number;
}

export interface CompanyAllocation {
  companyId: string;
  percentage: number;
  shares: number;
  amount: number;
  isLocked: boolean;
}

export interface PortfolioWizardState {
  // Navegación
  currentStep: number;
  maxStepVisited: number;
  
  // Datos básicos
  portfolioName: string;
  investmentAmount: number;
  
  // Evaluación de riesgo
  riskAnswers: Record<string, number>;
  riskProfile: RiskProfile | null;
  
  // Filtros de empresas
  excludedSectors: string[];
  filters: {
    sectors: string[];
    regions: string[];
    marketCapRange: [number, number];
    minDividend: number;
    maxVolatility: number;
  };
  
  // Selección de empresas
  selectedCompanies: string[];
  
  // Asignación de portfolio
  allocations: Record<string, CompanyAllocation>;
  
  // Acciones
  goToStep: (step: number) => void;
  setPortfolioBasics: (name: string, amount: number) => void;
  setRiskAnswer: (questionId: string, answer: number) => void;
  calculateRiskProfile: () => void;
  toggleExcludedSector: (sector: string) => void;
  setFilters: (filters: Partial<PortfolioWizardState['filters']>) => void;
  toggleCompanySelection: (companyId: string) => void;
  setAllocation: (companyId: string, data: Partial<CompanyAllocation>) => void;
  distributeEqually: () => void;
  rebalancePortfolio: () => void;
  resetWizard: () => void;
}

const initialState: Omit<PortfolioWizardState, 'goToStep' | 'setPortfolioBasics' | 'setRiskAnswer' | 'calculateRiskProfile' | 'toggleExcludedSector' | 'setFilters' | 'toggleCompanySelection' | 'setAllocation' | 'distributeEqually' | 'rebalancePortfolio' | 'resetWizard'> = {
  currentStep: -1, // -1 es la pantalla de bienvenida, 0 es el primer paso real
  maxStepVisited: -1,
  portfolioName: '',
  investmentAmount: 10000,
  riskAnswers: {},
  riskProfile: null,
  excludedSectors: [],
  filters: {
    sectors: [],
    regions: [],
    marketCapRange: [0, 1000000000000] as [number, number], // Explicitly cast to tuple
    minDividend: 0,
    maxVolatility: 100,
  },
  selectedCompanies: [],
  allocations: {},
};

export const usePortfolioWizardStore = create<PortfolioWizardState>()(
  devtools(
    persist(
      (set, get) => ({
        ...(initialState as PortfolioWizardState), // Cast initialState here as well if needed, though Omit might suffice
        
        // Navegación
        goToStep: (step) => set((state) => ({
          currentStep: step,
          maxStepVisited: Math.max(state.maxStepVisited, step)
        })),
        
        // Datos básicos
        setPortfolioBasics: (name, amount) => set({
          portfolioName: name,
          investmentAmount: amount
        }),
        
        // Evaluación de riesgo
        setRiskAnswer: (questionId, answer) => set((state) => ({
          riskAnswers: { ...state.riskAnswers, [questionId]: answer }
        })),
        
        calculateRiskProfile: () => {
          const { riskAnswers } = get();
          const totalQuestions = Object.keys(riskAnswers).length;
          
          if (totalQuestions < 5) return; // Necesitamos al menos 5 respuestas
          
          const sum = Object.values(riskAnswers).reduce((a, b) => a + b, 0);
          const average = sum / totalQuestions;
          
          let profile: RiskProfile;
          
          if (average <= 1.5) profile = 'conservador';
          else if (average <= 2.5) profile = 'moderado';
          else if (average <= 3.5) profile = 'equilibrado';
          else if (average <= 4.5) profile = 'crecimiento';
          else profile = 'agresivo';
          
          set({ riskProfile: profile });
        },
        
        // Filtros de empresas
        toggleExcludedSector: (sector) => set((state) => {
          const isExcluded = state.excludedSectors.includes(sector);
          return {
            excludedSectors: isExcluded
              ? state.excludedSectors.filter(s => s !== sector)
              : [...state.excludedSectors, sector]
          };
        }),
        
        setFilters: (filters) => set((state) => ({
          filters: { ...state.filters, ...filters }
        })),
        
        // Selección de empresas
        toggleCompanySelection: (companyId) => set((state) => {
          const isSelected = state.selectedCompanies.includes(companyId);
          
          // Si ya está seleccionada, la quitamos
          if (isSelected) {
            return {
              selectedCompanies: state.selectedCompanies.filter(id => id !== companyId),
              allocations: Object.fromEntries(
                Object.entries(state.allocations).filter(([id]) => id !== companyId)
              )
            };
          }
          
          // Si no está seleccionada y no hemos llegado al límite, la añadimos
          if (state.selectedCompanies.length < 20) {
            return {
              selectedCompanies: [...state.selectedCompanies, companyId]
            };
          }
          
          return state;
        }),
        
        // Asignación de portfolio
        setAllocation: (companyId, data) => set((state) => ({
          allocations: {
            ...state.allocations,
            [companyId]: {
              ...state.allocations[companyId] || {
                companyId,
                percentage: 0,
                shares: 0,
                amount: 0,
                isLocked: false
              },
              ...data
            }
          }
        })),
        
        distributeEqually: () => {
          const { selectedCompanies, investmentAmount } = get();
          const count = selectedCompanies.length;
          
          if (count === 0) return;
          
          const equalPercentage = 100 / count;
          const equalAmount = investmentAmount / count;
          
          // Simulamos precios para el cálculo de acciones
          // En un caso real, esto vendría de datos reales
          const mockCompanyPrices: Record<string, number> = {};
          selectedCompanies.forEach(id => {
            // Precio aleatorio entre $10 y $500 para simular
            mockCompanyPrices[id] = Math.random() * 490 + 10;
          });
          
          const newAllocations: Record<string, CompanyAllocation> = {};
          
          selectedCompanies.forEach(companyId => {
            const price = mockCompanyPrices[companyId] || 100;
            const shares = Math.floor(equalAmount / price);
            
            newAllocations[companyId] = {
              companyId,
              percentage: equalPercentage,
              shares,
              amount: shares * price,
              isLocked: false
            };
          });
          
          set({ allocations: newAllocations });
        },
        
        rebalancePortfolio: () => {
          const { allocations, selectedCompanies, investmentAmount } = get();
          
          // Identificar empresas bloqueadas y no bloqueadas
          const lockedCompanies: string[] = [];
          const unlockedCompanies: string[] = [];
          
          selectedCompanies.forEach(companyId => {
            if (allocations[companyId]?.isLocked) {
              lockedCompanies.push(companyId);
            } else {
              unlockedCompanies.push(companyId);
            }
          });
          
          if (unlockedCompanies.length === 0) return;
          
          // Calcular el monto total y porcentaje para empresas bloqueadas
          let lockedPercentageTotal = 0;
          let lockedAmountTotal = 0;
          
          lockedCompanies.forEach(companyId => {
            lockedPercentageTotal += allocations[companyId].percentage;
            lockedAmountTotal += allocations[companyId].amount;
          });
          
          // Calcular cuánto queda para distribuir
          const remainingPercentage = 100 - lockedPercentageTotal;
          const remainingAmount = investmentAmount - lockedAmountTotal;
          
          if (remainingPercentage <= 0 || remainingAmount <= 0) return;
          
          // Distribuir equitativamente entre empresas no bloqueadas
          const equalPercentage = remainingPercentage / unlockedCompanies.length;
          const equalAmount = remainingAmount / unlockedCompanies.length;
          
          const newAllocations = { ...allocations };
          
          // Actualizar las asignaciones para empresas no bloqueadas
          unlockedCompanies.forEach(companyId => {
            const price = newAllocations[companyId]?.amount / newAllocations[companyId]?.shares || 100;
            const shares = Math.floor(equalAmount / price);
            
            newAllocations[companyId] = {
              ...(newAllocations[companyId] || { companyId, isLocked: false }),
              percentage: equalPercentage,
              shares,
              amount: shares * price,
              isLocked: false
            };
          });
          
          set({ allocations: newAllocations });
        },
        
        // Reset
        resetWizard: () => set({
          ...initialState,
          filters: {
            ...initialState.filters,
            // Ensure marketCapRange keeps its tuple type on reset
            marketCapRange: [...initialState.filters.marketCapRange] as [number, number] 
          }
        }),
      }),
      {
        name: 'portfolio-wizard-storage',
      }
    )
  )
); 