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
    id: "cemento-gris-50kg",
    name: "Cemento Gris 50kg",
    category: "Cementos",
    price: 289,
    unit: "saco",
    step: 1,
    exampleQuantity: 20,
    description: "Cemento de uso general para obra residencial y civil.",
    image: "/hero-industrial.png",
    imagePosition: "45% 55%",
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
    image: "/hero-industrial.png",
    imagePosition: "42% 60%",
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
    image: "/hero-industrial.png",
    imagePosition: "58% 54%",
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
    image: "/hero-industrial.png",
    imagePosition: "60% 54%",
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
    image: "/hero-industrial.png",
    imagePosition: "62% 56%",
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
    image: "/hero-industrial.png",
    imagePosition: "72% 44%",
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
    image: "/hero-industrial.png",
    imagePosition: "75% 44%",
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
    image: "/hero-industrial.png",
    imagePosition: "70% 48%",
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
    image: "/hero-industrial.png",
    imagePosition: "35% 68%",
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
    image: "/hero-industrial.png",
    imagePosition: "30% 70%",
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
    image: "/hero-industrial.png",
    imagePosition: "28% 64%",
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
    image: "/hero-industrial.png",
    imagePosition: "48% 58%",
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
    image: "/hero-industrial.png",
    imagePosition: "82% 58%",
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
    image: "/hero-industrial.png",
    imagePosition: "80% 58%",
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
    image: "/hero-industrial.png",
    imagePosition: "78% 58%",
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
