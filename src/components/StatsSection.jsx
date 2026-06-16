"use client";
import React from "react";
import { motion } from "motion/react";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  Star,
} from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-[#060608] text-white overflow-hidden flex flex-col items-center justify-start pt-16 px-4">
      {/* 1. Top Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm text-xs sm:text-sm text-zinc-400 mb-8 z-10 animate-fade-in">
        <span className="text-base">💼</span>
        <span className="text-white font-semibold">50,000+</span>
        NEW JOBS THIS MONTH
      </div>

      {/* 2. Main Heading & Subtitle */}
      <div className="max-w-3xl text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent mb-6"
        >
          Find Your Dream Job Today
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </motion.p>
      </div>

      {/* 3. Search Bar Container */}
      <div className="w-full max-w-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-2 shadow-2xl z-10 mb-6">
        {/* Job Title Input */}
        <div className="w-full flex items-center gap-3 px-3 py-2 border-b border-zinc-800 sm:border-b-0 sm:border-r border-zinc-800">
          <Search className="text-zinc-500 shrink-0" size={20} />
          <input
            type="text"
            placeholder="Job title, skill or company"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>

        {/* Location Input */}
        <div className="w-full flex items-center gap-3 px-3 py-2">
          <MapPin className="text-zinc-500 shrink-0" size={20} />
          <input
            type="text"
            placeholder="Location or Remote"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
        </div>

        {/* Search Button */}
        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 transition-colors p-3 rounded-xl flex items-center justify-center shrink-0 group">
          <Search
            className="text-white group-hover:scale-105 transition-transform"
            size={20}
          />
        </button>
      </div>

      {/* 4. Trending Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-zinc-500 z-10 mb-24">
        <span>Trending Position</span>
        {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map(
          (tag) => (
            <button
              key={tag}
              className="px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800/60 text-zinc-300 hover:border-zinc-700 hover:text-white transition-all"
            >
              {tag}
            </button>
          ),
        )}
      </div>

      {/* 5. Globe Background & Middle Text Section */}
      {/* 5. Globe Background & Middle Text Section */}
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center mb-16 py-24">
        {/* Globe Background */}
        <div
          className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-70 -z-10"
          style={{
            backgroundImage: "url('/globe.png')",
          }}
        />

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl -z-20" />

        {/* Text */}
        <div className="text-center z-10 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-200 tracking-wide">
            Assisting over{" "}
            <span className="text-white font-semibold">15,000 job seekers</span>
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-400 mt-1.5 tracking-wide">
            find their dream positions.
          </p>
          <motion.p animate={{ rotate: -36 }}>remote jobs</motion.p>
        </div>
      </div>

      {/* 6. Stats Cards Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 z-10 pb-16 mt-auto">
        {/* Card 1 - Active Jobs */}
        <div className="bg-[#0b0c10]/90 border border-zinc-900 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-zinc-800 transition-all group">
          <div className="p-2.5 bg-zinc-900/50 border border-zinc-800 w-fit rounded-xl text-zinc-400 group-hover:text-blue-500 transition-colors">
            <Briefcase size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight mb-1">50K</div>
            <div className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
              Active Jobs
            </div>
          </div>
        </div>

        {/* Card 2 - Companies */}
        <div className="bg-[#0b0c10]/90 border border-zinc-900 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-zinc-800 transition-all group">
          <div className="p-2.5 bg-zinc-900/50 border border-zinc-800 w-fit rounded-xl text-zinc-400 group-hover:text-blue-500 transition-colors">
            <Building2 size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight mb-1">12K</div>
            <div className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
              Companies
            </div>
          </div>
        </div>

        {/* Card 3 - Job Seekers */}
        <div className="bg-[#0b0c10]/90 border border-zinc-900 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-zinc-800 transition-all group">
          <div className="p-2.5 bg-zinc-900/50 border border-zinc-800 w-fit rounded-xl text-zinc-400 group-hover:text-blue-500 transition-colors">
            <Users size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight mb-1">2M</div>
            <div className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
              Job Seekers
            </div>
          </div>
        </div>

        {/* Card 4 - Satisfaction Rate */}
        <div className="bg-[#0b0c10]/90 border border-zinc-900 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between min-h-[160px] hover:border-zinc-800 transition-all group">
          <div className="p-2.5 bg-zinc-900/50 border border-zinc-800 w-fit rounded-xl text-zinc-400 group-hover:text-blue-500 transition-colors">
            <Star size={20} />
          </div>
          <div>
            <div className="text-3xl font-bold tracking-tight mb-1">97%</div>
            <div className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
              Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
