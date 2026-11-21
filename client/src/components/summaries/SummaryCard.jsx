import React from 'react';
import { FileText } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn, formatFileName } from '../../utils/utils';
import { formatDistanceToNow } from 'date-fns';
import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';

const SummaryHeader = ({ fileUrl, title, createdAt }) => {
  let relativeTime = 'recently';
  try {
    if (createdAt) {
      relativeTime = formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
      });
    }
  } catch (e) {
    relativeTime = 'recently';
  }

  return (
    <div className="flex items-start gap-3">
      <FileText className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0 pr-8">
        <h3 className="text-base font-semibold text-gray-900 truncate">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">{relativeTime}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status = 'completed' }) => {
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 text-xs font-medium rounded-full capitalize',
        status === 'completed'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      )}
    >
      {status}
    </span>
  );
};

const SummaryCard = ({ summary, onDeleted }) => {
  const summaryId = summary.id || summary._id;
  const fileUrl = summary.original_file_url || summary.originalFileUrl || '';
  const title = summary.title || '';
  const createdAt = summary.created_at || summary.createdAt;

  return (
    <div className="relative group">
      <Card className="relative h-full bg-white hover:shadow-md transition-all duration-200 border-gray-200 p-5 rounded-2xl flex flex-col justify-between">
        <div className="absolute top-4 right-4 z-10">
          <DeleteButton summaryId={summaryId} onDeleted={onDeleted} />
        </div>

        <Link to={`/summaries/${summaryId}`} className="block">
          <div className="flex flex-col gap-3">
            <SummaryHeader
              fileUrl={fileUrl}
              title={title}
              createdAt={createdAt}
            />

            <p className="text-gray-600 line-clamp-2 text-sm pl-9">
              {summary.summary}
            </p>

            <div className="flex justify-between items-center mt-3 pl-9">
              <StatusBadge status={summary.status} />
              <span className="text-xs text-rose-600 font-medium group-hover:underline">
                Read summary →
              </span>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default SummaryCard;
