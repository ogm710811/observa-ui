import { Preferences, DEFAULT_PREFS } from '@/types/prefs';

const KEY = 'co-health:prefs:v1';

export function loadPrefs(): Preferences {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(p: Preferences) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
