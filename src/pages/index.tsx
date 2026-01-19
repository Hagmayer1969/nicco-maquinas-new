/// <reference types="react" />
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MachineNavigation from "@/components/MachineNavigation";
import MachineSection from "@/components/MachineSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import {
  excavatorMachines,
  rolo,
  loaderMachines,
  excavatorFlorestais,
  motoNiveladora,
  caminhãoForaDeEstrada,
  tratorDeEsteiras,
  caminhãoCaçamba,
  
} from "@/data/machines";

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MachineNavigation />
        <MachineSection
          id="escavadeiras"
          title="Escavadeiras"
          machines={excavatorMachines}
        />
        <MachineSection
          id="rolo"
          title="Rolos Compactadores "
          machines={rolo}
        />
        <MachineSection
          id="pa-carregadeira"
          title="Pá-Carregadeiras"
          machines={loaderMachines}
        />
        <MachineSection
          id="escavadeiras-florestais"
          title="Escavadeiras Florestais"
          machines={excavatorFlorestais}
        />
        <MachineSection
          id="motoniveladora"
          title="MOTONIVELADORA"
          machines={motoNiveladora}
        />
         <MachineSection
          id="caminhãoForaDeEstrada "
          title="CAMINHÃO FORA DE ESTRADA"
          machines={caminhãoForaDeEstrada}
        />
         <MachineSection
          id="tratorDeEsteiras"
          title="TRATOR DE ESTEIRA"
          machines={tratorDeEsteiras}
        />
         <MachineSection
          id="caminhãoCaçamba"
          title="CAMINHÃO CAÇAMBA"
          machines={caminhãoCaçamba}
        />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
