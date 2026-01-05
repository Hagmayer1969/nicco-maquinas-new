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
    image: "/images/picador-bruno.jpg",
  },
  {
    id: "skidder-cat",
    name: "SKIDDER CAT 545C",
    description:
      "Ano 2013 com 17.300 horas, trocado sistema de injeção e bomba, todas as revisões feitas pela...",
    price: "R$ 850.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-florestal",
    name: "ESCAVADEIRA FLORESTAL HYUNDAI",
    description:
      "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-florestal",
    name: "ESCAVADEIRA FLORESTAL HYUNDAI",
    description:
      "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-florestal",
    name: "ESCAVADEIRA FLORESTAL HYUNDAI",
    description:
      "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-florestal",
    name: "ESCAVADEIRA FLORESTAL HYUNDAI",
    description:
      "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-florestal",
    name: "ESCAVADEIRA FLORESTAL HYUNDAI",
    description:
      "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-florestal",
    name: "ESCAVADEIRA FLORESTAL HYUNDAI",
    description:
      "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-florestal",
    name: "ESCAVADEIRA FLORESTAL HYUNDAI",
    description:
      "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
];

export const excavatorMachines: Machine[] = [
  {
    id: "escavadeira-hyundai",
    name: "ESCAVADEIRA HYUNDAI R180 LC-9",
    description:
      "Ano 2024 com apenas 293 horas, equipada com cabeçota feller marca Metacort MFD 1000. Local...",
    price: "R$ 950.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
  {
    id: "escavadeira-cat-320",
    name: "ESCAVADEIRA CAT 320D",
    description:
      "Ano 2019, 8.500 horas, motor e hidráulica revisados, pronta para trabalho pesado.",
    price: "R$ 680.000,00",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop",
  },
];

export const retroMachines: Machine[] = [
  {
    id: "retro-cat-416e",
    name: "RETROESCAVADEIRA CAT 416E",
    description: "Máquina potente e confiável para construção civil",
    price: "CONSULTE-NOS",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&h=400&fit=crop",
  },
];

export const loaderMachines: Machine[] = [
  {
    id: "pa-carregadeira-cat",
    name: "02 PÁS VOLVO L90F",
    description: "ANOS 2015, ÚNICO DONO, COM 29.000 E 35.000 HORAS, COM GRUA FRONTAL J DE SOUZA, HISTÓRICO DE MANUTENÇÃO, Á TODA PROVA!",
    price: "Valor Unitário: R$430.000,00",
    image: "/images/pa-carre/pa01.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "02 PÁS VOLVO L110F",
    description: "ANO 2011 E 2013 COM GARRA FRONTAL PARA  CARREGAMENTO DE TORAS E GRUA POSSUEM CONCHA 100% OPERACIONAIS, 30.000 HORAS E 52.000 HORAS,  REVISÕES PERIÓDICAS EM DIA",
    price: "Valor Unitário: R$450.000,00",
    image: "/images/pa-carre/pa02.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "PÁ CAT 924H",
    description: "ANO 2009, 100% OPERACIONAL, OBS: POSSUI GARFO, VALOR DI GARFO A PARTE",
    price: "Valor Unitário: R$2.890,00",
    image: "/images/pa-carre/pa03.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "PÁ VOLVO L50D",
    description: "ANO 2000, PRECISA FAZER O MOTOR, MOTOR ESTÁ COMPLETO NA MÁQUINA",
    price: "Valor Unitário: R$65.000,00",
    image: "/images/pa-carre/pa04.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "PÁ XCMG LW300F",
    description: "ANO 2010, MOTOR NOVO, COM CONCHA E GARFO",
    price: "Valor Unitário: R$220.000,00",
    image: "/images/pa-carre/pa05.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "PÁ SDLG MODELO LG836L ",
    description: "ANO 2014 MOTOR NOVO COM COCNHA E GARFO",
    price: "Valor Unitário: R$260.000,00",
    image: "/images/pa-carre/pa06.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "02 PÁS CAT 938H ",
    description: "ANOS 2008 REVISADAS UMA COM MOTOR NOVO HÁ UM ANO, 39.000 E 51.000 HORAS OPERAVAM EM USINA DE CANA",
    price: "Valor Unitário: R$260.000,00",
    image: "/images/pa-carre/pa07.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "PÁ CARREGADEIRA MARCA FORZA ",
    description: "ANO 2023 COM 1.900 HORAS PESO OPERACIONAL 5.200 KILOS, CAÇAMBA 1 M3",
    price: "Valor Unitário: R$150.000,00",
    image: "/images/pa-carre/pa08.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "PÁ SDLG MODELO L936 ",
    description: "ANO 2022 COM APENAS 762 HORAS, SEMINOVA!",
    price: "Valor Unitário: R$425.000,00",
    image: "/images/pa-carre/pa09.jpeg",
  },
  {
    id: "pa-carregadeira-cat",
    name: "PÁ CASE W20E",
    description: "ANO 2008 E 100% OPERACIONAL",
    price: "Valor Unitário: R$229.000,00",
    image: "/images/pa-carre/pa10.jpeg",
  },
];
