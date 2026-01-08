/// <reference types="react" />
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MachineNavigation from "@/components/MachineNavigation";
import MachineSection from "@/components/MachineSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import {
  forestalMachines,
  excavatorMachines,
  retroMachines,
  loaderMachines,
  excavatorFlorestais,
} from "@/data/machines";

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MachineNavigation />
        <MachineSection
          id="florestal"
          title="Máquinas Florestais"
          machines={forestalMachines}
        />
        <MachineSection
          id="escavadeiras"
          title="Escavadeiras"
          machines={excavatorMachines}
        />
        <MachineSection
          id="retro"
          title="Retroescavadeiras"
          machines={retroMachines}
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
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
