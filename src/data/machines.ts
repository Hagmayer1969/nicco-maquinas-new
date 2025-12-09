export interface Machine {
  id: string;
  name: string;
  description: string;
  price?: string;
  image?: string;
  specs?: Record<string, string>;
}

export const forestalMachines: Machine[] = [
  {
    id: "picador-bruno",
    name: "PICADOR FLORESTAL BRUNO THUNDER",
    description: "Thunder ano 2024, com 1000 horas",
    price: "R$ 2.590.000,00",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&h=400&fit=crop",
  },
  {
    id: "skidder-cat",
    name: "SKIDDER CAT 545C",
    description: "Ano 2013 com 17.300 horas, trocado sistema de injeção e bomba, todas as revisões feitas pela...",
    price: "R$ 850.000,00",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-florestal",
    name: "ESCAVADEIRA FLORESTAL HYUNDAI",
    description: "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
];

export const excavatorMachines: Machine[] = [
  {
    id: "escavadeira-hyundai",
    name: "ESCAVADEIRA HYUNDAI R180 LC-9",
    description: "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-cat-320",
    name: "ESCAVADEIRA CAT 320D",
    description: "Ano 2019, 8.500 horas, motor e hidráulica revisados, pronta para trabalho pesado.",
    price: "R$ 680.000,00",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
];

export const retroMachines: Machine[] = [
  {
    id: "retro-cat-416e",
    name: "RETROESCAVADEIRA CAT 416E",
    description: "Máquina potente e confiável para construção civil",
    price: "CONSULTE-NOS",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&h=400&fit=crop",
  },
];

export const loaderMachines: Machine[] = [
  {
    id: "pa-carregadeira-cat",
    name: "PÁ-CARREGADEIRA CAT 950H",
    description: "Ideal para movimentação de materiais pesados",
    price: "CONSULTE-NOS",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
];
