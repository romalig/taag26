# TAAG — Contexto de Negocio para Asistente de Chat

> Documento de referencia para el modelo de IA que atiende clientes de TAAG.
> Contiene información de productos, tecnologías, servicios, ubicaciones y casos de uso.
> **IMPORTANTE:** Todos los enlaces son paths relativos. NO incluir dominio base.

---

## 1. Identidad de la Empresa

| Campo | Detalle |
|---|---|
| **Nombre** | TAAG |
| **Nombre corto** | TAAG |
| **Sitio web** | `/` (home) |
| **Tagline** | "Reading nature. Interpreting the future." |
| **Misión** | Inteligencia molecular avanzada y diagnósticos basados en IA para la industria manufacturera global. |
| **Visión** | *"Someday, every biological risk will be detected before it becomes a problem."* |
| **Propuesta de valor** | Transformar la microbiología tradicional en inteligencia real: de la detección a la prevención, y del dato a la decisión. |

---

## 2. Mapa de URLs del Sitio

> Regla: NUNCA incluir dominio base. Todas las URLs son paths relativos.

### 2.1 Páginas Principales

| Sección | URL | Descripción |
|---|---|---|
| Home | `/` | Página principal |
| Soluciones Industriales | `/industrial` | Catálogo de soluciones con buscador y filtros por categoría |
| AiGOR™ / Elevia™ | `/aigor` | Tecnología RNA y kits Elevia™ |
| TxA Software | `/TxA` | Plataforma de IA para control microbiológico |
| MILA™ / Custom Development | `/customized` | Servicio de desarrollo a medida |
| Partner Ecosystem | `/labs` | Red de laboratorios y partners |
| Ubicaciones | `/where` | Presencia global y distribución |

### 2.2 Resolución de URL por Producto

| Producto | URL | Razón |
|---|---|---|
| Elevia™ Kits (AiGOR™) | `/aigor` | Tiene página dedicada |
| Zero-Risk Internal EMP Kit | `/aigor` | Usa tecnología AiGOR™ |
| TxA Software | `/TxA` | Tiene página dedicada |
| MILA™ Custom Development | `/customized` | Tiene página dedicada |
| Ampliora™ Multiplex Kits | `/industrial` | Sin página propia → catálogo industrial |
| Specio™ Spoilage | `/industrial` | Sin página propia → catálogo industrial |
| Cualquier kit individual | `/industrial` | Sin página propia → catálogo industrial |

---

## 3. Pilares del Negocio

| Pilar | Descripción |
|---|---|
| **Ready-to-use Kits** | Kits moleculares estandarizados listos para implementar en tu laboratorio. |
| **AI-Driven Customization** | Ensayos a medida diseñados por algoritmos para atacar cepas o targets específicos del cliente. |
| **Global Service Hubs** | Laboratorios regionales que ofrecen servicios avanzados de outsourcing y soporte técnico. |

---

## 4. Tecnologías Propietarias

### 4.1 AiGOR™ — RNA Technology
**URL:** `/aigor`

La tecnología RNA de próxima generación que redefine la sensibilidad en microbiología.

| Característica | Valor |
|---|---|
| **Sensibilidad** | 10,000x mayor que el PCR tradicional |
| **Tiempo al resultado** | Desde 3 horas |
| **Enriquecimiento** | No requerido (Protocolo Zero) |
| **Detección** | Dirigida a RNA: solo detecta células metabólicamente activas |
| **LOD** | 1 CFU / muestra |

**¿Por qué RNA y no DNA?**
El RNA solo está presente en células vivas y metabólicamente activas. Esto elimina falsos positivos de células muertas y permite detectar infecciones activas con precisión sin necesidad de esperar el crecimiento bacteriano en enriquecimiento.

---

### 4.2 MILA™ — AI-Driven Assay Design
**URL:** `/customized`

Plataforma de inteligencia artificial para el diseño de kits de PCR personalizados.

| Capacidad | Descripción |
|---|---|
| **Análisis genómico** | Navega millones de combinaciones genómicas para diseñar el set óptimo de primers y sondas. |
| **Selección precisa** | Filtra el ruido para encontrar el único mejor set para tu target. |
| **Multiplexado avanzado** | Diseña reacciones multi-target sin competencia entre primers. |
| **Velocidad** | Reduce meses de I+D a un proceso simple y ágil. |

---

### 4.3 KAi™ Technology
**URL:** `/industrial`

