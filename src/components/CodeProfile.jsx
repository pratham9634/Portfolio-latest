import React from "react";

export default function CodeProfile() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-transparent font-sans text-gray-300">
      <CoderProfileCard />
    </div>
  );
}

const coderData = {
  name: "Pratham Petwal",
  role: "Full Stack Developer",
  education: "Shivalik college of Engineering(B.TECH CSE[2023-2027])",
  seniority: "Fresher",
  location: "India",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "CSS",
    "Figma",
    "GitHub",
    "HTML",
    "Node.js",
    "Express",
    "MongoDB",
    "Git","MySQL","C++","Python", "DSA","GSAP","Framer Motion","Shadcn UI", "Redux","Zustand","Vercel","Netlify","Postman","more..."
  ]
};

const CoderProfileCard = () => {
  return (
    <div className="max-w-xl w-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
      
      {/* Code Editor Top Bar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-500 font-mono">coder.js</div>
      </div>

      {/* Code Area */}
      <div className="relative px-4 py-6 bg-gray-900">
        {/* Background Glows */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>

        <div className="flex">
          {/* Line Numbers */}
          <div className="hidden md:flex flex-col pr-4 text-gray-500 font-mono text-xs select-none">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="leading-relaxed opacity-50">{i + 1}</div>
            ))}
          </div>

          {/* Code Content */}
          <code className="font-mono text-xs sm:text-sm md:text-base w-full space-y-1">
            <div>
              <span className="text-pink-500">const</span>{" "}
              <span className="text-indigo-400">coder</span>{" "}
              <span className="text-pink-500">=</span>{" "}
              <span className="text-gray-400">&#123;</span>
            </div>

            <div className="pl-6">
              <span className="text-indigo-300">name:</span>{" "}
              <span className="text-green-400">'{coderData.name}'</span>,
            </div>

            <div className="pl-6">
              <span className="text-indigo-300">role:</span>{" "}
              <span className="text-green-400">'{coderData.role}'</span>,
            </div>

            <div className="pl-6">
              <span className="text-indigo-300">education:</span>{" "}
              <span className="text-green-400">'{coderData.education}'</span>,
            </div>

            <div className="pl-6">
              <span className="text-indigo-300">seniority:</span>{" "}
              <span className="text-green-400">'{coderData.seniority}'</span>,
            </div>

            <div className="pl-6">
              <span className="text-indigo-300">location:</span>{" "}
              <span className="text-green-400">'{coderData.location}'</span>,
            </div>

            <div className="pl-6">
              <span className="text-indigo-300">skills:</span>{" "}
              <span className="text-gray-400">[</span>
              <div className="pl-6 flex flex-wrap gap-1">
                {coderData.skills.map((skill, index) => (
                  <span key={index} className="text-green-400">
                    '{skill}'{index < coderData.skills.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
              <span className="text-gray-400">]</span>
            </div>

            <div>
              <span className="text-gray-400">&#125;</span>;
            </div>
          </code>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 text-xs text-gray-500 font-mono">
        <span>UTF-8</span>
        <span>JavaScript</span>
        <span>Ln 12, Col 2</span>
      </div>
    </div>
  );
};
