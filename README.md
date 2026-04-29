# Saiyan Blog - Mini Blog React

## Descripcion

Mini-blog tematico de Dragon Ball Z desarrollado con **React + Vite + React Router + TypeScript**. Permite explorar articulos sobre batallas, personajes y transformaciones del universo Saiyan. Los datos se consumen desde una API REST hosteada en Vercel.

## Nivel

Proyecto desarrollado apuntando a nivel: **Senior**

## Tecnologias usadas

- **React 19** - Libreria de UI
- **Vite 8** - Bundler y dev server
- **TypeScript** - Tipado estatico
- **React Router DOM v6** - Enrutamiento SPA
- **Axios** - Cliente HTTP para consumo de API
- **Tailwind CSS** - Estilos utilitarios
- **Context API** - Estado global (favoritos, tema oscuro/claro)
- **PropTypes** - Validacion de props en runtime
- **prop-types** - Libreria de validacion de tipos en runtime

## Backend

El backend esta hosteado en **Vercel**, tal como fue recomendado por Erick. La API REST sirve los datos de los articulos y se encuentra disponible en:

```
https://backend-blog-mu.vercel.app
```

### Endpoints disponibles

| Metodo | Endpoint     | Descripcion                  |
|--------|-------------|------------------------------|
| GET    | `/items`    | Obtener todos los articulos  |
| GET    | `/items/:id`| Obtener un articulo por ID   |

El backend fue desplegado en Vercel para evitar depender de un servidor local (`json-server`) y permitir que el proyecto funcione completamente al clonarlo sin configuracion adicional de backend.

## Rutas de la aplicacion

| Ruta           | Componente  | Descripcion                     |
|----------------|-------------|---------------------------------|
| `/`            | Home        | Pagina principal con hero y ultimos articulos |
| `/items`       | Items       | Listado completo con busqueda y filtros |
| `/items/:id`   | ItemDetail  | Detalle de un articulo (usa `useParams`) |
| `*`            | NotFound    | Pagina 404 para rutas no encontradas |

## Instalacion y ejecucion

### Requisitos previos

- Node.js (v18 o superior)
- npm

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/blog-react.git
cd blog-react
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el proyecto:

```bash
npm run dev
```

El proyecto se abrira en `http://localhost:5173`. No es necesario levantar un backend local ya que la API esta hosteada en Vercel.

## Funcionalidades

### Requerimientos base cumplidos

- Proyecto generado con `npm create vite@latest`
- Uso de `react-router-dom` v6
- 3+ rutas: Home (`/`), Listado (`/items`), Detalle (`/items/:id`)
- Datos separados de los componentes (capa API en `src/api/api.ts`)
- Uso de `useParams` en pagina de detalle
- Navegacion exclusivamente con `<Link>`, sin etiquetas `<a>`

### Funcionalidades adicionales (Mid)

- **Pagina 404**: Ruta catch-all (`*`) con pagina personalizada y boton de regreso
- **Busqueda en listado**: Filtro en tiempo real por titulo, descripcion y categoria
- **Filtro de favoritos**: Toggle para mostrar solo articulos marcados como favoritos
- **Boton de articulo aleatorio**: Navega a un articulo al azar desde el listado
- **Tema oscuro/claro**: Toggle de tema persistente en localStorage
- **Estado global**: Context API para favoritos y preferencias de tema
- **Skeleton loaders**: Indicadores de carga mientras se obtienen los datos
- **Diseno responsivo**: Grids adaptativos para movil, tablet y escritorio

### Funcionalidades Senior

- **Estado global con Context API**: Contexto de tema (claro/oscuro) con toggle en Navbar, persistido en localStorage. Tambien maneja favoritos globalmente.
- **PropTypes en runtime**: Validacion de props con `prop-types` en los componentes `Card`, `SearchBar` y `PriceTag`, ademas de las interfaces TypeScript.
- **API REST externa**: Datos consumidos desde backend hosteado en Vercel (`https://backend-blog-mu.vercel.app`). No hay datos hardcodeados en componentes.
- **Descuentos automaticos**: 10% de descuento si el articulo tiene mas de 1 ano de antiguedad o pertenece a una categoria especial (Transformaciones, Villanos). Se muestra precio original tachado y precio final.

## Componentes reutilizables y sus Props

### Card

Muestra un articulo como tarjeta con imagen, categoria, titulo, descripcion, precio y favorito.

| Prop | Tipo | Requerido | Descripcion |
|------|------|-----------|-------------|
| `item` | `Item` | Si | Objeto del articulo a mostrar |

### SearchBar

Input de busqueda con icono de lupa.

| Prop | Tipo | Requerido | Descripcion |
|------|------|-----------|-------------|
| `value` | `string` | Si | Valor actual del input |
| `onChange` | `(value: string) => void` | Si | Callback al cambiar el texto |

### PriceTag

Muestra precio con o sin descuento. Reutilizado en Card y ItemDetail.

| Prop | Tipo | Requerido | Descripcion |
|------|------|-----------|-------------|
| `discount` | `DiscountInfo` | Si | Objeto con info de descuento |
| `size` | `'sm' \| 'lg'` | No | Tamano del texto (default: `sm`) |

### ButtonRandom

Boton que navega a un articulo aleatorio. No recibe props, usa `useAppContext()` y `useNavigate()`.

## Estructura del proyecto

```
src/
  api/          # Cliente Axios y funciones de consumo de API
  assets/       # Imagenes y recursos estaticos
  components/   # Componentes reutilizables (Navbar, Card, SearchBar, ButtonRandom, PriceTag)
  context/      # Context API - Estado global de la aplicacion
  pages/        # Paginas principales (Home, Items, ItemDetail, NotFound)
  router/       # Configuracion de rutas con React Router
  types/        # Interfaces de TypeScript (Item, DiscountInfo)
  utils/        # Utilidades (discount.ts - logica de descuentos)
```

## Demo

Video demostrativo disponible en la carpeta `/demo` mostrando las 3 rutas funcionando, el toggle de tema, filtro de busqueda, articulo aleatorio y descuentos automaticos.

> **Nota**: Si el archivo de video aun no existe, se debe grabar mostrando: navegacion por las 3 rutas (`/`, `/items`, `/items/:id`), la pagina 404, el filtro de busqueda, el boton aleatorio, el toggle de tema oscuro/claro, y los descuentos automaticos.

## Notas importantes

- No se utilizan etiquetas `<a>`, unicamente `<Link>` de React Router
- Los datos NO estan hardcodeados dentro de los componentes
- `node_modules` esta en `.gitignore` y no se incluye en el repositorio
- El proyecto esta listo para clonar y ejecutar sin configuracion adicional

## Autor

Angel Sanabria
