import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/section/Hero";
import About from "./components/section/About";
import Skills from "./components/section/Skills";
import Projects from "./components/section/Projects";
import Certification from "./components/section/Certification";
import Contact from "./components/section/Contact";
import GlowLine from "./components/GlowLine";

const sections = [
  { id: "hero", component: <Hero /> },
  { id: "about", component: <About /> },
  { id: "skills", component: <Skills /> },
  { id: "projects", component: <Projects /> },
  { id: "certifications", component: <Certification /> },
  { id: "contact", component: <Contact /> },
];

const App = () => {
  return (
    <>
      <Navbar />
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          {section.component}

          {/* Add GlowLine after each section except the last one */}
          {index < sections.length  && (
            <div className="relative w-full">
              <GlowLine
                orientation="horizontal"
                position="50%"
                color="green"
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default App;
