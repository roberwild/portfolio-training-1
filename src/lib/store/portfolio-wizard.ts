import { create } from 'zustand'

interface PortfolioWizardState {
  currentStep: number
  introSeen: boolean
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setIntroSeen: (seen: boolean) => void
}

export const usePortfolioWizardStore = create<PortfolioWizardState>((set) => ({
  currentStep: 0,
  introSeen: false,
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setIntroSeen: (seen) => set({ introSeen: seen }),
})) 