import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import BgGradient from '../components/common/BgGradient';
import NoSummaries from '../components/summaries/NoSummaries';
import SummaryCard from '../components/summaries/SummaryCard';
import { summaryApi } from '../api/summaryApi';
import { toast } from 'sonner';

const DashboardHeader = ({ totalCount = 0 }) => {
  const uploadLimit = 5;

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between gap-4 w-full mb-6">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-700 to-gray-950 text-transparent bg-clip-text mb-1">
            Your Summaries
          </h1>
          <p className="text-gray-500">
            Transform your PDFs into concise, actionable insights.
          </p>
        </div>
        <div>
          <Link to="/upload">
            <Button className="bg-gradient-to-r from-rose-500 to-rose-700 text-white hover:from-rose-600 hover:to-rose-800 rounded-full px-5 py-2.5 shadow-md flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>New Summary</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 text-rose-800">
        <p className="text-sm">
          You've used {totalCount} of {uploadLimit} uploads on the free plan.{' '}
          <Link
            to="/#pricing"
            className="text-rose-900 underline font-semibold underline-offset-4 inline-flex items-center gap-1 hover:text-rose-700 ml-1"
          >
            Click here to upgrade to Pro
            <ArrowRight className="w-4 h-4 inline-block" />
          </Link>{' '}
          for unlimited uploads.
        </p>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [summaries, setSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSummaries() {
      try {
        const response = await summaryApi.getAll();
        if (response?.success) {
          setSummaries(response.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch summaries:', error);
        toast.error('Failed to load your summaries');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSummaries();
  }, []);

  const handleDeleted = (deletedId) => {
    setSummaries((prev) =>
      prev.filter((item) => (item.id || item._id) !== deletedId)
    );
  };

  return (
    <div className="min-h-screen py-10 lg:py-14">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <div className="container mx-auto flex flex-col gap-6">
        <DashboardHeader totalCount={summaries.length} />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
            <p className="text-sm text-gray-500">Loading your summaries...</p>
          </div>
        ) : summaries.length === 0 ? (
          <NoSummaries />
        ) : (
          <div className="w-full mx-auto grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {summaries.map((summary) => (
              <SummaryCard
                key={summary.id || summary._id}
                summary={summary}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
