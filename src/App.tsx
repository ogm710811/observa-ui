import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CircleHelp,
  Dot,
  LayoutGrid,
  LineChart as LineChartIcon,
  RefreshCw,
  Search,
  Settings2,
  XCircle,
  Bell,
  Clock,
  Gauge,
  X,
  ExternalLink,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, Tooltip as RechartsTooltip } from 'recharts';

import { PreferencesDrawer } from '@/components/PreferencesDrawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { loadPrefs, savePrefs } from '@/store/pref';
import { Preferences } from '@/types/prefs';

type Status = 'OK' | 'WARN' | 'FAIL' | 'UNKNOWN';
type SLO = { burnRate: number };
type Service = {
  id: string;
  service: string;
  env: 'prod' | 'stage' | 'dev';
  region: 'us-east-1' | 'us-west-2' | 'eu-west-1';
  owner: string;
  status: Status;
  p95ms: number;
  errorRate: number;
  version: string;
  lastDeploy: string;
  trend: { t: string; v: number }[];
  slo: SLO;
};
type Incident = {
  id: string;
  title: string;
  severity: 'sev1' | 'sev2' | 'sev3';
  service: string;
  env: Service['env'];
  region: Service['region'];
  openedAt: string;
  status: 'open' | 'mitigated' | 'resolved';
};

function mkService(
  name: string,
  env: Service['env'],
  region: Service['region'],
  owner: string,
  status: Status,
  p95ms: number,
  err: number
): Service {
  const now = Date.now();
  const trend = Array.from({ length: 16 }).map((_, i) => ({
    t: new Date(now - (16 - i) * 3600000).toISOString(),
    v: Math.max(20, Math.round(p95ms * (0.7 + Math.random() * 0.6))),
  }));
  const burnRate = Math.round((0.5 + Math.random() * 1.2) * 10) / 10;
  return {
    id: `${name}-${env}-${region}`,
    service: name,
    env,
    region,
    owner,
    status,
    p95ms,
    errorRate: err,
    version: `2025.08.${String(Math.ceil(Math.random() * 29)).padStart(2, '0')}-${Math.random().toString(36).slice(2, 7)}`,
    lastDeploy: new Date(now - (1 + Math.random() * 72) * 3600000).toISOString(),
    trend,
    slo: { burnRate },
  };
}
function isoMinutesAgo(mins: number) {
  return new Date(Date.now() - mins * 60000).toISOString();
}

const SEED_SERVICES: Service[] = [
  mkService('payments-api', 'prod', 'us-east-1', 'card-platform', 'OK', 82, 0.09),
  mkService('ledger-core', 'prod', 'us-west-2', 'finance', 'OK', 96, 0.06),
  mkService('profile-gw', 'prod', 'eu-west-1', 'platform', 'FAIL', 999, 12.4),
  mkService('notifications', 'prod', 'us-west-2', 'messaging', 'OK', 72, 0.03),
  mkService('fraud-detect', 'stage', 'us-east-1', 'risk', 'WARN', 240, 1.8),
  mkService('files-edge', 'dev', 'us-east-1', 'platform', 'UNKNOWN', 0, 0),
];
const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-10421',
    title: 'Profile gateway 5xx spike',
    severity: 'sev2',
    service: 'profile-gw',
    env: 'prod',
    region: 'eu-west-1',
    openedAt: isoMinutesAgo(38),
    status: 'open',
  },
  {
    id: 'INC-10422',
    title: 'Identity latency regression',
    severity: 'sev3',
    service: 'identity-svc',
    env: 'prod',
    region: 'us-east-1',
    openedAt: isoMinutesAgo(95),
    status: 'mitigated',
  },
  {
    id: 'INC-10418',
    title: 'Fraud model roll-out causing cache misses',
    severity: 'sev3',
    service: 'fraud-detect',
    env: 'stage',
    region: 'us-east-1',
    openedAt: isoMinutesAgo(220),
    status: 'resolved',
  },
];
async function mockFetchHealth({
  env,
  region,
  team,
  q,
}: {
  env: 'all' | Service['env'];
  region: 'all' | Service['region'];
  team: 'all' | string;
  q: string;
}): Promise<{ services: Service[]; incidents: Incident[] }> {
  await new Promise(r => setTimeout(r, 250));
  const randomized = SEED_SERVICES.map(s => {
    const j = Math.random();
    let st = s.status;
    if (j < 0.06) st = 'FAIL';
    else if (j < 0.15) st = 'WARN';
    else if (j > 0.92) st = 'OK';
    return { ...s, status: st } as Service;
  });
  const filtered = randomized.filter(
    s =>
      (env === 'all' || s.env === env) &&
      (region === 'all' || s.region === region) &&
      (team === 'all' || s.owner === team) &&
      (q.trim().length === 0 || s.service.toLowerCase().includes(q.toLowerCase()))
  );
  return { services: filtered, incidents: MOCK_INCIDENTS };
}
function statusClasses(s: Status) {
  switch (s) {
    case 'OK':
      return 'bg-green-500/15 text-green-600 ring-1 ring-green-500/20';
    case 'WARN':
      return 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/20';
    case 'FAIL':
      return 'bg-red-500/15 text-red-600 ring-1 ring-red-500/20';
    default:
      return 'bg-zinc-500/15 text-zinc-600 ring-1 ring-zinc-500/20';
  }
}
function statusDot(s: Status) {
  const c =
    s === 'OK'
      ? 'bg-green-500'
      : s === 'WARN'
        ? 'bg-amber-500'
        : s === 'FAIL'
          ? 'bg-red-500'
          : 'bg-zinc-400';
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${c}`} />;
}
function sevBadge(sev: Incident['severity']) {
  const map = {
    sev1: 'bg-red-500/15 text-red-600 ring-1 ring-red-500/20',
    sev2: 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/20',
    sev3: 'bg-blue-500/15 text-blue-600 ring-1 ring-blue-500/20',
  } as Record<string, string>;
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs ${map[sev]}`}>{sev.toUpperCase()}</span>
  );
}

