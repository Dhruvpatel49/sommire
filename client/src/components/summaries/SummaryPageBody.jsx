import React from 'react';
import { FileText } from 'lucide-react';
import SummaryViewer from './SummaryViewer';

const SummaryPageBody = ({ summary, wordCount }) => {
  return (
    <div className="border border-rose-100 bg-white/80 shadow-lg rounded-2xl p-4 sm:p-6 w-full max-w-3xl flex flex-col items-center justify-center mx-auto">
      <div className="flex items-center gap-1.5 mb-4 ml-auto text-sm text-gray-500">
        <FileText className="h-4 w-4 text-rose-600" />
        <span>
          <strong className="text-gray-900">{wordCount}</strong> words
        </span>
      </div>
      <SummaryViewer summary={summary} />
    </div>
  );
};

export default SummaryPageBody;
