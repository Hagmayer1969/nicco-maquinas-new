import React from 'react';

export interface MachineData {
  id: string;
  name?: string;
  nome?: string;
  description?: string;
  descricao?: string;
  price?: string;
  valor_da_maquina?: string;
  image?: string;
  url_imagem?: string;
  specs?: Record<string, string>;
}

interface MachineModalProps {
  machine: MachineData | null;
  isOpen: boolean;
  onClose: () => void;
  getWhatsappLink: (machine: MachineData) => string;
}

const MachineModal: React.FC<MachineModalProps> = ({ machine, isOpen, onClose, getWhatsappLink }) => {
  if (!isOpen || !machine) return null;

  const displayName = machine.nome || machine.name;
  const displayDesc = machine.descricao || machine.description;
  const displayPrice = machine.valor_da_maquina || machine.price;
  const displayImg = machine.url_imagem || machine.image;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-darkGray rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-600 text-white rounded-full p-2 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Imagem */}
        <div className="w-full md:w-1/2 bg-gray-900 min-h-[300px] flex items-center justify-center">
          {displayImg ? (
            <img 
              src={displayImg} 
              alt={displayName} 
              className="w-full h-full object-contain max-h-[60vh] md:max-h-[90vh]"
            />
          ) : (
            <div className="text-gray-500">Sem Imagem</div>
          )}
        </div>

        {/* Detalhes */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col text-white">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{displayName}</h2>
          
          <div className="flex-grow">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Descrição</h4>
            <p className="text-gray-300 text-base mb-6 leading-relaxed whitespace-pre-wrap">
              {displayDesc || "Nenhuma descrição disponível."}
            </p>

            {machine.specs && Object.keys(machine.specs).length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Especificações</h4>
                <div className="space-y-1">
                  {Object.entries(machine.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-700 pb-1">
                      <span className="text-gray-400">{key}</span>
                      <span className="font-semibold text-gray-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            {displayPrice && (
              <p className="text-2xl font-bold text-primary mb-4">
                {displayPrice}
              </p>
            )}

            <a href={getWhatsappLink(machine)} target="_blank" rel="noopener noreferrer">
              <button className="w-full bg-primary hover:bg-yellow-500 text-dark py-3 px-4 rounded-lg font-bold transition shadow-lg flex items-center justify-center gap-2 text-lg">
                <img
                  src="/images/wats.png"
                  className="w-8 h-8 object-contain"
                  alt="WhatsApp"
                />
                <span>CONSULTAR AGORA</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineModal;
