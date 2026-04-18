"use client";

import { useState, useEffect } from "react";
import {
  generateExcuse,
  situations,
  tones,
  type Situation,
  type Tone,
} from "@/lib/excuses";

export default function ExcuseForm() {
  const [situation, setSituation] = useState<Situation>("late");
  const [tone, setTone] = useState<Tone>("formal");
  const [excuse, setExcuse] = useState("");
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  // Restore last excuse from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lastExcuse");
    if (saved) setExcuse(saved);
  }, []);

  // Persist excuse to localStorage
  useEffect(() => {
    if (excuse) localStorage.setItem("lastExcuse", excuse);
  }, [excuse]);

  const handleGenerate = async () => {
    setAnimate(false);
    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch("/api/excuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation, tone }),
      });
      const data = await res.json();

      if (data.excuse) {
        setExcuse(data.excuse);
      } else {
        // Fallback to local templates
        setExcuse(generateExcuse(situation, tone));
      }
    } catch {
      // Fallback to local templates on network error
      setExcuse(generateExcuse(situation, tone));
    } finally {
      setLoading(false);
      setAnimate(true);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(excuse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Situation */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          What happened?
        </label>
        <div className="flex flex-wrap gap-2">
          {situations.map((s) => (
            <button
              key={s.value}
              onClick={() => setSituation(s.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                situation === s.value
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Pick a tone
        </label>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                tone === t.value
                  ? "bg-purple-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "⏳ Generating..." : "✨ Generate Excuse"}
      </button>

      {/* Output */}
      {excuse && (
        <div
          className={`relative p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-all duration-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <p className="text-lg text-gray-800 dark:text-gray-100 italic leading-relaxed">
            &ldquo;{excuse}&rdquo;
          </p>
          <button
            onClick={handleCopy}
            className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            {copied ? "✅ Copied!" : "📋 Copy to clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}
