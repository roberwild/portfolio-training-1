# Stack Tecnológico para Aplicación Financiera
## Next.js 15 + React 19

## Stack Frontend Core
- **Framework**: Next.js 15 con App Router
- **UI**: React 19 con TypeScript estricto
- **Estilos**: Tailwind CSS con class-variance-authority y tailwind-merge
- **Temas**: next-themes para soporte dark/light mode

## Gestión de Estado y Datos
- **Estado global**: Zustand para store global liviano
- **Fetching de datos**: TanStack React Query para manejo de estado asíncrono
- **Validación**: Zod para schema validation y type safety
- **Formularios**: React Hook Form con resolvers de Zod
- **Formateo de fechas**: date-fns para manipulación consistente
- **Identificadores**: UUID para generación de IDs únicos

## Componentes UI
- **Sistema de diseño**: shadcn/ui (basado en Radix UI)
- **Iconos**: Lucide React para set de iconos consistentes
- **Tablas avanzadas**: TanStack Table para datos tabulares complejos
- **Internacionalización**: i18next para soporte multi-idioma

## Visualización Financiera
- **Gráficos**: Recharts para visualizaciones estadísticas y financieras
- **Cálculos financieros**: Decimal.js para precisión en operaciones
- **Escalas de color**: color-scales para visualizaciones de datos graduadas

## Desarrollo y Testing
- **Datos mock**: @faker-js/faker para generación de datos realistas
- **Testing**: Testing Library + Jest para pruebas de componentes
- **Monitoreo**: Sentry para tracking de errores en producción
- **Linting**: ESLint con configuración Next.js

## Áreas de mejora recomendadas
- **Mock API**: Añadir MSW (Mock Service Worker) para simular APIs
- **Gráficos especializados**: Considerar react-financial-charts para gráficos de trading
- **Animaciones**: Framer Motion para transiciones entre vistas de datos
- **Notificaciones**: Sonner o react-hot-toast para alertas financieras
- **Storybook**: Para desarrollo y documentación de componentes
- **E2E Testing**: Playwright o Cypress para pruebas end-to-end