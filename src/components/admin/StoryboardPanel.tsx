import { useRef, useState } from 'react';
import { ChevronDown, ChevronRight, Copy, ImageUp, RotateCcw, Wand2 } from 'lucide-react';
import type { CardComicStrip } from '@/game/comic';
import { defaultComicStrip, buildFullPrompt } from '@/game/comic';
import { getActiveContent } from '@/game/contentStore';
import type { GameCard } from '@/game/cards';

interface StoryboardPanelProps {
  /** The card whose strip is being edited (drives default regeneration). */
  card: Pick<GameCard, 'id' | 'department' | 'role' | 'text' | 'leftChoice' | 'rightChoice'>;
  strip: CardComicStrip;
  onChange: (next: CardComicStrip) => void;
}

type FramePath = 'common.frame1' | 'common.frame2' | 'branchLeft.frame3' | 'branchLeft.frame4' | 'branchRight.frame3' | 'branchRight.frame4';

const LAYOUT: { path: FramePath; label: string }[] = [
  { path: 'common.frame1', label: 'Case 1 — Exposition' },
  { path: 'common.frame2', label: 'Case 2 — Tension' },
  { path: 'branchLeft.frame3', label: 'Case 3L — Action gauche' },
  { path: 'branchLeft.frame4', label: 'Case 4L — Chute gauche' },
  { path: 'branchRight.frame3', label: 'Case 3R — Action droite' },
  { path: 'branchRight.frame4', label: 'Case 4R — Chute droite' },
];

function getFrame(strip: CardComicStrip, path: FramePath) {
  const [branch, frame] = path.split('.') as [keyof CardComicStrip, string];
  return (strip[branch] as Record<string, CardComicStrip['common']['frame1']>)[frame];
}

function setFrame(strip: CardComicStrip, path: FramePath, updater: (f: CardComicStrip['common']['frame1']) => CardComicStrip['common']['frame1']): CardComicStrip {
  const [branch, frame] = path.split('.') as [keyof CardComicStrip, string];
  const branchObj = { ...strip[branch] } as Record<string, unknown>;
  branchObj[frame] = updater((strip[branch] as Record<string, CardComicStrip['common']['frame1']>)[frame]);
  return { ...strip, [branch]: branchObj } as CardComicStrip;
}

