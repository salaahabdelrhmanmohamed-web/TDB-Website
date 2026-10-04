import React from 'react';
import { CheckIcon } from './Icons';

export const AccessibilitySection: React.FC = () => {
  const contrastPairs = [
    {
      foreground: 'Forest (#1F3D2B)',
      background: 'Cream (#F3EDE0)',
      ratio: '10.2 : 1',
      level: 'AAA Passed (Normal & Large Text)',
      usage: 'Body text, primary headlines, logos on canvas',
    },
    {
      foreground: 'Forest (#1F3D2B)',
      background: 'Surface (#FBF8F0)',
      ratio: '11.2 : 1',
      level: 'AAA Passed (Normal & Large Text)',
      usage: 'Product names, card labels, form inputs',
    },
    {
      foreground: 'Cream (#F3EDE0)',
      background: 'Forest (#1F3D2B)',
      ratio: '10.2 : 1',
      level: 'AAA Passed (Normal & Large Text)',
      usage: 'Primary buttons, trust strip, header badge',
    },
    {
      foreground: 'Muted (#5B574E)',
      background: 'Cream (#F3EDE0)',
      ratio: '6.06 : 1',
      level: 'AA Passed (Normal Text) / AAA (Large)',
      usage: 'Secondary descriptions, metadata, placeholders',
    },
    {
      foreground: 'Muted (#5B574E)',
      background: 'Surface (#FBF8F0)',
      ratio: '6.7 : 1',
      level: 'AA Passed (Normal Text) / AAA (Large)',
      usage: 'Product card origins, form hints',
    },
    {
      foreground: 'Brick (#9B3B2A)',
      background: 'Cream (#F3EDE0)',
      ratio: '5.85 : 1',
      level: 'AA Passed (Normal Text) / AAA (Large)',
      usage: 'Low stock notices, error text (always paired with icon/text)',
    },
    {
      foreground: 'Brick (#9B3B2A)',
      background: 'Surface (#FBF8F0)',
      ratio: '6.5 : 1',
      level: 'AA Passed (Normal Text) / AAA (Large)',
      usage: 'Form field error indicators & validation alerts',
    },
  ];

  const checklist = [
    {
      title: '44px Minimum Touch Targets',
      desc: 'All buttons, form inputs, steppers, and interactive icons enforce a minimum 44px hit-box to satisfy WCAG 2.5.5 / 2.5.8 target size criteria.',
    },
    {
      title: 'Explicit Dual-Context Keyboard Focus',
      desc: 'High-contrast 2px visible focus rings with 2px offset: Forest (#1F3D2B) on light surfaces, Cream (#F3EDE0) on Forest/dark surfaces via .on-forest.',
    },
    {
      title: 'No State Communicated by Color Alone',
      desc: 'Low stock notices include explicit "Only 3 left" copy. Form errors combine Brick borders with Alert icons, explicit text messages, and aria-invalid attributes.',
    },
    {
      title: 'Programmatic Form Associations & ARIA',
      desc: 'Labels are bound via htmlFor/id. Validation error messages are tied directly to input fields via aria-describedby and role="alert".',
    },
    {
      title: 'Reduced-Motion Engine',
      desc: 'Global CSS rule disables animations and transitions when prefers-reduced-motion: reduce is requested. Skeletons are flat stone with zero disorienting shimmer.',
    },
    {
      title: 'Accessible Icon Buttons',
      desc: 'All icon-only triggers (search expansion, basket button, stepper decrement/increment) carry descriptive aria-label attributes.',
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* WCAG Contrast Verification Table */}
      <div>
        <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
          WCAG 2.1 Contrast Checker Verification
        </h4>
        <div className="overflow-x-auto border border-rule rounded-[4px] bg-surface">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-cream border-b border-rule font-medium text-forest text-[13px]">
              <tr>
                <th className="py-2.5 px-4">Foreground</th>
                <th className="py-2.5 px-4">Background</th>
                <th className="py-2.5 px-4">Contrast Ratio</th>
                <th className="py-2.5 px-4">WCAG Status</th>
                <th className="py-2.5 px-4">Usage Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule/60 text-forest">
              {contrastPairs.map((c) => (
                <tr key={`${c.foreground}-${c.background}`}>
                  <td className="py-2.5 px-4 font-mono text-[13px]">{c.foreground}</td>
                  <td className="py-2.5 px-4 font-mono text-[13px]">{c.background}</td>
                  <td className="py-2.5 px-4 font-semibold">{c.ratio}</td>
                  <td className="py-2.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-forest font-medium text-[12px] bg-cream px-2 py-0.5 rounded-[2px] border border-rule">
                      <CheckIcon size={12} tone="forest" />
                      {c.level}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-muted text-[13px]">{c.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility Principles Checklist */}
      <div>
        <h4 className="font-sans font-medium text-[16px] text-forest mb-3">
          Accessibility Compliance Verification
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklist.map((item) => (
            <div
              key={item.title}
              className="bg-surface border border-rule rounded-[4px] p-4 flex gap-3 items-start"
            >
              <div className="w-5 h-5 rounded-full bg-cream border border-rule flex items-center justify-center flex-none mt-0.5 text-forest">
                <CheckIcon size={12} tone="forest" />
              </div>
              <div>
                <h5 className="font-sans font-medium text-[14px] text-forest m-0">
                  {item.title}
                </h5>
                <p className="font-sans text-[13px] text-muted leading-relaxed m-0 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
