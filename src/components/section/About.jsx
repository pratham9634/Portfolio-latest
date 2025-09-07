"use client";
import React, { useEffect, useRef } from "react";
import CodeProfile from "../CodeProfile";
import CodingStats from "./CodingStats";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const codeProfileRef = useRef(null);
  const leftContentRef = useRef(null); // NEW: Ref for the left side content

  useEffect(() => {
    // Animate Right Side: CodeProfile card
    gsap.fromTo(
      codeProfileRef.current,
      { opacity: 0, y: 50, rotation: -3 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: codeProfileRef.current,
          start: "top 80%",
        },
      }
    );

    // NEW: Animate Left Side Content with a stagger effect
    const leftElements = gsap.utils.toArray(leftContentRef.current.children);
    gsap.fromTo(
      leftElements,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2, // This creates the cool, sequential animation
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: "top 80%",
        },
      }
    );

    // Hover tilt effect for CodeProfile (remains the same)
    const cp = codeProfileRef.current;
    cp.addEventListener("mousemove", (e) => {
      const rect = cp.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      gsap.to(cp, {
        rotationY: x,
        rotationX: -y,
        transformPerspective: 600,
        transformOrigin: "center center",
        duration: 0.3,
      });
    });
    cp.addEventListener("mouseleave", () => {
      gsap.to(cp, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen text-gray-300 p-6 flex flex-col items-center justify-center"
    >
      {/* Main content grid */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side – About Content (Now Animated) */}
        <div
          ref={leftContentRef} // NEW: Attaching the ref here
          className="flex flex-col justify-center space-y-6 px-4 text-center md:text-left max-w-lg mx-auto"
        >
          <h2 className="text-3xl font-bold text-pink-400">About Me</h2>
          <p className="text-gray-300 leading-relaxed">
            Hello! I’m{" "}
            <span className="text-indigo-400 font-semibold">Pratham Petwal</span>
            , a passionate{" "}
            <span className="text-indigo-300 font-medium">
              Full Stack Developer
            </span>{" "}
            with a strong focus on building scalable and efficient web
            applications. I love solving complex problems, optimizing
            performance, and writing clean, maintainable code that delivers
            seamless user experiences. My expertise lies in technologies such
            as{" "}
            <span className="text-indigo-300 font-semibold">
              React, Next.js, TailwindCSS, Node.js, MongoDB
            </span>
            , and more.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Whether it's designing intuitive interfaces, implementing robust
            backend services, or debugging challenging issues, I approach every
            task with{" "}
            <span className="text-indigo-300 font-semibold">
              critical thinking
            </span>
            ,{" "}
            <span className="text-indigo-300 font-semibold">creativity</span>,
            and a keen attention to detail. I am constantly learning new tools
            and frameworks, ensuring that I stay updated with the latest trends
            and best practices in web development.
          </p>
          <div>
            <a
              href="https://drive.google.com/file/d/1hAXTH8xqUb6tfISNPv1eB4kL0gkPdIVT/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 hover:scale-105 transform transition-all duration-300"
            >
              📄 View My Resume
            </a>
          </div>
        </div>

        {/* Right Side – Code Profile Card (Animated) */}
        <div
          ref={codeProfileRef}
          className="flex items-center justify-center px-4 cursor-grab hover:cursor-grabbing"
        >
          <CodeProfile />
        </div>
      </div>

      {/* Coding Stats Card – static, no animation */}
      <div className="w-full m-10 flex justify-center px-4">
        <CodingStats />
      </div>
    </section>
  );
};

export default About;