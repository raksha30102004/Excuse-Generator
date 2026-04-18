"use client";

import { useState, useEffect } from "react";
import {
  generateFromInput,
  tones,
  type Tone,
} from "@/lib/excuses";

export default function ExcuseForm() {
  const [input, setInput] = useState("");
  const [tone, setTone] = useState<Tone>("casual");
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
    if (!input.trim()) return;
    setAnimate(false);
    setLoading(true);
    setCopied(false);

    try {
      const res = await fetch("/api/excuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, tone }),
      });
      const data = await res.json();

      if (data.excuse) {
        setExcuse(data.excuse);
      } else {
        setExcuse(generateFromInput(input, tone));
      }
    } catch {
      setExcuse(generateFromInput(input, tone));
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
      {/* Input */}
      <div>
        <label className="block text-sm font-medium mb-2 text-rose-500 dark:text-rose-300">
          💭 Describe your situation
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="e.g. I need to skip my friend's birthday party this weekend..."
          rows={3}
          className="w-full px-4 py-3 rounded-2xl border border-pink-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-pink-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none transition-all shadow-sm"
        />
      </div>

      {/* Tone */}
      <div>
        <label className="block text-sm font-medium mb-2 text-rose-500 dark:text-rose-300">
          🎭 Pick a tone
        </label>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                tone === t.value
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 scale-105"
                  : "bg-pink-50 dark:bg-gray-700 text-rose-500 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-600 border border-pink-200 dark:border-gray-600"
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
        disabled={loading || !input.trim()}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "⏳ Generating..." : "✨ Generate Excuse"}
      </button>

      {/* Output */}
      {excuse && (
        <div
          className={`relative p-5 bg-gradient-to-br from-white to-pink-50/50 dark:from-gray-800 dark:to-gray-800 border border-pink-200/60 dark:border-gray-700 rounded-2xl shadow-sm transition-all duration-300 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <p className="text-lg text-gray-700 dark:text-gray-100 italic leading-relaxed">
            &ldquo;{excuse}&rdquo;
          </p>
          <button
            onClick={handleCopy}
            className="mt-3 text-sm font-medium text-pink-500 dark:text-pink-400 hover:underline cursor-pointer"
          >
            {copied ? "✅ Copied!" : "📋 Copy to clipboard"}
          </button>
        </div>
      )}
    </div>
  );
}
