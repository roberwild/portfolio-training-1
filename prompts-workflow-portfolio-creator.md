# Prompt para generar pantalla de bienvenida de un creador de portfolios de inversión

Crea un componente React para Next.js que funcione como pantalla de bienvenida para un asistente de creación de portfolios de inversión. El componente debe estar en español y ser visualmente atractivo.

## Requisitos técnicos
- Usa "use client" para componente cliente en Next.js
- Importa React, Image y varios iconos de Lucide (BarChart3, LineChart, PieChart, etc.)
- Utiliza un store personalizado con usePortfolioWizardStore para manejar el estado del wizard
- Implementa componentes UI como Button, Card y CardContent
- Estilizado con TailwindCSS

## Estructura y contenido
- Encabezado con ícono Info, título "Bienvenido al Creador de Portfolios" y descripción
- Grid de 4 tarjetas destacando características principales:
  - Personalización Total (ícono Target)
  - Gestión de Riesgos (ícono Shield)
  - Diversificación Inteligente (ícono PieChart)
  - Análisis en Tiempo Real (ícono TrendingUp)
- Sección "Cómo funciona" con lista numerada de 5 pasos
- Botón CTA "Comenzar ahora" que avanza al siguiente paso del wizard

## Detalles visuales
- Diseño responsivo (mobile-first con breakpoints md)
- Animación de entrada suave
- Efectos hover en tarjetas con transición de bordes
- Esquema de colores usando variables primary, border, muted-foreground
- Iconos con fondos circulares semitransparentes

Debe ser un componente funcional moderno que guíe al usuario a través del proceso de creación de portfolio de inversiones.

# Prompt para Crear un Asistente de Creación de Portfolios de Inversión

## Objetivo
Desarrolla un asistente paso a paso (wizard) en React para guiar a los usuarios en la creación de portfolios de inversión. El componente debe gestionar un flujo estructurado desde la información básica hasta la confirmación final.

## Requisitos técnicos
- Utiliza React con "use client" para compatibilidad con Next.js
- Implementa gestión de estado con zustand (store personalizado)
- Crea una interfaz responsiva con soporte para modo oscuro
- Incluye validaciones en cada paso y transiciones fluidas

## Estructura de pasos
1. **Modal Informativo**: Introducción al proceso
2. **Datos Básicos**: Nombre del portfolio y datos fundamentales
3. **Evaluación de Riesgo**: Cuestionario para determinar perfil
4. **Selección de Empresas**: Elegir compañías para invertir
5. **Asignación de Portfolio**: Distribución de porcentajes
6. **Resumen**: Vista previa antes de confirmar

## Funcionalidades clave
- Navegación entre pasos con botones Anterior/Siguiente
- Indicador visual de progreso
- Validaciones específicas para cada paso
- Confirmación antes de reiniciar el proceso
- Pantalla de éxito al completar el portfolio
- Opciones para ver portfolios creados o comenzar uno nuevo

## Experiencia de usuario
- Incluir transiciones suaves entre pasos
- Mostrar claramente el progreso actual
- Proporcionar feedback visual sobre validaciones
- Botones con iconos y efectos de hover
- Diseño limpio con tarjetas y sombras sutiles

El código debe ser modular, estar bien estructurado y ofrecer una experiencia fluida e intuitiva para usuarios que desean crear portfolios de inversión personalizados.

# Prompt para Componente de Información Básica de Portafolio

Crea un componente React para la primera pantalla de un asistente de portafolio de inversiones que recopile la información básica. El componente debe estar en español y ofrecer una experiencia de usuario intuitiva.

## Requisitos principales:
- Componente de cliente para Next.js (use client)
- Utiliza un store global para gestionar el estado del asistente
- Recopila dos datos principales:
  - Nombre del portafolio (campo de texto)
  - Monto total de inversión (mediante slider e input numérico sincronizados)
- El monto debe estar limitado entre 1.000 y 1.000.000, con incrementos de 1.000
- Incluye validación de datos y formateo de moneda
- Proporciona información contextual para ayudar al usuario

## Estructura visual:
- Título y descripción introductoria
- Sección para nombre del portafolio con explicación
- Sección para monto de inversión con slider e input numérico
- Recuadro informativo explicando la importancia de estos datos

## Diseño:
- Utiliza componentes UI existentes (Input, Label, Slider)
- Aplica Tailwind CSS para el estilizado
- Mantén una jerarquía visual clara con espaciado adecuado

