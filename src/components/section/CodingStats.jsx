import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const platforms = [
  {
    name: "LeetCode",
    problems: 900,
    contests: 30,
    rating: 1800,
    profileUrl: "https://leetcode.com/prathampetwal100",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
  },
  {
    name: "GeeksForGeeks",
    problems: 400,
    contests: 15,
    rating: 1700,
    profileUrl: "https://www.geeksforgeeks.org/user/prathampemda3/",
    logoUrl: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png",
  },
  {
    name: "Codeforces",
    problems: 100,
    contests: 15,
    rating: 1500,
    profileUrl: "https://codeforces.com/profile/pratham100",
    logoUrl: "https://sta.codeforces.com/s/71020/images/codeforces-logo.png",
  },
];

const CodingStats = () => {
  return (
    <div className="relative w-full mx-auto max-w-4xl border border-gray-700 rounded-lg shadow-lg p-6 space-y-8 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <h3 className="text-2xl font-bold text-white text-center mb-6">📊 Coding Stats</h3>

      <div className="flex flex-wrap justify-center gap-6">
        {platforms.map((platform, index) => (
          <StatCard key={index} platform={platform} />
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ platform }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.5 });

  const [problemCount, setProblemCount] = useState(0);
  const [contestCount, setContestCount] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start("visible");

      // Count-up animation
      let problemTarget = platform.problems;
      let contestTarget = platform.contests;
      let ratingTarget = platform.rating;

      let steps = 50;
      let problemIncrement = Math.ceil(problemTarget / steps);
      let contestIncrement = Math.ceil(contestTarget / steps);
      let ratingIncrement = Math.ceil(ratingTarget / steps);

      let p = 0,
        c = 0,
        r = 0;

      const interval = setInterval(() => {
        p = Math.min(p + problemIncrement, problemTarget);
        c = Math.min(c + contestIncrement, contestTarget);
        r = Math.min(r + ratingIncrement, ratingTarget);

        setProblemCount(p);
        setContestCount(c);
        setRatingCount(r);

        if (p === problemTarget && c === contestTarget && r === ratingTarget) {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    } else {
      // Reset counts when out of view
      setProblemCount(0);
      setContestCount(0);
      setRatingCount(0);
    }
  }, [inView, platform, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-64 border border-cyan-400 rounded-lg p-5 hover:scale-105 transition-transform duration-300 bg-gray-900"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={platform.logoUrl}
          alt={platform.name}
          className="w-16 h-16 object-contain rounded-full border border-gray-600"
        />
      </div>

      {/* Name */}
      <h4 className="text-center text-xl font-semibold text-white mb-4">
        {platform.name}
      </h4>

      {/* Stats */}
      <div className="space-y-4 text-center">
        <div>
          <p className="text-2xl font-bold text-indigo-300">{problemCount}+</p>
          <p className="text-sm text-gray-400">Solved Problems</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-indigo-300">{contestCount}+</p>
          <p className="text-sm text-gray-400">Contests</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-indigo-300">{ratingCount}+</p>
          <p className="text-sm text-gray-400">Rating</p>
        </div>
      </div>

      {/* View Profile Button */}
      <div className="mt-6 text-center">
        <a
          href={platform.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-105 transform transition-all duration-300"
        >
          View Profile
        </a>
      </div>
    </motion.div>
  );
};

export default CodingStats;
