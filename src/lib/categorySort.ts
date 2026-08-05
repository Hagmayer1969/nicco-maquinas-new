export const sortSections = (sections: any[]) => {
  const getWeight = (name: string) => {
    const n = name.toLowerCase();
    
    // Top priority (starts from Escavadeiras)
    if (n.includes('escavadeira') && !n.includes('retro')) return 1;
    if (n.includes('retroescavadeira')) return 2;
    if (n.includes('carregadeira')) return 3;
    if (n.includes('motoniveladora') || n.includes('moto niveladora')) return 4;
    if (n.includes('rolo')) return 5;
    if (n.includes('trator')) return 6;
    
    // Lowest priority (Caminhões articulados further down)
    if (n.includes('caminh') && n.includes('articulado')) return 99;
    
    // Default weight for others
    return 50;
  };

  return [...sections].sort((a, b) => {
    const weightA = getWeight(a.nome);
    const weightB = getWeight(b.nome);
    
    if (weightA !== weightB) {
      return weightA - weightB;
    }
    
    // If weights are equal, sort alphabetically
    return a.nome.localeCompare(b.nome);
  });
};