El resultado debe ser un componente limpio, intuitivo y fácilmente integrable en un asistente multi-paso.

# Prompt para crear componente de Evaluación de Riesgo en React

Necesito desarrollar un componente React para una evaluación de perfil de riesgo de inversión. Este componente debe permitir a los usuarios responder preguntas sobre su tolerancia al riesgo y mostrar automáticamente su perfil calculado.

## Requisitos técnicos:
- Usa React con TypeScript y el patrón "use client" para Next.js
- Implementa gestión de estado con un store personalizado (ya existe usePortfolioWizardStore)
- Integra internacionalización con i18next
- Utiliza componentes UI de una biblioteca existente (Card, RadioGroup, Button, etc.)
- Debe ser compatible con modo oscuro/claro
- Procesa preguntas desde un archivo de constantes externo

## Comportamiento esperado:
- Muestra una serie de preguntas de evaluación de riesgo con opciones de respuesta tipo radio
- Calcula automáticamente el perfil cuando todas las preguntas están respondidas
- Muestra el perfil calculado con estilo visual diferenciado según el tipo (conservador, moderado, etc.)
- Incluye un mensaje informativo sobre el propósito de la evaluación

## Consideraciones de diseño:
- Utiliza tarjetas para cada pregunta con estilo consistente
- Diferencia visualmente los perfiles de riesgo con colores apropiados
- Incluye iconos informativos donde sea necesario
- Asegura que sea completamente responsive y accesible

El componente debe integrarse en un flujo tipo wizard para la creación de un portafolio de inversión.

# Prompt para Crear Componente de Filtros de Empresas en React

Crea un componente de React con TypeScript que funcione como un panel de filtros avanzados para empresas en una aplicación de inversión. El componente debe seguir estas especificaciones:

## Funcionalidad principal
- Permitir filtrar empresas por sectores industriales, regiones geográficas, capitalización de mercado, rendimiento de dividendos y volatilidad
- Mostrar visualmente los filtros activos como badges eliminables
- Ofrecer opción para excluir sectores completos del portafolio (usando estado global)
- Incluir un botón para restablecer todos los filtros

## Estructura técnica
- Usar "use client" para Next.js
- Implementar interfaz con acordeones expandibles para cada categoría de filtros
- Utilizar checkboxes para selecciones múltiples (sectores/regiones)
- Implementar sliders para rangos numéricos (capitalización, dividendos, volatilidad)
- Conectar con una tienda Zustand para los sectores excluidos
- Emitir eventos al componente padre cuando cambien los filtros

## Detalles específicos
- Para capitalización de mercado: slider dual ($0B - $1T+)
- Para dividendos: slider simple para mínimo (0-10%)
- Para volatilidad: slider simple para máximo (0-100%)
- Convertir valores de UI (porcentajes/billions) a valores reales al enviar al padre

El diseño debe ser responsive con una estética moderna usando componentes de UI personalizados.

# Prompt para Crear un Componente de Selección de Empresas en React

Necesito un componente React para un asistente de creación de portfolios de inversión que permita a los usuarios seleccionar compañías. El componente debe tener estas características:

## Funcionalidad principal
- Mostrar una tabla interactiva de empresas con datos como nombre, sector, región, precio, dividendo y volatilidad
- Permitir seleccionar hasta 20 empresas mediante checkboxes
- Implementar búsqueda global, filtros y ordenación en múltiples campos
- Sincronizar las selecciones con un estado global usando un custom store
- Implementar paginación para navegar entre resultados

## Estructura y diseño
- División en layout responsive con sidebar de filtros (1/4) y tabla principal (3/4)
- Mostrar contador de empresas seleccionadas (X de 20)
- Deshabilitar la selección cuando se alcance el límite máximo
- Formatear correctamente valores monetarios y porcentajes

## Requisitos técnicos
- Usar TanStack Table (react-table v8) para gestionar la tabla
- Implementar filtrado avanzado que combine búsqueda global con filtros específicos
- Utilizar componentes de UI de una biblioteca de diseño consistente
- Optimizar con useMemo para evitar cálculos innecesarios
- Sincronizar bidireccional entre el estado de la tabla y el store global

## Lógica de negocio
- Aplicar restricciones de selección basadas en cuota máxima
- Permitir excluir sectores específicos definidos en el store global
- Implementar formateo específico para diferentes tipos de datos

El componente debe ser parte de un flujo tipo wizard y estar optimizado para usabilidad.

# Prompt para Componente de Asignación de Portfolio

