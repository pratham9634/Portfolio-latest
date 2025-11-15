"use client";
import React, { useEffect, useRef } from "react";
import ProjectCard from "../ProjectCard";
import { motion } from "framer-motion";
const Projects = () => {
  const frontendCanvasRef = useRef(null);
  const fullstackCanvasRef = useRef(null);
  const upcomingCanvasRef = useRef(null);

  // ✅ Project Data
  const frontendProjects = [
    {
      image: "/virtual-classroom-frontened.jpeg",
      tags: "Frontend",
      title: "Virtual Classroom",
      description:
        "An online learning platform with real-time chat, announcements, and file sharing for teachers and students.",
      github: "https://github.com/pratham9634/virtual-classroom-frontened",
      live: "https://virtual-classroom-frontened.vercel.app/",
    },
    {
      image: "https://thfvnext.bing.com/th/id/OIP.yG2PURpnqkR0h-AGwaoXMAHaEK?w=330&h=185&c=7&r=0&o=5&cb=thfvnext&dpr=1.3&pid=1.7",
      tags: "Frontend",
      title: "Pokedex",
      description:
        "A responsive Pokedex app to explore and search Pokémon with detailed stats and abilities using public APIs.",
      github: "https://github.com/pratham9634/POKEDEX",
      live: "https://pratham9634.github.io/POKEDEX/",
    },
    {
      image: "https://th.bing.com/th/id/OIP.WbnOVlxY0aPBrTPYm1tAqgHaEo?w=269&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      tags: "Frontend",
      title: "Dice Game",
      description:
        "An interactive dice game built with React showcasing random outcomes, score tracking, and state management.",
      github: "https://github.com/pratham9634/DICE_GAME-REACT-PROJECT",
      live: "https://game6dice.netlify.app/",
    },
    {
      image: "/MoviesWatch.jpeg",
      tags: "Frontend",
      title: "Movies Watch",
      description:
        "A movie discovery app using the TMDB API with search, trending movies, and detailed information about each movie.",
      github: "https://github.com/pratham9634/MOVIE-WEBSITE-PROJECT",
      live: "https://moviesworld2u.netlify.app/",
    },
  ];

  const fullstackProjects = [
    {
      image: "/Campus_cart.jpeg",
      tags: "Full Stack",
      title: "Campus Cart",
      description:
        "Campus Cart is a marketplace for college students to buy, sell, and bid on second-hand items. It offers secure authentication, item listings, and a bidding system, helping students exchange goods easily while promoting sustainability and community within their campus.",
      github: "https://github.com/pratham9634/CampusCart",
      live: "https://campus-cart.vercel.app/",
    },
    {
      image: "https://tse3.mm.bing.net/th/id/OIP.mBiUh6nShdoFAAdSd8R4eQHaHa?r=0&cb=thfvnext&pid=ImgDet&w=199&h=199&c=7&dpr=1.3&o=7&rm=3",
      tags: "Full Stack",
      title: "Real-Time Chat Application",
      description:
        "A real-time chat app with WebSockets and MongoDB supporting instant messaging, authentication, and dark/light mode.",
      github: "https://github.com/pratham9634/CHATON",
      live: "https://chat-on-4fl9.onrender.com/login",
    },
    
    {
      image: "/Tool_Station.jpeg",
      tags: "Full Stack",
      title: "Tools Station",
      description:
        "A collection of productivity tools including Youtube Playlist Duration & Quick File Sharing, built with extensibility in mind.",
      github: "https://github.com/pratham9634/Tools",
      live: "https://tools-xi-five.vercel.app/",
    }
  ];

  const upcomingProjects = [
    {
      image: "/UI_LIbrary.jpeg",
      tags: "Upcoming",
      title: "UI Component Library",
      description:
        "A modern React + Tailwind CSS component library featuring pre-built, reusable UI components. Future versions will include AI-powered component generation from prompts.",
      github: "", // placeholder
      live: "", // placeholder
    },
    {
      image: "/Ai_Interview.png",
      tags: "Upcoming",
      title: "AI-Powered Interview Platform",
      description:
        "An intelligent mock interview platform that generates AI-driven questions, evaluates answers in real-time, and provides detailed feedback to help candidates prepare effectively.",
      github: "", // placeholder
      live: "", // placeholder
    },
  ];

  // 🔥 Wave Canvas Animation
  const initWaveCanvas = (canvasRef) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let time = 0;

    const waveData = Array.from({ length: 8 }).map(() => ({
      value: Math.random() * 0.5 + 0.1,
      targetValue: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));

    function resizeCanvas() {
      if (!canvas) return;
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    }

    function updateWaveData() {
      waveData.forEach((data) => {
        if (Math.random() < 0.01) data.targetValue = Math.random() * 0.7 + 0.1;
        const diff = data.targetValue - data.value;
        data.value += diff * data.speed;
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waveData.forEach((data, i) => {
        const freq = data.value * 7;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const nx = (x / canvas.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py =
            Math.sin(px * 10 + time) *
            Math.cos(px * 2) *
            freq *
            0.1 *
            ((i + 1) / 8);
          const y = ((py + 1) * canvas.height) / 2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const intensity = Math.min(1, freq * 0.3);
        const r = 79 + intensity * 100;
        const g = 70 + intensity * 130;
        const b = 229;
        ctx.lineWidth = 1 + i * 0.3;
        ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.5)`;
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    }

    function animate() {
      time += 0.02;
      updateWaveData();
      draw();
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  };

  useEffect(() => {
    const cleanup1 = initWaveCanvas(frontendCanvasRef);
    const cleanup2 = initWaveCanvas(fullstackCanvasRef);
    const cleanup3 = initWaveCanvas(upcomingCanvasRef);
    return () => {
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
      cleanup3 && cleanup3();
    };
  }, []);

  return (
    <div className="relative w-full h-full mt-20 mb-20 z-0" id="projects">
      {/* Main Heading */}
      <div className="text-4xl font-extrabold text-white tracking-wide text-center mb-16 relative z-10">
        <span className="text-indigo-300">My</span> Projects
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mx-auto mt-3 rounded-full" />
      </div>

      {/* Section Template */}
      {[
        { ref: frontendCanvasRef, title: "Frontend Projects", color: "text-indigo-300", data: frontendProjects },
        { ref: fullstackCanvasRef, title: "Full Stack Projects", color: "text-pink-300", data: fullstackProjects },
        { ref: upcomingCanvasRef, title: "Upcoming Projects 🚀", color: "text-purple-300", data: upcomingProjects },
      ].map((section, idx) => (
        <section
  key={idx}
  className="relative w-full min-h-[60vh] mb-24 px-4 sm:px-8 lg:px-16"
>
  {/* 🔥 Canvas behind content */}
  <canvas
    ref={section.ref}
    className="absolute inset-0 w-full h-full z-0 pointer-events-none"
  />

  {/* Content above canvas */}
  <div className="relative z-10">
    <h2
      className={`text-2xl sm:text-3xl font-semibold ${section.color} mb-10 `}
    >
      {section.title}
    </h2>

    {/* ✅ Responsive flex grid */}
    <div className="flex flex-wrap justify-center gap-6">
      {section.data.map((project, idx) => (
  <motion.div
    key={idx}
    className="w-full sm:w-[45%] lg:w-[40%] flex justify-center flex-grow"
    animate={{
      y: ["0%", "-3%", "0%"], // floating effect
      rotate: ["0deg", "1deg", "0deg"], // subtle rotation
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  >
    <ProjectCard {...project} />
  </motion.div>
))}
    </div>
  </div>
</section>

      ))}
    </div>
  );
};

export default Projects;