export default function App() {
  const [env, setEnv] = useState<'all' | Service['env']>('all');
  const [region, setRegion] = useState<'all' | Service['region']>('all');
  const [team, setTeam] = useState<'all' | string>('all');
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [services, setServices] = useState<Service[]>(SEED_SERVICES);
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSvc, setSelectedSvc] = useState<Service | null>(null);
  const teams = useMemo(() => Array.from(new Set(SEED_SERVICES.map(s => s.owner))), []);
  const filteredLocal = useMemo(
    () =>
      services.filter(
        s =>
          (env === 'all' || s.env === env) &&
          (region === 'all' || s.region === region) &&
          (team === 'all' || s.owner === team) &&
          (query.trim().length === 0 || s.service.toLowerCase().includes(query.toLowerCase()))
      ),
    [env, region, team, query, services]
  );
  const kpis = useMemo(() => {
    const ok = filteredLocal.filter(s => s.status === 'OK').length;
    const warn = filteredLocal.filter(s => s.status === 'WARN').length;
    const fail = filteredLocal.filter(s => s.status === 'FAIL').length;
    const burn = filteredLocal.length
      ? filteredLocal.reduce((a, s) => a + s.slo.burnRate, 0) / filteredLocal.length
      : 0;
    return { ok, warn, fail, burnAvg: Math.round(burn * 10) / 10 };
  }, [filteredLocal]);
  const lastUpdated = new Date().toLocaleString();
  // Load once; use defaults if nothing saved
  const [prefs, setPrefs] = useState<Preferences>(() => loadPrefs());
  const [mode, setMode] = useState<'exec' | 'ops'>(() => prefs.defaultMode);
  const [prefsOpen, setPrefsOpen] = useState(false);

  const refreshFromAggregator = useCallback(async () => {
    setRefreshing(true);
    try {
      const { services: s, incidents: inc } = await mockFetchHealth({
        env,
        region,
        team,
        q: query,
      });
      setServices(s);
      setIncidents(inc);
    } finally {
      setRefreshing(false);
    }
  }, [env, region, team, query]);

  useEffect(() => {
    refreshFromAggregator();
  }, [refreshFromAggregator]);

  useEffect(() => {
    if (!prefs.refresh.auto) return;
    const id = setInterval(
      () => refreshFromAggregator(),
      Math.max(10, prefs.refresh.intervalSec) * 1000
    );
    return () => clearInterval(id);
  }, [
    prefs.refresh.auto,
    prefs.refresh.intervalSec,
    env,
    region,
    team,
    query,
    refreshFromAggregator,
  ]);

  function openDrawer(svc: Service) {
    setSelectedSvc(svc);
    setDrawerOpen(true);
  }
  function closeDrawer() {
    setDrawerOpen(false);
    setSelectedSvc(null);
  }

  const showSecondary = mode === 'exec' ? false : prefs.showSecondary;
  const showSparklines = mode === 'exec' ? false : prefs.showSparklines;

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white p-4 md:p-6">
        <div className="mb-4 rounded-2xl bg-[#052D6E] p-4 text-white shadow-sm ring-1 ring-black/5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-6 w-6" />
              <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                Tech Health – Capital One (Wireframe v1)
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs opacity-90">
              <CircleHelp className="h-4 w-4" />
              <span>Executive-first layout. Mock aggregator today; Observe later</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <Card className="md:col-span-9">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
                <div className="md:col-span-3">
                  <Label className="mb-1 block">Environment</Label>
                  <Select onValueChange={v => setEnv(v as Service['env'])}>
                    <SelectTrigger aria-label="Environment">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="prod">prod</SelectItem>
                      <SelectItem value="stage">stage</SelectItem>
                      <SelectItem value="dev">dev</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3">
                  <Label className="mb-1 block">Region</Label>
                  <Select onValueChange={v => setRegion(v as Service['region'])}>
                    <SelectTrigger aria-label="Region">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="us-east-1">us-east-1</SelectItem>
                      <SelectItem value="us-west-2">us-west-2</SelectItem>
                      <SelectItem value="eu-west-1">eu-west-1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3">
                  <Label className="mb-1 block">Team</Label>
                  <Select onValueChange={v => setTeam(v as string)}>
                    <SelectTrigger aria-label="Team">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {teams.map(t => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3">
                  <Label className="mb-1 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-7"
                      placeholder="payments, identity, …"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Mode</Label>
                  <Tabs value={mode} onValueChange={v => setMode(v as 'exec' | 'ops')}>
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="exec">Exec</TabsTrigger>
                      <TabsTrigger value="ops">Ops</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <Button
                  className="gap-2 bg-[#052D6E] text-white hover:bg-[#09357c]"
                  disabled={refreshing}
                  size="sm"
                  onClick={refreshFromAggregator}
                >
                  <RefreshCw className={refreshing ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
                  Refresh
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="gap-2"
                      size="sm"
                      variant="ghost"
                      onClick={() => setPrefsOpen(true)}
                    >
                      <Settings2 className="h-4 w-4" /> Preferences
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Per-user layout & thresholds (future)</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Legend</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" /> OK
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Warning
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Down
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-400" /> Unknown
              </div>
              <Separator className="my-2" />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> Last updated {lastUpdated}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-12">
          <KpiCard
            className="md:col-span-3"
            icon={<Activity className="h-5 w-5" />}
            sub={`${kpis.ok} OK / ${kpis.warn} Warn / ${kpis.fail} Down`}
            title="Services"
            tone="info"
            value={filteredLocal.length}
          />
          <KpiCard
            className="md:col-span-3"
            icon={<CheckCircle2 className="h-5 w-5" />}
            sub="Status = OK"
            title="Healthy"
            tone="ok"
            value={kpis.ok}
          />
          <KpiCard
            className="md:col-span-3"
            icon={<AlertTriangle className="h-5 w-5" />}
            sub="> thresholds"
            title="Warnings"
            tone="warn"
            value={kpis.warn}
          />
          <KpiCard
            className="md:col-span-3"
            icon={<XCircle className="h-5 w-5" />}
            sub="Attention needed"
            title="Down"
            tone="fail"
            value={kpis.fail}
          />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-12">
          <KpiCard
            className="md:col-span-3"
            icon={<Gauge className="h-5 w-5" />}
            sub="Last 24h average (filtered)"
            title="Avg SLO burn rate"
            tone="info"
            value={`${(filteredLocal.length ? filteredLocal.reduce((a, s) => a + s.slo.burnRate, 0) / filteredLocal.length : 0).toFixed(1)}x`}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="xl:col-span-9">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Service Health</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <LineChartIcon className="h-4 w-4" />
                  {mode === 'ops' ? 'Ops mode' : 'Exec mode'}
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${mode === 'ops' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} 2xl:grid-cols-3`}
                >
                  {filteredLocal.map(s => (
                    <motion.div
                      key={s.id}
                      layout
                      animate={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 8 }}
                    >
                      <ServiceCard
                        key={s.id}
                        mode={mode}
                        showSecondary={showSecondary}
                        showSparklines={showSparklines}
                        svc={s}
                        onDetails={() => openDrawer(s)}
                      />
                    </motion.div>
                  ))}
                  {filteredLocal.length === 0 && (
                    <div className="col-span-full rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                      No services match the filters.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-3">
            <Card className="sticky top-4">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Incidents & Changes</CardTitle>
                  <Badge className="gap-1 bg-[#052D6E] text-white hover:bg-[#09357c]">
                    <Bell className="h-3.5 w-3.5" /> {incidents.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {incidents.map(i => (
                  <div key={i.id} className="rounded-lg border p-3">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {sevBadge(i.severity)}
                        <span className="text-sm font-medium">{i.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{timeAgo(i.openedAt)}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{i.service}</span>
                      <Dot className="h-4 w-4" />
                      <span>{i.env}</span>
                      <Dot className="h-4 w-4" />
                      <span>{i.region}</span>
                      <Dot className="h-4 w-4" />
                      <span className="capitalize">{i.status}</span>
                    </div>
                  </div>
                ))}
                {incidents.length === 0 && (
                  <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                    No incidents.
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-end">
                <Button size="sm" variant="outline">
                  View history
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {drawerOpen && selectedSvc && (
          <Drawer onClose={closeDrawer}>
            <DrawerHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    {statusDot(selectedSvc.status)}
                    <h3 className="text-lg font-semibold">{selectedSvc.service}</h3>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge className="capitalize bg-[#052D6E] text-white hover:bg-[#09357c]">
                      {selectedSvc.env}
                    </Badge>
                    <span>{selectedSvc.region}</span>
                    <Dot className="h-4 w-4" />
                    <span>owner: {selectedSvc.owner}</span>
                    <Dot className="h-4 w-4" />
                    <span>v{selectedSvc.version}</span>
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${statusClasses(selectedSvc.status)}`}
                >
                  {selectedSvc.status}
                </span>
              </div>
            </DrawerHeader>
            <DrawerContent>
              <div className="grid grid-cols-2 gap-3">
                <Metric label="p95 latency" value={`${selectedSvc.p95ms} ms`} />
                <Metric label="error rate" value={`${selectedSvc.errorRate.toFixed(2)}%`} />
                <Metric label="SLO burn rate" value={`${selectedSvc.slo.burnRate.toFixed(1)}x`} />
                <Metric label="last deploy" value={relativeDate(selectedSvc.lastDeploy)} />
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-semibold">Recent incidents</h4>
                <div className="flex flex-col gap-2">
                  {incidents
                    .filter(i => i.service === selectedSvc.service)
                    .slice(0, 3)
                    .map(i => (
                      <div key={i.id} className="rounded-lg border p-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {sevBadge(i.severity)}
                            <span className="text-sm font-medium">{i.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {timeAgo(i.openedAt)}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {i.env} · {i.region} · {i.status}
                        </div>
                      </div>
                    ))}
                  {incidents.filter(i => i.service === selectedSvc.service).length === 0 && (
                    <div className="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
                      No recent incidents for this service.
                    </div>
                  )}
                </div>
              </div>
            </DrawerContent>
            <DrawerFooter>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button className="bg-[#052D6E] text-white hover:bg-[#09357c]" size="sm">
                    <ExternalLink className="mr-1 h-4 w-4" /> Open full page
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="mr-1 h-4 w-4" /> Open in Observe
                  </Button>
                </div>
                <Button size="sm" variant="ghost" onClick={closeDrawer}>
                  <X className="mr-1 h-4 w-4" /> Close
                </Button>
              </div>
            </DrawerFooter>
          </Drawer>
        )}
        <PreferencesDrawer
          open={prefsOpen}
          prefs={prefs}
          onClose={() => setPrefsOpen(false)}
          onSave={next => {
            setPrefs(next);
            savePrefs(next);
            if (mode !== next.defaultMode) setMode(next.defaultMode);
          }}
        />
        <div className="mx-auto mt-6 max-w-5xl text-center text-xs text-muted-foreground">
          Executive quick view with drawer: minimal color usage (status-only), clear KPIs. Replace
          mock aggregator with Observe → API → this UI.
        </div>
      </div>
    </TooltipProvider>
  );
}

