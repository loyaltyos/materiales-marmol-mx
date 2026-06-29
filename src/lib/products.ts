export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  step: number;
  exampleQuantity: number;
  description: string;
  image: string;
  imagePosition: string;
};

export const products: Product[] = [
  {
    id: "compra-minima-produccion",
    name: "Compra mínima de prueba",
    category: "Prueba",
    price: 100,
    unit: "compra",
    step: 1,
    exampleQuantity: 1,
    description:
      "Producto utilizado para validar la integración de Mercado Pago en producción.",
    image: "/products/compra-minima.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "cemento-gris-50kg",
    name: "Cemento Gris 50kg",
    category: "Cementos",
    price: 289,
    unit: "saco",
    step: 1,
    exampleQuantity: 20,
    description: "Cemento de uso general para obra residencial y civil.",
    image: "/products/cemento-gris.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "cemento-blanco-50kg",
    name: "Cemento Blanco 50kg",
    category: "Cementos",
    price: 379,
    unit: "saco",
    step: 1,
    exampleQuantity: 10,
    description: "Acabados, junteos y trabajos que requieren color claro.",
    image: "/products/cemento-blanco.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "ladrillo-rojo",
    name: "Ladrillo Rojo",
    category: "Ladrillos y Blocks",
    price: 12,
    unit: "pieza",
    step: 50,
    exampleQuantity: 100,
    description: "Pieza tradicional para muros, bardas y remodelacion.",
    image: "/products/ladrillo-rojo.jpg",
    imagePosition: "50% 55%",
  },
  {
    id: "block-hueco",
    name: "Block Hueco 12x20x40",
    category: "Ladrillos y Blocks",
    price: 29,
    unit: "pieza",
    step: 25,
    exampleQuantity: 100,
    description: "Block hueco para muros de carga ligera y cerramientos.",
    image: "/products/block-hueco.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "block-macizo",
    name: "Block Macizo",
    category: "Ladrillos y Blocks",
    price: 34,
    unit: "pieza",
    step: 25,
    exampleQuantity: 100,
    description: "Material solido para trabajos de mayor resistencia.",
    image: "/products/block-macizo.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "varilla-38",
    name: "Varilla 3/8",
    category: "Acero y Varillas",
    price: 245,
    unit: "pieza",
    step: 10,
    exampleQuantity: 50,
    description: "Acero de refuerzo para castillos, dalas y losas.",
    image: "/products/varilla-38.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "varilla-12",
    name: "Varilla 1/2",
    category: "Acero y Varillas",
    price: 389,
    unit: "pieza",
    step: 10,
    exampleQuantity: 50,
    description: "Refuerzo estructural para obra civil y edificacion.",
    image: "/products/varilla-12.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "malla-electrosoldada",
    name: "Malla Electrosoldada",
    category: "Acero y Varillas",
    price: 1990,
    unit: "rollo",
    step: 1,
    exampleQuantity: 2,
    description: "Malla para firmes, pisos industriales y losas ligeras.",
    image: "/products/malla-electrosoldada.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "arena-m3",
    name: "Arena por m3",
    category: "Agregados",
    price: 890,
    unit: "m3",
    step: 1,
    exampleQuantity: 5,
    description: "Agregado fino para mezcla, aplanados y morteros.",
    image: "/products/arena.jpg",
    imagePosition: "50% 45%",
  },
  {
    id: "grava-m3",
    name: "Grava por m3",
    category: "Agregados",
    price: 990,
    unit: "m3",
    step: 1,
    exampleQuantity: 5,
    description: "Agregado grueso para concreto y bases de obra.",
    image: "/products/grava.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "tezontle-m3",
    name: "Tezontle por m3",
    category: "Agregados",
    price: 1190,
    unit: "m3",
    step: 1,
    exampleQuantity: 5,
    description: "Material ligero para rellenos, jardineria y nivelaciones.",
    image: "/products/tezontle.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "impermeabilizante-19l",
    name: "Impermeabilizante 19L",
    category: "Impermeabilizantes",
    price: 1990,
    unit: "cubeta",
    step: 1,
    exampleQuantity: 3,
    description: "Proteccion para azoteas, cubiertas y superficies expuestas.",
    image: "/products/impermeabilizante.jpg",
    imagePosition: "50% 55%",
  },
  {
    id: "carretilla",
    name: "Carretilla",
    category: "Herramientas",
    price: 1790,
    unit: "pieza",
    step: 1,
    exampleQuantity: 2,
    description: "Equipo esencial para movimiento interno de materiales.",
    image: "/products/carretilla.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "pala-cuadrada",
    name: "Pala Cuadrada",
    category: "Herramientas",
    price: 389,
    unit: "pieza",
    step: 1,
    exampleQuantity: 4,
    description: "Herramienta para carga, mezcla y preparacion de terreno.",
    image: "/products/pala-cuadrada.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "pico-profesional",
    name: "Pico Profesional",
    category: "Herramientas",
    price: 499,
    unit: "pieza",
    step: 1,
    exampleQuantity: 3,
    description: "Pico de trabajo pesado para excavacion y demolicion ligera.",
    image: "/products/pico-profesional.jpg",
    imagePosition: "50% 55%",
  },
];

export const categories = Array.from(
  new Set(products.map((product) => product.category)),
);

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);

export const getUnitLabel = (unit: string, quantity: number) =>
  quantity === 1 ? unit : `${unit}s`;
