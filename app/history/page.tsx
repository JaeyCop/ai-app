'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Trash2, 
  Eye, 
  RotateCcw, 
  Filter,
  Clock,
  FileText,
  Download,
  Copy,
  X,
  AlertCircle,
  CheckCircle,
  Sparkles,
  ArrowUpDown,
  Grid,
  List
} from 'lucide-react';
import { HistoryEntry } from '@/app/types';
import { SORT_OPTIONS } from '@/app/constants';
import { useToast } from '@/context/ToastContext';
import ContentDisplay from '@/components/ContentDisplay';
import { useHistory } from '@/hooks/useHistory';

export default function HistoryPage() {
  const {
    history,
    filteredAndSortedHistory,
    allTags,
    selectedEntry,
    setSelectedEntry,
    searchTerm,
    setSearchTerm,
    sortBy,
    sortOrder,
    handleSort,
    viewMode,
    setViewMode,
    selectedTags,
    toggleTag,
    setSelectedTags,
    isLoading,
    entryToDelete,
    handleDeleteRequest,
    handleCancelDelete,
    handleConfirmDelete,
  } = useHistory();
  
  const { addToast } = useToast();

  const viewEntry = (entry: HistoryEntry) => {
    setSelectedEntry(entry);
  };

  const closeContentModal = () => {
    setSelectedEntry(null);
  };

  const restoreToGenerator = (entry: HistoryEntry) => {
    localStorage.setItem('restoredContent', JSON.stringify(entry));
    addToast('Content restored! Go to Generate page to use it.', 'success');
    closeContentModal();
  };

  const exportEntry = (entry: HistoryEntry) => {
    const dataStr = JSON.stringify(entry, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `seo-content-${entry.keyword.replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    addToast('Content exported successfully!', 'success');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      addToast('Copied to clipboard!', 'success');
    }).catch(() => {
      addToast('Failed to copy to clipboard', 'error');
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ai-black via-gray-900 to-ai-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ai-green mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your content history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ai-black via-gray-900 to-ai-black">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ai-green/10 to-ai-blue/10 blur-3xl"></div>
        <div className="relative px-6 py-16 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-ai-green mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ai-green to-ai-blue bg-clip-text text-transparent">
                  Content History
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Manage and revisit all your AI-generated SEO content
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-ai-surface border border-ai-border rounded-xl p-6 text-center">
                <FileText className="h-8 w-8 text-ai-green mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{history.length}</div>
                <div className="text-gray-400">Total Entries</div>
              </div>
              <div className="bg-ai-surface border border-ai-border rounded-xl p-6 text-center">
                <Sparkles className="h-8 w-8 text-ai-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {history.reduce((acc, entry) => acc + (entry.wordCount || 0), 0).toLocaleString()}
                </div>
                <div className="text-gray-400">Words Generated</div>
              </div>
              <div className="bg-ai-surface border border-ai-border rounded-xl p-6 text-center">
                <Calendar className="h-8 w-8 text-ai-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {history.length > 0 ? Math.ceil((Date.now() - new Date(history[history.length - 1]?.date).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                </div>
                <div className="text-gray-400">Days Active</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ai-surface border border-ai-border rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-ai-black border border-ai-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ai-green focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm hidden md:inline">Sort by:</span>
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSort(option)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                      sortBy === option
                        ? 'bg-ai-green text-white'
                        : 'bg-ai-black text-gray-400 hover:text-white'
                    }`}
                  >
                    {option === 'date' && <Calendar className="h-4 w-4" />}
                    {option === 'keyword' && <FileText className="h-4 w-4" />}
                    {option === 'wordCount' && <Sparkles className="h-4 w-4" />}
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                    {sortBy === option && (
                      <ArrowUpDown className={`h-3 w-3 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                ))}
              </div>

              {/* View Mode */}
              <div className="flex bg-ai-black border border-ai-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-ai-green text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-ai-green text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Clear History */}
              {history.length > 0 && (
                <button
                  onClick={() => handleDeleteRequest('all')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </button>
              )}
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-ai-border">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-400 text-sm">Filter by tags:</span>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-ai-green text-white'
                          : 'bg-ai-black text-gray-400 hover:text-white border border-ai-border'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          {filteredAndSortedHistory.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredAndSortedHistory.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-ai-surface border border-ai-border rounded-xl p-6 hover:border-ai-green transition-all duration-300 hover:shadow-lg hover:shadow-ai-green/10 ${
                    viewMode === 'list' ? 'flex items-center justify-between' : ''
                  }`}
                >
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {entry.keyword}
                      </h3>
                      <div className="flex gap-1 ml-2">
                        {entry.tags?.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-ai-green/20 text-ai-green text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      {entry.wordCount && (
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {entry.wordCount} words
                        </div>
                      )}
                    </div>

                    <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-row' : 'flex-col sm:flex-row'}`}>
                      <button
                        onClick={() => viewEntry(entry)}
                        className="flex-1 px-3 py-2 bg-ai-green hover:bg-ai-green/80 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                      <button
                        onClick={() => restoreToGenerator(entry)}
                        className="flex-1 px-3 py-2 bg-ai-orange hover:bg-ai-orange/80 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Restore
                      </button>
                      <button
                        onClick={() => exportEntry(entry)}
                        className="px-3 py-2 bg-ai-blue hover:bg-ai-blue/80 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        {viewMode === 'grid' ? 'Export' : ''}
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(entry)}
                        className="px-3 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        {viewMode === 'grid' ? 'Delete' : ''}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="bg-ai-surface border border-ai-border rounded-xl p-12 max-w-md mx-auto">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchTerm || selectedTags.length > 0 ? 'No matching entries found' : 'No content generated yet'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm || selectedTags.length > 0 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start generating SEO content to see your history here!'
                  }
                </p>
                {searchTerm || selectedTags.length > 0 ? (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedTags([]);
                    }}
                    className="px-4 py-2 bg-ai-green hover:bg-ai-green/80 text-white rounded-lg font-medium transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <a
                    href="/generate"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-ai-green to-ai-blue text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Start Generating
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeContentModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-ai-surface border border-ai-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="border-b border-ai-border p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Generated Content</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="text-ai-orange font-semibold">{selectedEntry.keyword}</span>
                    <span>{new Date(selectedEntry.date).toLocaleString()}</span>
                    {selectedEntry.wordCount && (
                      <span>{selectedEntry.wordCount} words</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={closeContentModal}
                  className="p-2 hover:bg-ai-black rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <ContentDisplay content={selectedEntry.content} isLoading={false} />
              </div>

              {/* Modal Actions */}
              <div className="border-t border-ai-border p-6 flex gap-3">
                <button
                  onClick={() => restoreToGenerator(selectedEntry)}
                  className="px-4 py-2 bg-ai-orange hover:bg-ai-orange/80 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restore to Generator
                </button>
                <button
                  onClick={() => exportEntry(selectedEntry)}
                  className="px-4 py-2 bg-ai-blue hover:bg-ai-blue/80 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(selectedEntry.content, null, 2))}
                  className="px-4 py-2 bg-ai-green hover:bg-ai-green/80 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Content
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {entryToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCancelDelete}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-ai-surface border border-ai-border rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <h3 className="text-xl font-bold text-white">
                  {entryToDelete === 'all' ? 'Clear All History' : 'Delete Entry'}
                </h3>
              </div>
              <p className="text-gray-300 mb-6">
                {entryToDelete === 'all'
                  ? 'Are you sure you want to clear all content history? This action cannot be undone.'
                  : `Are you sure you want to delete the entry for "${(entryToDelete as HistoryEntry).keyword}"? This action cannot be undone.`}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2 bg-ai-black hover:bg-ai-gray text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  {entryToDelete === 'all' ? 'Clear All' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}