type Mode = 'exec' | 'ops';
function KpiCard({
  title,
  value,
  sub,
  icon,
  tone,
  className,
}: {
  title: string;
  value: number | string;
  sub?: string;
  icon?: React.ReactNode;
  tone?: 'ok' | 'warn' | 'fail' | 'info';
  className?: string;
}) {
  const theme = {
    ok: { bg: 'bg-[#E6F4EA]', ring: 'ring-[#34A853]/30' },
    warn: { bg: 'bg-[#FEF7E0]', ring: 'ring-[#F9AB00]/30' },
    fail: { bg: 'bg-[#FCE8E6]', ring: 'ring-[#D93025]/30' },
    info: { bg: 'bg-[#E8F0FE]', ring: 'ring-[#1A73E8]/30' },
  } as const;
  const styles = tone ? theme[tone] : { bg: 'bg-white', ring: 'ring-slate-200' };
  return (
    <Card className={`${className ?? ''} ${styles.bg} ring-1 ${styles.ring}`}>
      <CardContent className="flex items-center justify-between gap-2 pt-6">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{title}</div>
          <div className="text-2xl font-semibold">{value}</div>
          {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
        </div>
        <div className="rounded-xl bg-white/70 p-2 shadow-sm">{icon}</div>
      </CardContent>
    </Card>
  );
}
function ServiceCard({
  svc,
  showSecondary,
  showSparklines,
  onDetails,
}: {
  svc: Service;
  mode: Mode;
  showSecondary: boolean;
  showSparklines: boolean;
  onDetails: () => void;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              {statusDot(svc.status)}
              <CardTitle className="text-base font-semibold">{svc.service}</CardTitle>
            </div>

            {/* secondary line (env is always shown; the rest is gated) */}
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge className="capitalize bg-[#052D6E] text-white hover:bg-[#09357c]">
                {svc.env}
              </Badge>

              {showSecondary && (
                <>
                  <span>{svc.region}</span>
                  <Dot className="h-4 w-4" />
                  <span>v{svc.version}</span>
                  <Dot className="h-4 w-4" />
                  <span>owner: {svc.owner}</span>
                </>
              )}
            </div>
          </div>

          <div>
            <span className={`rounded-full px-2 py-0.5 text-xs ${statusClasses(svc.status)}`}>
              {svc.status}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        {/* core metrics always visible; last deploy is "secondary" */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <Metric label="p95 latency" value={`${svc.p95ms} ms`} />
          <Metric label="error rate" value={`${svc.errorRate.toFixed(2)}%`} />
          {showSecondary && <Metric label="last deploy" value={relativeDate(svc.lastDeploy)} />}
        </div>

        {/* sparkline is its own toggle */}
        {showSparklines && (
          <div className="mt-3 h-16 w-full">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={svc.trend} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                <RechartsTooltip formatter={(v: never) => `${v} ms`} labelFormatter={() => ''} />
                <Line
                  dataKey="v"
                  dot={false}
                  isAnimationActive={false}
                  strokeWidth={2}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button
          className="bg-[#052D6E] text-white hover:bg-[#09357c]"
          size="sm"
          onClick={onDetails}
        >
          Details
        </Button>

        {/* footer "last deploy" is also secondary */}
        {showSecondary && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Last deploy:</span>
            <span className="font-medium">{relativeDate(svc.lastDeploy)}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-white p-2">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-medium break-words whitespace-normal leading-tight">{value}</div>
    </div>
  );
}
function Drawer({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') onClose();
        }}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl ring-1 ring-black/5">
        {children}
      </div>
    </div>
  );
}
function DrawerHeader({ children }: { children: React.ReactNode }) {
  return <div className="sticky top-0 z-10 border-b bg-white p-4">{children}</div>;
}
function DrawerContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}
function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 border-t bg-white p-4">{children}</div>;
}
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const d = Math.round(hrs / 24);
  return `${d}d ago`;
}
function relativeDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
  });
}