Crea un componente React para gestionar la asignación de inversiones en un portfolio financiero. El componente debe permitir a los usuarios distribuir su capital entre diferentes empresas seleccionadas previamente.

## Requerimientos principales:

- Desarrolla un componente de asignación de cartera que permita distribuir inversiones entre empresas mediante porcentajes y número de acciones
- Implementa visualizaciones con gráficos circulares para mostrar distribución por empresa, sector industrial y región geográfica
- Crea una tabla interactiva que permita modificar asignaciones con entradas numéricas y deslizadores
- Incluye funcionalidad para bloquear/desbloquear empresas específicas durante el rebalanceo automático
- Añade un sistema de rebalanceo proporcional que ajuste automáticamente las empresas no bloqueadas
- Muestra un resumen con porcentajes y montos asignados/restantes
- Implementa distribución equitativa automática como opción predeterminada

## Especificaciones técnicas:

- Utiliza React y Zustand/Context para la gestión de estado
- Integra Recharts para visualizaciones
- Implementa componentes UI como Card, Table, Slider, Button de una biblioteca de componentes
- Usa Lucide para iconografía
- Incluye tabs para organizar diferentes vistas de los gráficos
- Todo en español para el mercado hispanohablante

El componente debe actualizar calculando precios, acciones y porcentajes en tiempo real, manteniendo siempre consistencia entre los diferentes valores y respetando el presupuesto total de inversión.

# Prompt para Componente de Resumen de Portafolio de Inversiones

Crea un componente React para mostrar el resumen completo de un portafolio de inversiones financieras. El componente debe funcionar como la pantalla final de un asistente de creación de portafolios, mostrando toda la información relevante antes de que el usuario finalice el proceso.

## Requisitos técnicos

- Implementa un componente para Next.js (usa "use client")
- Utiliza React 18 con hooks (useState, useEffect, useMemo)
- Integra con Zustand para gestión del estado global
- Añade manejo robusto de errores con un fallback seguro
- Incluye logging detallado para facilitar depuración

## Funcionalidades principales

- Muestra un resumen visual del portafolio usando gráfico de pastel (Recharts)
- Presenta tabla detallada con las empresas seleccionadas y su asignación
- Visualiza información básica: nombre, inversión total, perfil de riesgo
- Verifica si el portafolio está completamente asignado (100%)
- Indica los próximos pasos disponibles al finalizar

## Componentes de UI

- Utiliza Shadcn UI para tarjetas, tablas y otros elementos
- Incorpora iconos de Lucide para mejorar la experiencia visual
- Implementa diseño responsivo que funcione en móvil y escritorio

## Detalles adicionales

- Todo el texto debe estar en español
- Formatea correctamente valores monetarios
- Incluye un sistema de colores para el gráfico que sea consistente
- Estructura el código con buenas prácticas de manejo de errores
- Implementa una versión simplificada como fallback si algo falla

El objetivo es crear una pantalla intuitiva que ayude a los usuarios a visualizar su asignación de inversiones antes de finalizar, con especial atención a la robustez del código y la experiencia de usuario.

# Prompt para Componente de Barra de Progreso Interactiva para Wizard

Desarrolla un componente React (TypeScript) que muestre una barra de progreso interactiva para un asistente de configuración de portafolios de inversión. El componente debe ser moderno, accesible y adaptativo.

## Funcionalidades clave

- **Navegación condicional**: Permite volver a pasos ya visitados pero bloquea acceso a pasos futuros
- **Visualización de estados**: Diferencia visualmente entre pasos actuales, completados y futuros
- **Indicadores interactivos**: Muestra elementos visuales que indican la posibilidad de navegación
- **Diseño responsivo**: Visualización vertical en móvil y horizontal en escritorio

## Estructura esperada

- Props para `currentStep` (paso actual) y `maxStepVisited` (paso máximo alcanzado)
- Integración con un store personalizado que proporciona `goToStep(id)`
- Lista de pasos para un wizard de inversiones: Información básica, Evaluación de riesgo, etc.
- Ocultamiento completo cuando se está en el paso introductorio (ID -1)

## Aspectos visuales

- Usa Tailwind CSS para estilos condicionales
- Implementa iconos para indicar estados (check para completado, flechas para navegación)
- Incluye efectos de hover y transiciones suaves para mejorar la UX
- Estados visuales claros que distingan entre pasos activos, completados y futuros

El componente debe seguir buenas prácticas de accesibilidad y proporcionar feedback visual claro sobre el progreso del usuario a través del asistente.