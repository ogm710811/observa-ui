import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Preferences } from '@/types/prefs';

export function PreferencesDrawer({
  open,
  prefs,
  onClose,
  onSave,
}: {
  open: boolean;
  prefs: Preferences;
  onClose: () => void;
  onSave: (p: Preferences) => void;
}) {
  const [draft, setDraft] = React.useState<Preferences>(prefs);
  React.useEffect(() => setDraft(prefs), [prefs, open]);

  if (!open) return null;

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
        <div className="sticky top-0 border-b bg-white p-4">
          <h3 className="text-lg font-semibold">Preferences</h3>
        </div>

        <div className="space-y-5 p-4">
          <div>
            <Label className="mb-2 block" htmlFor="Tabs">
              Default mode
            </Label>
            <Tabs
              value={draft.defaultMode}
              onValueChange={v => setDraft({ ...draft, defaultMode: v as 'exec' | 'ops' })}
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="exec">Exec</TabsTrigger>
                <TabsTrigger value="ops">Ops</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                checked={draft.showSparklines}
                className="h-4 w-4"
                type="checkbox"
                onChange={e => setDraft({ ...draft, showSparklines: e.target.checked })}
              />
              Show sparklines by default
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                checked={draft.showSecondary}
                className="h-4 w-4"
                type="checkbox"
                onChange={e => setDraft({ ...draft, showSecondary: e.target.checked })}
              />
              Show secondary text
            </label>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                checked={draft.refresh.auto}
                className="h-4 w-4"
                type="checkbox"
                onChange={e =>
                  setDraft({
                    ...draft,
                    refresh: { ...draft.refresh, auto: e.target.checked },
                  })
                }
              />
              Auto-refresh
            </label>

            <div className="flex items-center gap-2 text-sm">
              <Label htmlFor="input">Interval (sec)</Label>
              <input
                className="h-9 w-24 rounded-md border border-slate-200 px-2"
                min={10}
                type="number"
                value={draft.refresh.intervalSec}
                onChange={e =>
                  setDraft({
                    ...draft,
                    refresh: {
                      ...draft.refresh,
                      intervalSec: Number(e.target.value || 60),
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t bg-white p-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(draft);
              onClose();
            }}
          >
            Save & Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
