import { CheckHistoryItem, AnalysisResult, InputType } from '../types';

const HISTORY_KEY = 'scamshield_ng_history_v1';

export function getLocalHistory(): CheckHistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load local history:', e);
    return [];
  }
}

export function saveToHistory(
  inputType: InputType,
  snippet: string,
  result: AnalysisResult,
  channel?: string
): CheckHistoryItem {
  const item: CheckHistoryItem = {
    id: 'check-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    timestamp: Date.now(),
    inputType,
    channel,
    riskLevel: result.riskLevel,
    riskScore: result.riskScore,
    threatCategory: result.threatCategory,
    snippet: snippet.trim().slice(0, 140),
    fullResult: result,
  };

  try {
    const current = getLocalHistory();
    // Prepend and keep max 30 items
    const updated = [item, ...current.slice(0, 29)];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to local history:', e);
  }

  return item;
}

export function clearLocalHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear local history:', e);
  }
}
