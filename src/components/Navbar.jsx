"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Home,
  UserRound,
  Briefcase,
  Code2,
  FileText,
  Mail,
} from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "#home",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "group-hover:text-blue-400",
  },
  {
    icon: UserRound,
    label: "About",
    href: "#about",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "group-hover:text-orange-400",
  },
  {
    icon: Briefcase,
    label: "Projects",
    href: "#projects",
    gradient:
      "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(124,58,237,0.06) 50%, rgba(91,33,182,0) 100%)",
    iconColor: "group-hover:text-purple-400",
  },
  {
    icon: Code2,
    label: "Skills",
    href: "#skills",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "group-hover:text-green-400",
  },
  {
    icon: FileText,
    label: "Certifications",
    href: "#certifications",
    gradient:
      "radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(202,138,4,0.06) 50%, rgba(161,98,7,0) 100%)",
    iconColor: "group-hover:text-yellow-400",
  },
  {
    icon: Mail,
    label: "Contact",
    href: "#contact",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "group-hover:text-red-400",
  },
];

// Animations
const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.4, type: "spring", stiffness: 250, damping: 20 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 18,
  duration: 0.45,
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = (href) => {
    const target = document.querySelector(href);
    if (target) {
      const distance = Math.abs(target.getBoundingClientRect().top);
      gsap.to(window, {
        duration: Math.min(2, distance / 1000), // adjust duration based on distance
        scrollTo: {
          y: target,
          offsetY: 30,
        },
        ease: "power2.inOut",
      });
    }
  };

  // Track current section based on scroll
  useEffect(() => {
    const sections = menuItems.map((item) =>
      document.querySelector(item.href)
    );

    const onScroll = () => {
      let current = "";
      sections.forEach((section, index) => {
        if (
          section &&
          window.scrollY >= section.offsetTop - 80 // adjust based on navbar height
        ) {
          current = menuItems[index].href;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // Initial check

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="p-2 sm:p-3 rounded-2xl flex justify-center items-center relative border border-transparent transition-colors bg-black/50 backdrop-blur-md"
      initial="initial"
      whileHover={{ borderColor: "rgba(255,255,255,0.4)" }}
    >
      <motion.div
        className="absolute -inset-2 rounded-3xl z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        }}
        variants={navGlowVariants}
      />

      <ul className="flex flex-wrap justify-center gap-2 sm:gap-3 relative z-10">
        {menuItems.map(({ label, href, gradient, icon: Icon, iconColor }) => {
          const isActive = href === activeSection;
          return (
            <motion.li key={label} className="relative">
              <motion.div
                className="block rounded-xl group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
                  variants={glowVariants}
                  style={{ background: gradient }}
                />

                <motion.a
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(href);
                  }}
                  href={href}
                  aria-label={label}
                  className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 relative z-10 bg-transparent transition-colors rounded-xl text-sm sm:text-base cursor-pointer ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white"
                  } group-hover:bg-white/10`}
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom",
                  }}
                >
                  <Icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
                      iconColor
                    }`}
                  />
                  <span className="font-medium">{label}</span>
                </motion.a>

                <motion.a
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll(href);
                  }}
                  href={href}
                  aria-label={label}
                  className="flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 absolute inset-0 z-10 bg-transparent text-white/80 group-hover:text-white transition-colors rounded-xl text-sm sm:text-base cursor-pointer"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    transform: "rotateX(90deg)",
                  }}
                >
                  <Icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
                      iconColor
                    }`}
                  />
                  <span className="font-medium">{label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
