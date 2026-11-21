import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BgGradient from '../components/common/BgGradient';
import SummaryPageHeader from '../components/summaries/SummaryPageHeader';
import SummaryPageBody from '../components/summaries/SummaryPageBody';
import { summaryApi } from '../api/summaryApi';
import { Button } from '../components/ui/Button';
import { ChevronLeft, Loader2 } from 'lucide-react';

const SummaryDetailPage = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await summaryApi.getById(id);
        if (response?.success && response?.data) {
          setSummary(response.data);
        } else {
          setError('Summary not found');
        }
      } catch (err) {
        console.error('Error fetching summary:', err);
        setError(err.message || 'Failed to load summary');
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchSummary();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
        <p className="text-sm text-gray-500">Loading summary...</p>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">Summary Not Found</h2>
        <p className="text-gray-500 max-w-md">
          The summary you are looking for does not exist or you do not have permission to view it.
        </p>
        <Link to="/dashboard">
          <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Button>
        </Link>
      </div>
    );
  }

  const createdAt = summary.created_at || summary.createdAt || new Date();
  const dateObj = new Date(createdAt);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const summaryText = summary.summary || '';
  const wordCount = summary.wordCount || summaryText.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const fileName = summary.file_name || summary.fileName || 'document.pdf';
  const originalFileUrl = summary.original_file_url || summary.originalFileUrl || '';
  const title = summary.title || 'PDF Summary';

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-8 max-w-5xl">
        <SummaryPageHeader
          date={formattedDate}
          time={readTime}
          title={title}
          fileName={fileName}
          originalFileUrl={originalFileUrl}
          summary={summaryText}
          createdAt={createdAt}
        />

        <SummaryPageBody summary={summaryText} wordCount={wordCount} />
      </div>
    </div>
  );
};

export default SummaryDetailPage;
