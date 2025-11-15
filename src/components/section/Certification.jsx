"use client";
import React from "react";
import MagicContainer from "../MagicCard";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const certifications = [
  {
    title: "Introduction to Machine Learning",
    provider: "NPTEL",
    imgSrc: "/Nptel_Machine_Learning.jpeg",
    link: "https://drive.google.com/file/d/1hTjBUXnw88dQ6j3tAlPCPY8AxSrqAP8J/view?usp=drivesdk"
  },
  {
    title: "Mongo Db Developer's Toolkit Certificate",
    provider: "GFG",
    imgSrc: "/gfg_mongodb.jpg",
    link: "https://drive.google.com/file/d/1hKWfv-dNh9PaBENN15jMRwURaPJP84X4/view?usp=drivesdk"
  }
];

const Certification = () => {
  return (
    <section id="certifications" className="relative pt-10 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-4xl font-extrabold text-pink-300 tracking-wide text-center mb-16 relative z-10">
        Certifications
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mx-auto mt-3 rounded-full" />
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-20">
        {certifications.map((cert, index) => (
          <AnimatedCertCard key={index} cert={cert} />
        ))}
      </div>
    </section>
  );
};

const AnimatedCertCard = ({ cert }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 120, damping: 20 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className="w-full max-w-sm"
    >
      <MagicContainer className="flex flex-col items-center justify-center text-center rounded-xl shadow-lg backdrop-blur-md border border-white/10 hover:border-indigo-500/50 transition-all duration-500 hover:scale-[1.02]">
        <div className="p-8 sm:p-10 bg-black/90 rounded-2xl relative overflow-hidden group">
          {/* Added pointer-events-none here */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-indigo-400/40 transition duration-500 pointer-events-none"></div>

          <div className="flex justify-center mb-6">
            <img
              src={cert.imgSrc}
              alt={`${cert.title} Certification`}
              className="w-full h-full rounded-2xl object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-indigo-300 mb-2 tracking-wide">
            {cert.title}
          </h3>

          <p className="text-gray-400 text-sm mb-6">
            Issued by {cert.provider}
          </p>

          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium text-white shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 pointer-events-auto"
          >
            View Certificate
          </a>
        </div>
      </MagicContainer>
    </motion.div>
  );
};

export default Certification;