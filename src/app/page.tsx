import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Achievements from "@/components/Achievements";
import Method from "@/components/Method";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Achievements />
        <Method />
        <Projects />
        <Experience />
        <Stack />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
