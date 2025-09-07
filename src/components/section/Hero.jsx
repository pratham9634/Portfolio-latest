"use client";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "../nurui/button";
import { ArrowRight, CodeXml, Github, Linkedin, Mail } from "lucide-react";
import { GradientGridHero } from "../nurui/gradient-grid-hero";
import { MorphingTextBadge } from "../magicui/morphing-text";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const handleScroll = (href) => {
  const target = document.querySelector(href);
  if (target) {
    gsap.to(window, {
      duration: 2,
      scrollTo: {
        y: target,
        offsetY: 30,
      },
      ease: "power2.inOut",
    });
  }
};

const Hero = () => {
  const texts = [
    "Full Stack Developer",
    "Software Engineer",
    "Open Source Contributor",
    "Performance-Driven Coder",
    "Lifelong Learner",
    "Tech Enthusiast",
    "Problem Solver",
  ];

  return (
    <section className="relative pb-20 min-h-screen flex items-center justify-center">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-60 h-60 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-60 h-60 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left content with animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left"
        >
          <MorphingTextBadge texts={texts} />

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Hi, I&apos;m{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Pratham Petwal
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto md:mx-0">
            🚀 I’m a developer who loves blending code, creativity, and problem-solving to craft impactful digital experiences. Always curious and growth-driven, I strive to turn ideas into elegant, user-friendly solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start">
            <button onClick={() => handleScroll("#projects")} className="w-full sm:w-auto">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 flex items-center gap-2 justify-center w-full">
                View Projects <ArrowRight className="h-4 w-4" />
              </Button>
            </button>

            <button onClick={() => handleScroll("#contact")} className="w-full sm:w-auto">
              <Button variant="outline" className="border-zinc-700 text-pink-500 justify-center w-full">
                Contact Me
              </Button>
            </button>
          </div>

          <div className="flex gap-3 pt-4 justify-center md:justify-start flex-wrap">
            {[
              { href: "https://github.com/pratham9634", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/prathampetwal", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:prathmpetwal100@gmail.com", icon: Mail, label: "Email" },
              { href: "https://leetcode.com/u/prathampetwal100/", icon: CodeXml, label: "Leetcode" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Button>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right content */}
        <div className="flex justify-center">
          <GradientGridHero />
        </div>
      </div>
    </section>
  );
};

export default Hero;
