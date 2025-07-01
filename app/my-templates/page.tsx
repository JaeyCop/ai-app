"use client";

import React, { useState, useEffect } from "react";

interface Template {
  id: number;
  name: string;
  prompt: string;
}

export default function MyTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customTemplates") || "[]");
    setTemplates(stored);
  }, []);

  const saveTemplate = () => {
    if (!name || !prompt) return;
    const newTemplate = { id: Date.now(), name, prompt };
    const updated = [newTemplate, ...templates];
    setTemplates(updated);
    localStorage.setItem("customTemplates", JSON.stringify(updated));
    setName("");
    setPrompt("");
  };

  const deleteTemplate = (id: number) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    localStorage.setItem("customTemplates", JSON.stringify(updated));
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-ai-black via-gray-900 to-ai-black">
      <h1 className="text-3xl font-bold mb-6 text-ai-green">My Templates</h1>
      <div className="mb-8 bg-ai-black border border-ai-green rounded-lg p-6">
        <h2 className="text-xl font-semibold text-ai-green mb-2">Create New Template</h2>
        <input
          className="w-full mb-2 p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Template Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          className="w-full mb-2 p-2 rounded bg-gray-700 text-white border border-gray-600"
          placeholder="Prompt Template (e.g. Write a blog post about {topic} for {audience})"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={4}
        />
        <button onClick={saveTemplate} className="bg-ai-green text-white px-4 py-2 rounded hover:bg-green-700 font-semibold transition-colors">Save Template</button>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-ai-green mb-4">Saved Templates</h2>
        {templates.length === 0 && <div className="text-gray-400">No templates yet.</div>}
        <ul className="space-y-4">
          {templates.map(t => (
            <li key={t.id} className="bg-gray-800 border border-ai-green rounded-lg p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold text-ai-orange">{t.name}</div>
                <div className="text-gray-300 text-sm mt-1">{t.prompt}</div>
              </div>
              <button onClick={() => deleteTemplate(t.id)} className="bg-ai-red text-white px-3 py-1 rounded hover:bg-red-700 font-semibold transition-colors">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
