import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import DownloadBtn from './DownloadBtn';

const SummaryPageHeaderActions = ({
  fileName,
  originalFileUrl,
  summary,
  title,
  createdAt,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 my-2">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-rose-600" />
        <p className="text-base sm:text-lg text-gray-700 font-medium">
          Source: <span className="text-gray-900">{fileName}</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        {originalFileUrl && (
          <a
            href={originalFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-rose-600 gap-1.5 hover:underline text-sm font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Original</span>
          </a>
        )}

        <DownloadBtn
          title={title}
          summary={summary}
          fileName={fileName}
          createdAt={createdAt}
        />
      </div>
    </div>
  );
};

export default SummaryPageHeaderActions;
