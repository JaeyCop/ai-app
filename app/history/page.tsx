'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import ContentDisplay from '@/components/ContentDisplay';

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const storedHistory = JSON.parse(localStorage.getItem('generatedContentHistory') || '[]');
    setHistory(storedHistory);
  };

  const clearHistory = () => {
    localStorage.removeItem('generatedContentHistory');
    setHistory([]);
    setSelectedEntry(null);
    showToast('History cleared!', 'info');
  };

  const viewEntry = (entry: any) => {
    setSelectedEntry(entry);
  };

  const closeContentModal = () => {
    setSelectedEntry(null);
  };

  const restoreToGenerator = (entry: any) => {
    localStorage.setItem('restoredContent', JSON.stringify(entry));
    showToast('Content restored! Go to Generate page to use it.', 'success');
  };

  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold text-ai-green mb-8 text-center">Content Generation History</h2>
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        {history.length > 0 ? (
          <>
            <button onClick={clearHistory} className="mb-6 bg-ai-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
              Clear History
            </button>
            <ul className="space-y-4">
              {history.map((item) => (
                <li key={item.id} className="bg-gray-700 p-4 rounded-md flex justify-between items-center text-gray-200 hover:bg-gray-600 transition-colors cursor-pointer" onClick={() => viewEntry(item)}>
                  <span>Keyword: <span className="font-semibold text-ai-orange">{item.keyword}</span></span>
                  <span className="text-sm text-gray-400">{new Date(item.date).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-center text-gray-400">No content has been generated yet. Go to the "Generate" page to create some!</p>
        )}

        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
              <button onClick={closeContentModal} className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300" aria-label="Close">&times;</button>
              <h3 className="text-2xl font-bold text-ai-green mb-4">Generated Content</h3>
              <div className="mb-2 text-ai-orange font-semibold">{selectedEntry.keyword}</div>
              <div className="mb-4 text-xs text-gray-400">{new Date(selectedEntry.date).toLocaleString()}</div>
              <ContentDisplay content={selectedEntry.content} isLoading={false} />
              <button
                className="mt-4 bg-ai-orange text-white px-4 py-2 rounded hover:bg-ai-red transition-colors text-sm font-semibold"
                onClick={() => restoreToGenerator(selectedEntry)}
              >
                Restore to Generator
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}