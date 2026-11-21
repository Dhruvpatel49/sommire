import React, { useState } from 'react';
import { Card } from '../ui/Card';
import NavigationControls from './NavigationControls';
import ProgressBar from './ProgressBar';
import { parseSection } from '../../utils/summaryHelper';
import ContentSection from './ContentSection';

const SectionTitle = ({ title }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 sticky top-0 pt-2 pb-3 bg-white/95 backdrop-blur-xs z-10 border-b border-gray-100">
      <h2 className="text-xl lg:text-2xl font-bold text-center flex items-center justify-center gap-2 text-gray-900">
        {title}
      </h2>
    </div>
  );
};

const SummaryViewer = ({ summary = '' }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split(/\n#\s+/)
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  const handleNext = () =>
    setCurrentSection((prev) =>
      Math.min(prev + 1, Math.max(sections.length - 1, 0))
    );

  const handleSectionSelect = (index) =>
    setCurrentSection(
      Math.min(Math.max(index, 0), Math.max(sections.length - 1, 0))
    );

  if (sections.length === 0) {
    return (
      <Card className="p-8 text-center text-gray-500">
        No summary content available.
      </Card>
    );
  }

  return (
    <Card className="relative px-2 h-[520px] w-full max-w-2xl overflow-hidden bg-gradient-to-br from-white via-white/95 to-rose-50/30 backdrop-blur-lg shadow-xl rounded-3xl border border-rose-200/50">
      <ProgressBar
        sections={sections}
        currentSection={currentSection}
      />

      <div className="h-full overflow-y-auto scrollbar-hid pt-10 pb-20">
        <div className="px-4 sm:px-8">
          <SectionTitle title={sections[currentSection]?.title || ''} />
          <ContentSection points={sections[currentSection]?.points || []} />
        </div>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={handleSectionSelect}
      />
    </Card>
  );
};

export default SummaryViewer;
