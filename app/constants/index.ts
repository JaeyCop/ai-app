/**
 * History page sort options.
 */
export const SORT_OPTIONS = ['date', 'keyword', 'wordCount'] as const;
export type SortOption = typeof SORT_OPTIONS[number];

/**
 * History page sort orders.
 */
export const SORT_ORDERS = ['asc', 'desc'] as const;
export type SortOrder = typeof SORT_ORDERS[number];

/**
 * History page view modes.
 */
export const VIEW_MODES = ['grid', 'list'] as const;
export type ViewMode = typeof VIEW_MODES[number];