Tecnología empleada en la línea Specio™ para identificación de organismos deteriorantes (levaduras, mohos, bacterias).

---

### 4.4 TxA — AI Predictive Control
**URL:** `/TxA`

Plataforma de IA para el control microbiológico dinámico y preventivo de plantas de producción.

| Funcionalidad | Descripción |
|---|---|
| **Digitalización de planta** | TxA crea un modelo digital del layout de tu planta, determinando equipos, distancias y zonas críticas. |
| **Muestreo predictivo (AI)** | Los algoritmos de IA analizan datos históricos para identificar los mejores puntos de muestreo y prevenir riesgos antes de que ocurran. |
| **App móvil** | Ejecuta muestreos digitales en campo con fotos adjuntas, información detallada del punto y sincronización instantánea a la nube. |
| **Resultados en contexto** | Cada dato se mapea directamente sobre el plano de tu planta para acelerar el análisis de causa raíz. |
| **Programas dinámicos y preventivos** | Construye programas que se adaptan en tiempo real para maximizar la calidad y seguridad alimentaria. |
| **Integración** | Compatible con kits Elevia™ y Ampliora™. |

---

## 5. Catálogo de Productos

### 5.1 Líneas Principales (con campo `url` para el frontend)

| Producto | code | Categoría | Tecnología | time_to_result | URL |
|---|---|---|---|---|---|
| Elevia™ Kits (Powered by AiGOR™) | ELEVIA-AIGOR | Kit | AiGOR™ RNA-based | Desde 3 horas | `/aigor` |
| Ampliora™ Multiplex Kits | AMPLIORA-MX | Kit | MILA™ AI-Designed PCR | 24-28 horas | `/industrial` |
| Specio™ Spoilage Identification | SPECIO-KAI | Kit | KAi™ Technology | Identificación en el mismo día | `/industrial` |
| TxA Software | TXA-SW | Software | AI Predictive Control | Datos en tiempo real | `/TxA` |
| MILA™ Custom Development | MILA-CUSTOM | Service | AI-Driven Assay Design | Timeline personalizado | `/customized` |
| Zero-Risk Internal EMP Kit | TAAG-S11-100 | Kit | AiGOR™ RNA-based | < 3 horas | `/aigor` |

---

### 5.2 Elevia™ Kits (Powered by AiGOR™)
**URL:** `/aigor`

| Campo | Detalle |
|---|---|
| Categoría | Kit |
| Tecnología | AiGOR™ RNA-based |
| Tiempo al resultado | Desde 3 horas |
| Ventaja clave | Detección ultrarrápida sin enriquecimiento tradicional |
| Sensibilidad | 10,000x vs PCR estándar |
| Matrices validadas | Cacao, especias, lácteos (y más) |
| Ideal para | Decisiones en el mismo turno de producción |

---

### 5.3 Ampliora™ Multiplex Kits
**URL:** `/industrial`

| Campo | Detalle |
|---|---|
| Categoría | Kit |
| Tecnología | MILA™ AI-Designed PCR |
| Tiempo al resultado | 24–28 horas |
| Ventaja clave | Detección simultánea de múltiples patógenos (todo en uno) |
| Eficiencia | Menos reacciones, más resultados; compatibilidad con automatización |
| Ideal para | Rutinas de alto volumen y control de costos |

---

### 5.4 Specio™ Spoilage Identification
**URL:** `/industrial`

| Campo | Detalle |
|---|---|
| Categoría | Kit |
| Tecnología | KAi™ Technology |
| Tiempo al resultado | Identificación en el mismo día |
| Ventaja clave | Identificación simultánea de decenas de targets deteriorantes |
| Organismos detectados | Levaduras, mohos (detección temprana) |
| Previene | Alteraciones de sabor, producción de gas, recalls por vida útil |

---

### 5.5 Zero-Risk Internal EMP Kit
**URL:** `/aigor`
**Número de catálogo:** TAAG-S11-100

Kit de PCR en tiempo real para monitoreo ambiental de patógenos (EMP) sin necesidad de laboratorio BSL-2.

