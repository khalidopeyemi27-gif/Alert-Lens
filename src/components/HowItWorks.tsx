import React from 'react';
import { Search, Eye, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onCheckClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onCheckClick }) => {
  const steps = [
    {
      step: '1',
      title: 'CHECK',
      label: 'Submit suspicious content',
      icon: Search,
      description:
        'Submit WhatsApp messages, SMS alerts, web links, job offers, investment pitches, or emails for structural and linguistic evaluation.',
    },
    {
      step: '2',
      title: 'UNDERSTAND',
      label: 'See warning signs & risk',
      icon: Eye,
      description:
        'Review specific warning signs, exact quotes from the content, and a preliminary risk indicator without obscure cybersecurity jargon.',
    },
    {
      step: '3',
      title: 'VERIFY',
      label: 'Independent official channels',
      icon: CheckCircle2,
      description:
        'Get actionable steps tailored to Nigeria: official bank helplines, CAC company search, SEC operator lookup, and verified portals.',
    },
    {
      step: '4',
      title: 'ACT',
      label: 'Clear decision guidance',
      icon: ShieldAlert,
      description:
        'Know immediately whether to STOP, PROTECT confidential credentials, VERIFY via official channels, BLOCK, or REPORT.',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold tracking-wide">
          <span>The Alert Lens Framework</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1220] tracking-tight mt-2.5">
          Four Clear Steps to Safety
        </h2>
        <p className="text-sm text-[#667085] mt-1.5">
          A calm, practical guide from initial uncertainty to decisive, safe action.
        </p>
      </div>

      {/* Stepper: Horizontal on desktop, Vertical on mobile */}
      <div className="relative">
        {/* Desktop connecting line */}
        <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#D9E2EC] -z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-[#D9E2EC] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#2563EB] flex items-center justify-center font-bold shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-[#344054]">
                      Step {item.step}
                    </span>
                  </div>

                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB]">
                    {item.title}
                  </div>
                  <h3 className="text-base font-bold text-[#0B1220] mt-0.5 mb-2">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#667085] font-semibold lg:hidden">
                    <span>Next: Step {steps[idx + 1].step} — {steps[idx + 1].title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
