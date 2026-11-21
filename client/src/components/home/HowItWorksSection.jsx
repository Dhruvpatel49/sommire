import React from 'react';
import { BrainCircuit, FileOutput, FileText, MoveRight } from 'lucide-react';

const steps = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    title: 'Upload your PDF',
    description:
      'Upload your PDF file to the platform. We support all major document formats.',
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    title: 'AI Analysis',
    description:
      'Our AI analyzes the text, identifies key sections, and extracts core insights.',
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    title: 'Get Summary',
    description:
      'Receive a viral, emoji-rich, structured summary deck ready to read or download.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-rose-500 font-bold uppercase text-xl">
            How it works
          </h2>
          <h3 className="text-3xl font-bold max-w-2xl text-gray-900">
            Transform any PDF into an easy-to-digest summary in three simple steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-stretch">
              <StepItem {...step} />

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={28}
                    strokeWidth={1.5}
                    className="text-rose-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StepItem = ({ icon, title, description }) => {
  return (
    <div className="relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/80 hover:border-rose-300 transition-colors group w-full shadow-sm">
      <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
        <div className="text-rose-600 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
