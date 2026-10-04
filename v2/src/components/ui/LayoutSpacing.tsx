import React from 'react';
import { SPACING_TOKENS, RADIUS_TOKENS, BREAKPOINT_TOKENS, CONTAINER_TOKENS } from '@/config/tokens';

export const LayoutSpacingSection: React.FC = () => {
  return (
    <div className="space-y-8 font-sans">
      {/* Spacing Scale */}
      <div>
        <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
          Spacing Scale (4 / 8 / 16 / 24 / 40 / 64px)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {SPACING_TOKENS.map((s) => (
            <div
              key={s.step}
              className="bg-surface border border-rule rounded-[4px] p-3 flex flex-col items-center text-center"
            >
              <div
                className="bg-forest mb-2 rounded-[2px]"
                style={{ width: s.px, height: s.px }}
                title={`${s.px} cube indicator`}
              />
              <span className="font-serif font-semibold text-[18px] text-forest">{s.px}</span>
              <span className="text-[11px] text-muted mt-1 leading-tight">{s.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Radius Scale */}
      <div>
        <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
          Radius Scale (2 / 4 / 8px with 4px dominant)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {RADIUS_TOKENS.map((r) => (
            <div
              key={r.step}
              className="bg-surface border border-rule p-4 flex items-center gap-4"
              style={{ borderRadius: r.px }}
            >
              <div
                className="w-12 h-12 bg-stone border border-rule flex items-center justify-center font-serif text-[18px] text-forest font-semibold"
                style={{ borderRadius: r.px }}
              >
                {r.px}
              </div>
              <div>
                <div className="font-medium text-[14px] text-forest">{r.step} ({r.px})</div>
                <div className="text-[12px] text-muted">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Container Constraints */}
      <div>
        <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
          Container Width Constraints
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONTAINER_TOKENS.map((c) => (
            <div key={c.name} className="bg-surface border border-rule rounded-[4px] p-4 space-y-1">
              <div className="font-serif font-semibold text-[20px] text-forest">{c.px}</div>
              <div className="font-sans font-medium text-[14px] text-forest">{c.name}</div>
              <div className="font-sans text-[12px] text-muted">{c.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakpoints and Product Grid Rule */}
      <div>
        <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
          Breakpoints & Responsive Product Grid Rule
        </h4>
        <div className="bg-surface border border-rule rounded-[4px] p-4 md:p-6 space-y-4">
          <p className="text-[14px] text-forest m-0 leading-relaxed">
            The catalog grid strictly adapts by viewport tier. <strong>Rule:</strong> Never use 5 or 6 columns simply because the viewport is wider.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {BREAKPOINT_TOKENS.map((b) => (
              <div key={b.name} className="bg-cream border border-rule p-3 rounded-[4px] text-center">
                <span className="text-[12px] uppercase tracking-wider text-muted block mb-1">
                  {b.name}
                </span>
                <span className="font-serif font-semibold text-[22px] text-forest block">
                  {b.columns} cols
                </span>
                <span className="text-[12px] text-muted">Viewport {b.px}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shadow Policy */}
      <div>
        <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
          Shadow System (Flat by Default)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface border border-rule rounded-[4px] p-4">
            <span className="text-[14px] font-medium text-forest block mb-1">
              Standard UI Elements (Cards, Buttons, Inputs)
            </span>
            <span className="text-[12px] text-muted">
              Zero drop shadow. Clean 1px Rule borders (<code className="text-[11px] bg-stone/50 px-1 py-0.5 rounded">#D9D1BE</code>) provide visual containment.
            </span>
          </div>
          <div
            className="bg-surface border border-rule rounded-[4px] p-4"
            style={{ boxShadow: '0 8px 24px rgba(31,61,43,0.10)' }}
          >
            <span className="text-[14px] font-medium text-forest block mb-1">
              Search Dropdown (Only Permitted Shadow)
            </span>
            <span className="text-[12px] text-muted">
              <code className="text-[11px] bg-stone/50 px-1 py-0.5 rounded">0 8px 24px rgba(31,61,43,0.10)</code> provides floating elevation over canvas.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
