import { useState } from 'react';
import { Copy } from 'lucide-react';
import { AI_TOOLS, PROMPT_MODES } from '../constants.js';
import { buttonStyles, inputStyles, labelStyles } from './styles.js';

// "Copy for your AI agent" (M10, PRD FR16, FR18): the AI tool used and a
// prompt goal in Ignacio's TACO structure (Task, Actor, Context, Output
// format), then one button that copies the whole task as a Markdown briefing.
export default function BriefingFields({ id, tool, onChange, onCopy }) {
  const [modeId, setModeId] = useState('continue');

  return (
    <section aria-labelledby={`${id}-briefing-heading`} className="flex flex-col gap-4 border-t border-line pt-5">
      <div>
        <h3 id={`${id}-briefing-heading`} className="text-base font-semibold text-ink">
          Copy for your AI agent
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          Copies the task, its handoff and its history as a briefing to paste into your AI tool.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-tool`} className={labelStyles}>
            AI tool used
          </label>
          <select id={`${id}-tool`} value={tool} onChange={onChange('contextTool')} className={inputStyles}>
            <option value="">Not recorded</option>
            {AI_TOOLS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-mode`} className={labelStyles}>
            Prompt goal (TACO structure)
          </label>
          <select id={`${id}-mode`} value={modeId} onChange={(event) => setModeId(event.target.value)} className={inputStyles}>
            <option value="">Plain briefing (no TACO wrapper)</option>
            {PROMPT_MODES.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        {/* Copies what's on screen, including unsaved changes (M10). */}
        <button type="button" onClick={() => onCopy(modeId || null)} className={buttonStyles.secondary}>
          <Copy aria-hidden="true" className="h-4 w-4" />
          Copy context
        </button>
      </div>
    </section>
  );
}
