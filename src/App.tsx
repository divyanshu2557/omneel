import { Ambient } from "./components/Ambient";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Architecture from "./components/Architecture";
import Language from "./components/Language";
import OS from "./components/OS";
import Agents from "./components/Agents";
import Intent from "./components/Intent";
import Scenarios from "./components/Scenarios";
import Vision from "./components/Vision";
import Roadmap from "./components/Roadmap";
import Access from "./components/Access";
import Footer from "./components/Footer";
import { useRevealObserver } from "./lib/hooks";

export default function App() {
  useRevealObserver();

  return (
    <div className="relative min-h-screen bg-ivory-100">
      <Ambient />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Architecture />
        <Language />
        <OS />
        <Agents />
        <Intent />
        <Scenarios />
        <Vision />
        <Roadmap />
        <Access />
      </main>
      <Footer />
    </div>
  );
}
