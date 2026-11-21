import React from 'react';
import { Badge } from '../ui/Badge';
import { Calendar, ChevronLeft, Clock, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import SummaryPageHeaderActions from './SummaryPageHeaderActions';

const SummaryPageHeader = ({
  date,
  time,
  title,
  fileName,
  originalFileUrl,
  summary,
  createdAt,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Badge
            variant="secondary"
            className="relative px-4 py-1.5 rounded-full font-medium bg-white text-rose-600 border border-rose-200"
          >
            <Sparkles className="h-4 w-4 text-rose-600 mr-1 animate-pulse" />
            <span className="text-xs sm:text-sm text-rose-600 font-semibold">AI Summary</span>
          </Badge>

          <Badge
            variant="outline"
            className="relative px-3 py-1 rounded-full font-medium bg-white/80 border-gray-200"
          >
            <Calendar className="h-3.5 w-3.5 text-rose-600 mr-1" />
            <span className="text-xs text-gray-600">{date}</span>
          </Badge>

          <Badge
            variant="outline"
            className="relative px-3 py-1 rounded-full font-medium bg-white/80 border-gray-200"
          >
            <Clock className="h-3.5 w-3.5 text-rose-600 mr-1" />
            <span className="text-xs text-gray-600">{time} min read</span>
          </Badge>
        </div>

        <div>
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-rose-50 border-rose-200 rounded-full text-gray-700 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4 text-rose-600" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-center py-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>

      <SummaryPageHeaderActions
        fileName={fileName}
        originalFileUrl={originalFileUrl}
        title={title}
        createdAt={createdAt}
        summary={summary}
      />
    </div>
  );
};

export default SummaryPageHeader;