function StoryboardPanel({ card, strip, onChange }: StoryboardPanelProps) {
  const [open, setOpen] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const uploadTarget = useRef<FramePath | null>(null);
  const [copied, setCopied] = useState<FramePath | null>(null);

  const masterStyle = getActiveContent().masterStyleReference || '';

  const copyPrompt = async (path: FramePath) => {
    const frame = getFrame(strip, path);
    try {
      await navigator.clipboard.writeText(buildFullPrompt(masterStyle, frame.prompt));
      setCopied(path);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // Clipboard unavailable — no-op.
    }
  };

  const openUpload = (path: FramePath) => {
    uploadTarget.current = path;
    fileInput.current?.click();
  };

  const handleFile = (file: File) => {
    const path = uploadTarget.current;
    if (!path) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange(setFrame(strip, path, (f) => ({ ...f, imageUrl: String(reader.result) })));
    };
    reader.readAsDataURL(file);
    uploadTarget.current = null;
  };

  const restoreDefaults = () => {
    onChange(defaultComicStrip(card));
  };

  return (
    <div className="rounded border border-corporate-line bg-corporate-edge/30">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 px-2.5 py-2 text-left"
      >
        {open ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" /> : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
        <span className="font-press text-[10px] uppercase tracking-widest text-slate-300">Storyboard & Comic Strip</span>
        <span className="ml-auto font-ui text-[9px] text-slate-600">6 cases</span>
      </button>

      {open && (
        <div className="space-y-2 border-t border-corporate-line p-2">
          {/* Row 1: common context */}
          <div className="grid grid-cols-2 gap-2">
            {LAYOUT.slice(0, 2).map(({ path, label }) => (
              <FrameEditor
                key={path}
                label={label}
                frame={getFrame(strip, path)}
                copied={copied === path}
                onPrompt={(prompt) => onChange(setFrame(strip, path, (f) => ({ ...f, prompt })))}
                onUpload={() => openUpload(path)}
                onCopy={() => copyPrompt(path)}
              />
            ))}
          </div>
          {/* Row 2: left branch */}
          <div className="grid grid-cols-2 gap-2">
            {LAYOUT.slice(2, 4).map(({ path, label }) => (
              <FrameEditor
                key={path}
                label={label}
                frame={getFrame(strip, path)}
                copied={copied === path}
                onPrompt={(prompt) => onChange(setFrame(strip, path, (f) => ({ ...f, prompt })))}
                onUpload={() => openUpload(path)}
                onCopy={() => copyPrompt(path)}
              />
            ))}
          </div>
          {/* Row 3: right branch */}
          <div className="grid grid-cols-2 gap-2">
            {LAYOUT.slice(4, 6).map(({ path, label }) => (
              <FrameEditor
                key={path}
                label={label}
                frame={getFrame(strip, path)}
                copied={copied === path}
                onPrompt={(prompt) => onChange(setFrame(strip, path, (f) => ({ ...f, prompt })))}
                onUpload={() => openUpload(path)}
                onCopy={() => copyPrompt(path)}
              />
            ))}
          </div>

          <div className="flex gap-1.5 pt-0.5">
            <button
              type="button"
              onClick={restoreDefaults}
              className="flex items-center gap-1 rounded border border-corporate-line bg-corporate-panel px-2 py-1 font-ui text-[10px] text-slate-300 hover:border-slate-400"
            >
              <RotateCcw className="h-3 w-3" /> Prompts d'origine
            </button>
            <span className="ml-auto flex items-center gap-1 font-ui text-[9px] text-slate-600" title="Réservé à une future connexion API">
              <Wand2 className="h-3 w-3" /> Régénérer — API à connecter
            </span>
          </div>

          <input
            ref={fileInput}
            type="file"
            accept="image/png,image/webp,image/jpeg"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
          />
        </div>
      )}
    </div>
  );
}

function FrameEditor({
  label,
  frame,
  copied,
  onPrompt,
  onUpload,
  onCopy,
}: {
  label: string;
  frame: CardComicStrip['common']['frame1'];
  copied: boolean;
  onPrompt: (v: string) => void;
  onUpload: () => void;
  onCopy: () => void;
}) {
  return (
    <div className="rounded border border-corporate-line bg-corporate-abyss p-1.5">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded border border-dashed border-corporate-line bg-corporate-panel">
          {frame.imageUrl ? (
            <img src={frame.imageUrl} alt={label} className="h-full w-full object-cover" draggable={false} />
          ) : (
            <span className="font-press text-[8px] text-slate-700">1:1</span>
          )}
        </span>
        <span className="min-w-0 flex-1 truncate font-ui text-[9px] font-bold uppercase tracking-widest text-slate-500">
          {label}
        </span>
      </div>
      <textarea
        rows={2}
        value={frame.prompt}
        onChange={(e) => onPrompt(e.target.value)}
        className="mt-1 w-full resize-none rounded border border-corporate-line bg-corporate-panel px-1.5 py-1 font-ui text-[10px] leading-snug text-slate-200 outline-none focus:border-slate-400"
      />
      <div className="mt-1 flex gap-1">
        <button
          type="button"
          onClick={onUpload}
          className="flex items-center gap-1 rounded border border-corporate-line bg-corporate-panel px-1.5 py-0.5 font-ui text-[9px] text-slate-300 hover:border-slate-400"
        >
          <ImageUp className="h-2.5 w-2.5" /> {frame.imageUrl ? 'Remplacer' : 'Uploader'}
        </button>
        <button
          type="button"
          onClick={onCopy}
          className={`flex items-center gap-1 rounded border px-1.5 py-0.5 font-ui text-[9px] ${
            copied
              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
              : 'border-corporate-line bg-corporate-panel text-slate-300 hover:border-slate-400'
          }`}
        >
          <Copy className="h-2.5 w-2.5" /> {copied ? 'Copié' : 'Prompt complet'}
        </button>
      </div>
    </div>
  );
}

export default StoryboardPanel;
