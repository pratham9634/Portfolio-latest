"use client";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ContactForm = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone_number: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate async submission (replace with actual API call)
    setTimeout(() => {
      // For demonstration, we'll assume it always succeeds
      setStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        phone_number: "",
        message: ""
      });

      // Clear success message after a few seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <motion.form
      ref={ref}
      variants={formVariants}
      initial="hidden"
      animate={controls}
      onSubmit={handleSubmit}
      className="w-full grid lg:grid-cols-2 gap-6 bg-black/40 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl"
    >
      {/* First Name */}
      <fieldset className="space-y-2">
        <label className="capitalize font-semibold text-indigo-300">
          First name
        </label>
        <input
          placeholder="Your first name"
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-black/70 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 outline-none transition-all"
        />
      </fieldset>

      {/* Last Name */}
      <fieldset className="space-y-2">
        <label className="capitalize font-semibold text-indigo-300">
          Last name
        </label>
        <input
          placeholder="Your last name"
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-black/70 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 outline-none transition-all"
        />
      </fieldset>

      {/* Company */}
      <fieldset className="space-y-2 col-span-full">
        <label className="capitalize font-semibold text-indigo-300">
          Company name
        </label>
        <input
          placeholder="Your organization (optional)"
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-black/70 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 outline-none transition-all"
        />
      </fieldset>

      {/* Email */}
      <fieldset className="space-y-2 col-span-full">
        <label className="capitalize font-semibold text-indigo-300">
          Email
        </label>
        <input
          placeholder="Your email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-black/70 border border-white/10 focus:border-pink-400 focus:ring-2 focus:ring-pink-500 text-white placeholder-gray-400 outline-none transition-all"
        />
      </fieldset>

      {/* Phone */}
      <fieldset className="space-y-2 col-span-full">
        <label className="capitalize font-semibold text-indigo-300">
          Phone
        </label>
        <input
          placeholder="Your phone number (optional)"
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-black/70 border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 outline-none transition-all"
        />
      </fieldset>

      {/* Message */}
      <fieldset className="space-y-2 col-span-full">
        <label className="capitalize font-semibold text-indigo-300">
          Message
        </label>
        <textarea
          placeholder="Tell us what you need or suggest!"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-black/70 border border-white/10 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 outline-none transition-all resize-none"
        />
      </fieldset>

      {/* Submit Button */}
      <div className="col-span-full flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className={`relative px-8 py-3 rounded-xl text-sm font-medium text-white 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            hover:opacity-90 hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] 
            transition-all duration-300
            ${status === "loading" ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {status === "loading" ? "Sending..." : "Send Message 🚀"}
        </button>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 font-semibold"
          >
            Message sent successfully!
          </motion.p>
        )}
      </div>
    </motion.form>
  );
};

export default ContactForm;
