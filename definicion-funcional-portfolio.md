# Definición Funcional: Portfolio Investment Creator MVP

## 1. Descripción General
Plataforma web para la creación y análisis de portfolios de inversión, dirigida tanto a inversores novatos como experimentados, con un enfoque guiado y educativo.
Desarrollar una plataforma intuitiva que permita a usuarios (tanto novatos como experimentados) crear, analizar y gestionar portfolios de inversión personalizados. La solución facilitará el proceso completo desde el análisis del perfil de riesgo hasta la visualización de resultados, ofreciendo una experiencia guiada y educativa.

## 2. Público Objetivo
- Inversores novatos que buscan crear su primer portfolio
- Inversores experimentados que desean optimizar sus carteras
- Usuarios interesados en simulación de inversiones sin compromiso real

## 3. Flujo de la Aplicación

### 3.1. Evaluación de Perfil de Riesgo
- Implementación basada en cuestionario MiFID
- Categorización automática del perfil inversor
- Resultados claros y explicativos del perfil asignado

### 3.2. Selección de Empresas
#### Características Base

- Límite inicial de 20 empresas disponibles

* Uso exclusivo de datos mockup
* Análisis histórico limitado
* Sin conexión a mercados en tiempo real
* Sin ejecución real de operaciones
* Número limitado de empresas disponibles
* Funcionalidades de análisis básicas

- Cobertura geográfica:
  - Europa
  - Estados Unidos
  - Asia

#### Información por Empresa
- Nombre de la compañía
- Sector
- Región
- Precio actual
- Dividend Yield

#### Filtros y Ordenación
- Por región geográfica
- Por sector
- Por nivel de dividendos
- Recomendaciones personalizadas según perfil MiFID

### 3.3. Configuración del Portfolio
#### Herramientas de Distribución
- Botón de distribución equitativa automática
- Sliders para ajuste porcentual manual
- Validaciones de coherencia con perfil de riesgo

#### Características
- Distribución por porcentaje del capital total
- Cálculo automático del número de acciones
- Alertas de concentración excesiva

### 3.4. Visualización y Análisis
#### Métricas Principales
- Empresa (nombre y ticker)
- Porcentaje asignado
- Número de acciones
- Monto invertido por posición

#### Comparativas de Mercado
- S&P 500
- NASDAQ
- IBEX 35

### 3.5. Exportación
- Formato PDF
- Formato Excel

## 4. Características de UX/UI
- Flujo lineal paso a paso
- Tips educativos contextuales durante el proceso
- Ayudas y explicaciones en cada fase
- Interfaz intuitiva y amigable
- Diseño responsive para plataformas web y móvil
- Ayudas contextuales y explicaciones de conceptos financieros

## 5. Limitaciones del MVP
- Sin funcionalidad de guardado de portfolios
- Sin proyecciones o simulaciones futuras
- Datos estáticos (mockup)
- Sin integración con datos de mercado en tiempo real
- Sin autenticación de usuarios

## 6. Consideraciones Técnicas
- Interfaz web responsive
- Datos mockup pre-cargados
- Sin necesidad de backend complejo inicial
- Sin persistencia de datos

## 7. Aspectos Educativos
- Tips de asesoramiento durante la configuración
- Explicaciones sobre diversificación
- Guía sobre interpretación de métricas
- Recomendaciones basadas en perfil de riesgo

## 8. Futuras Mejoras (Fuera del MVP)
- Guardado de portfolios
- Datos en tiempo real
- Proyecciones y simulaciones
- Autenticación de usuarios
- Más empresas y activos disponibles
- Análisis técnico avanzado
- Rebalanceo automático
- Notificaciones y alertas