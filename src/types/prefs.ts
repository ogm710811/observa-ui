export type Preferences = {
  defaultMode: 'exec' | 'ops';
  showSparklines: boolean;
  showSecondary: boolean;
  refresh: { auto: boolean; intervalSec: number };
  // reserved for later (not applied yet, but stored)
  thresholds: {
    p95: { warn: number; fail: number };
    errorRate: { warn: number; fail: number };
    burnRate: { warn: number; fail: number };
  };
  defaultFilters: {
    env: 'all' | 'prod' | 'stage' | 'dev';
    region: 'all' | 'us-east-1' | 'us-west-2' | 'eu-west-1';
    team: 'all' | string;
  };
};

export const DEFAULT_PREFS: Preferences = {
  defaultMode: 'exec',
  showSparklines: true,
  showSecondary: true,
  refresh: { auto: false, intervalSec: 60 },
  thresholds: {
    p95: { warn: 200, fail: 500 },
    errorRate: { warn: 0.5, fail: 2 },
    burnRate: { warn: 1.0, fail: 2.0 },
  },
  defaultFilters: { env: 'all', region: 'all', team: 'all' },
};
