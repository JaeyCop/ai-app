import { useState, useEffect, useMemo, useCallback } from 'react';
import { HistoryEntry } from '@/app/types';
import { SortOption, SortOrder, ViewMode, SORT_OPTIONS } from '@/app/constants';
import { useToast } from '@/context/ToastContext';

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [entryToDelete, setEntryToDelete] = useState<HistoryEntry | 'all' | null>(null);

  const { addToast } = useToast();

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/history');
      if (!response.ok) throw new Error('Failed to fetch history');
      const data: HistoryEntry[] = await response.json();
      // The API response already maps to the HistoryEntry type
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
      addToast('Error loading history', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const filteredAndSortedHistory = useMemo(() => {
    let filtered = history.filter(entry => {
      const matchesSearch = entry.keyword.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => entry.tags?.includes(tag));
      return matchesSearch && matchesTags;
    });

    return filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortBy === 'keyword') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [history, searchTerm, selectedTags, sortBy, sortOrder]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    history.forEach(entry => {
      entry.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [history]);

  const handleDeleteRequest = useCallback((entryOrAll: HistoryEntry | 'all') => {
    setEntryToDelete(entryOrAll);
  }, []);

  const handleCancelDelete = useCallback((): void => {
    setEntryToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!entryToDelete) return;

    const isDeleteAll = entryToDelete === 'all';
    const url = isDeleteAll ? '/api/history' : `/api/history?id=${entryToDelete.id}`;

    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');

      setHistory(prev => isDeleteAll ? [] : prev.filter(e => e.id !== entryToDelete.id));
      addToast(isDeleteAll ? 'History cleared successfully!' : 'Entry deleted successfully!', 'success');
    } catch (error) {
      addToast('Failed to delete entry.', 'error');
      console.error('Delete error:', error);
    }

    setEntryToDelete(null);
  }, [entryToDelete, history, addToast]);

  const handleSort = useCallback((option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(option);
      setSortOrder('desc');
    }
  }, [sortBy]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  return {
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
  };
};