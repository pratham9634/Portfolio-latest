"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "C", level: 85, category: "programming" },
  { name: "C++", level: 85, category: "programming" },
  { name: "Python", level: 80, category: "programming" },
  { name: "JavaScript (ES6+)", level: 90, category: "frontend" },
  { name: "HTML5", level: 95, category: "frontend" },
  { name: "CSS3", level: 90, category: "frontend" },
  { name: "React.js", level: 90, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" }, 
  { name: "Next.js", level: 80, category: "frontend" },
  { name: "JWT Authentication", level: 75, category: "backend" },
  { name: "RESTful API Development", level: 80, category: "backend" },
  { name: "MongoDB", level: 80, category: "backend" },
  { name: "MongoDB Atlas", level: 75, category: "backend" },
  { name: "MySQL", level: 70, category: "backend" },
  { name: "Git", level: 90, category: "tools" },
  { name: "GitHub", level: 90, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Postman", level: 85, category: "tools" },
  { name: "Chrome DevTools", level: 80, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="relative flex m-10 items-center justify-center min-h-screen w-full p-5 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          My <span className="text-blue-400">Skills</span>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mx-auto mt-3 rounded-full" />
        </h2>

        {/* Category buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 capitalize border",
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-transparent shadow-lg"
                  : "bg-transparent text-gray-300 border-gray-700 hover:border-blue-400 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skill cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <SkillCard key={key} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setWidth(skill.level);
    } else {
      setWidth(0);
    }
  }, [inView, skill.level, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white/5 dark:bg-black/40 p-6 rounded-2xl border border-gray-700/60 shadow-md hover:shadow-xl hover:border-blue-400/60 hover:scale-[1.02] transition-transform duration-200"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="text-left mb-4">
        <h3 className="font-semibold text-lg text-white">{skill.name}</h3>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-700/40 h-2 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: width + "%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full origin-left"
        />
      </div>

      <div className="text-right mt-1">
        <span className="text-sm text-gray-400">{skill.level}%</span>
      </div>
    </motion.div>
  );
};

export default Skills;