| Especificación Técnica | Valor |
|---|---|
| **Targets** | Listeria spp. & Salmonella spp. |
| **LOD** | 1 CFU / muestra |
| **Matrices** | Esponjas, hisopos, líquidos |
| **Tiempo al resultado** | < 3 horas |
| **Tecnología** | AiGOR™ RNA-based |
| **Química** | Hydrolysis Probes (5' Nuclease) |
| **Canales** | FAM (Listeria), HEX (Salmonella), ROX (Control interno) |
| **Termocicladores compatibles** | Bio-Rad CFX96, Applied Biosystems 7500, AriaMx |
| **Almacenamiento** | -20°C (Reactivos), Temperatura ambiente (Buffer) |
| **Vida útil** | 12 meses desde fabricación |
| **Certificaciones** | AOAC-RI PTM (Pendiente) |

**Ventajas:**
- Sin biohazard: no hay crecimiento de patógenos en instalaciones
- Resultados en horas, no días
- Intervención el mismo día del muestreo
- Elimina costos de laboratorio externo y tiempos de envío
- No requiere microbiólogo especializado

**Insumos complementarios:**
- Lysis Buffer (Cat: TAAG-X20-BUF, 1 L) — Buffer de inactivación de patógenos

---

## 6. Catálogo Industrial por Categoría

> Todos estos productos individuales usan URL: `/industrial`
> El frontend redirige al catálogo de soluciones donde el usuario puede filtrar.

### 6.1 Pathogens

| Producto | Tecnología | Target | URL |
|---|---|---|---|
| Salmonella spp. Rapid Kit | AiGOR™ RNA-based | invA gene | `/industrial` |
| Salmonella spp. Rapid Kit2 | Real-Time PCR | invA gene | `/industrial` |
| Listeria monocytogenes Pro | Real-Time PCR | hlyA gene | `/industrial` |
| E. coli O157:H7 Screen | Multiplex PCR | stx1, stx2 | `/industrial` |

### 6.2 Spoilage

| Producto | Target | URL |
|---|---|---|
| Total Spoilage Organisms | 18S rRNA, bacterial 16S | `/industrial` |
| Indicator Bacteria Count | TAB, Enteros | `/industrial` |

### 6.3 Beverages (Juices & Soft Drinks)

| Producto | Target | URL |
|---|---|---|
| Alicyclobacillus (TAB) Detect | Guaiacol producers | `/industrial` |
| Osmophilic Yeast Panel | Z. rouxii, Z. bailii | `/industrial` |

### 6.4 Brewing

| Producto | Target | URL |
|---|---|---|
| Hop-Resistance Screen | horA, horC genes | `/industrial` |
| Strict Anaerobes Detect | Megasphaera, Pectinatus | `/industrial` |

### 6.5 Wine

| Producto | Target | URL |
|---|---|---|
| Brettanomyces Guard | B. bruxellensis | `/industrial` |
| Acetic Acid Bacteria Flow | Acetobacter, Gluconobacter | `/industrial` |

---

## 7. Servicio de Desarrollo a Medida — MILA™ Custom Development
**URL:** `/customized`

| Campo | Detalle |
|---|---|
| Categoría | Servicio |
| Tecnología | AI-Driven Assay Design |
| Entregables | Kit molecular personalizado validado para tus matrices |
| Validación | Gratuita en las matrices específicas del cliente |
| Timeline | Personalizado según la complejidad |
| Ideal para | Cuando los kits estándar no son suficientes; cepas propietarias; nuevos targets |

---

## 8. Soluciones Industriales Destacadas

**URL:** `/industrial`

| Solución | Descripción | Tags |
|---|---|---|
| Zero-Risk Internal EMP | Detección de patógenos en < 3 horas sin enriquecimiento. Permite traer el testing in-house con seguridad absoluta. | EMP, AiGOR |
| Fast Salmonella Control | Resultados en el mismo turno para Salmonella en muestras ambientales y de alimentos. | Salmonella, AiGOR |
| Multiplex Process Control | Detecta patógenos e indicadores en una sola reacción de PCR. | 4-in-1, Preventive |
| Broad-Spectrum Spoilage Defense | Screening de levaduras, mohos y bacterias de deterioro en un solo run de PCR. | Spoilage, Beverages |
| Surface & Drain Hygiene Pro | Seguimiento cuantitativo de indicadores de higiene para prevenir formación de biofilms. | Hygiene, Prevention |
| TxA Integration | Plataforma IA para convertir datos complejos en acción preventiva. | TxA, Software |

**Requisitos de laboratorio para implementar:**

| Parámetro | Valor |
|---|---|
| Espacio requerido | 3 m² (área de mesada estándar) |
| Operadores | 1 persona (no requiere título especializado) |
| Tiempo de instalación | < 48 horas (instalación y entrenamiento) |
| Infraestructura | Mínima (corriente estándar + internet) |

---

## 9. Casos de Éxito

| Cliente | Resultado | Industria |
|---|---|---|
| Planta de testing ambiental (Dairy) | >$200,000 USD de ahorro/año/instalación implementando EMP in-house con AiGOR | Lácteos / Seguridad |
| Gran empresa de bebidas | Control total de microorganismos deteriorantes, previniendo recalls costosos | Bebidas |
| Planta de procesamiento cárnico | 5 instalaciones migradas de registros manuales a TxA con monitoreo de saneamiento en tiempo real | Cárnicos / Digitalización |
| Red de cervecerías artesanales | Screening de genes horA/horC para garantizar perfiles de sabor consistentes | Cervecería / Calidad |
| Exportador de frutas | 300% más puntos de muestreo sin aumentar el presupuesto con protocolos multiplex | Produce / Eficiencia |

---

## 10. Presencia Global

### Hubs Regionales (con laboratorio propio)
- **Chicago, Estados Unidos**
- **Bruselas, Bélgica**
- **Ciudad de México, México**
- **Santiago, Chile**

### Cobertura internacional (sin hub local — servicio remoto o partners)
- **Américas:** Brasil, Argentina, Colombia, Perú
- **Europa:** España, Francia, Alemania, Italia
- **Asia Pacífico:** China, Japón, Australia, Corea del Sur, India
- **Medio Oriente & África:** EAU, Sudáfrica, Arabia Saudita, Egipto

---

## 11. Certificaciones

| Certificación | Estado |
|---|---|
| ISO/IEC 17025 | Acreditado |
| ISO 13485 | Acreditado |
| AOAC-RI PTM (Zero-Risk EMP Kit) | Pendiente |

---

## 12. Industrias Objetivo

- Alimentos listos para consumir (RTE)
- Procesamiento de lácteos
- Carne y aves de corral
- Bebidas (jugos, refrescos, cerveza, vino)
- Servicios de monitoreo ambiental
- Exportadores de frutas y vegetales
- Chocolatería y confitería (matrices complejas: cacao, especias)

---

## 13. Flujo de Trabajo Industrial (Paso a Paso)

1. **Entrega de producto** — Confianza absoluta en cada lote.
2. **Toma de muestra** — Resultados ultrarrápidos desde hisopos y esponjas, pre o post-saneamiento.
3. **Selección de protocolo** — ZERO (sin enriquecimiento) o XPRESS.
4. **Detección** — Salmonella spp., Listeria spp., Enterobacterias, L. monocytogenes y más.
5. **Decisión** — Todos los kits se integran con TxA para protección avanzada basada en IA.

---

## 14. Preguntas Frecuentes (FAQ)

**¿Necesito un laboratorio BSL-2 para usar los kits de TAAG?**
No. El kit Zero-Risk EMP inactiva los patógenos en el momento del muestreo con el buffer de lisis propietario, eliminando el riesgo biológico.

**¿Cuánto tiempo tarda en estar operativo el sistema?**
La instalación y entrenamiento toma menos de 48 horas. Solo se necesita una persona y 3 m² de mesada.

**¿Los kits funcionan con mi termociclador actual?**
Los kits son compatibles con Bio-Rad CFX96, Applied Biosystems 7500 y AriaMx. Consultar para otros modelos.

**¿Puedo detectar múltiples patógenos en una sola reacción?**
Sí. Los kits Ampliora™ utilizan tecnología multiplex diseñada por IA (MILA™) para detectar varios targets simultáneamente sin perder sensibilidad.

**¿Qué pasa si mi target no está en el catálogo estándar?**
TAAG ofrece el servicio MILA™ Custom Development para diseñar kits a medida para cualquier cepa o target, con validación gratuita en tus matrices.

**¿Qué es TxA y cómo se integra con los kits?**
TxA es una plataforma de software de IA que digitaliza tu planta, predice puntos de riesgo y transforma los resultados de laboratorio en decisiones preventivas automatizadas. Se integra nativamente con Elevia™ y Ampliora™.

**¿En qué países tienen presencia?**
TAAG tiene hubs propios en Chicago (EE.UU.), Bruselas (Bélgica), Ciudad de México y Santiago de Chile. Atienden clientes en más de 20 países en Américas, Europa, Asia Pacífico y Medio Oriente.

**¿Cómo puedo hablar con un experto?**
Desde [la web](/) puedes agendar una reunión directamente con el equipo de TAAG.

---

*Documento generado desde el código fuente del sitio taag.bio — Marzo 2026.*
