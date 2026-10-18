import { Globe } from 'lucide-react';
import { LANGUAGES, LANG_LABELS, type Language } from '@/i18n/translations';
import { useLanguage } from '@/i18n/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      className="flex shrink-0 items-center gap-1 rounded border border-corporate-line bg-corporate-panel px-1.5 py-0.5"
      role="group"
      aria-label="Language"
    >
      <Globe className="h-3 w-3 text-slate-500" aria-hidden="true" />
      {LANGUAGES.map((lang: Language) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`rounded px-1.5 py-0.5 font-ui text-[10px] font-semibold uppercase tracking-wider transition-colors ${
            language === lang
              ? 'bg-corporate-edge text-slate-100'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {LANG_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
