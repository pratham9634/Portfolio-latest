"use client";
import React from "react";
import { motion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

export default function ProjectCard({ image, tags, title, description, github, live }) {
  const isUpcoming = !github || !live; // Check if it's an upcoming project

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="relative border w-[45vw] border-[#3C397A] overflow-hidden rounded-2xl flex flex-col bg-[#201A50]/40 backdrop-blur-md shadow-lg hover:shadow-indigo-500/20 transition-all duration-200"
    >
      {/* Project Image */}
      <div className="relative w-full h-40 overflow-hidden z-1">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201A50]/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow relative">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <span className="inline-block mt-1.5 px-3 py-0.5 glass text-indigo-300 rounded-full text-[10px] font-medium mb-2 border border-indigo-400/30 animate-pulse">
          {tags}
        </span>
        <h3 className="text-md font-semibold text-white mb-1">{title}</h3>
        <p className="text-white/70 mb-3 leading-relaxed text-xs line-clamp-3">{description}</p>

        {/* Buttons or Upcoming Text */}
        <div className="flex justify-center items-center mt-auto">
          {isUpcoming ? (
            <div className="text-indigo-400 font-semibold text-xs animate-pulse">
              Upcoming...
            </div>
          ) : (
            <div className="flex justify-between items-center w-full gap-4">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition flex items-center text-xs font-medium px-3 py-1.5 rounded-lg border border-indigo-400/30 hover:bg-indigo-500/10"
              >
                GitHub
                <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-0.5 text-green-400 hover:text-green-200 transition text-xs font-medium px-3 py-1.5 rounded-lg border border-green-400/30 hover:bg-green-500/10 animate-pulse"
              >
                Live <SquareArrowOutUpRight className="text-white" height={15} width={20} />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
