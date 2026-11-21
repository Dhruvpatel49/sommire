import React from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const NoSummaries = () => {
  return (
    <div className="flex justify-center h-full flex-col items-center mx-auto mt-16 max-w-md text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-rose-100 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-4 text-rose-500">
        <FileText className="w-8 h-8" />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-xl font-bold text-gray-800">No Summaries yet</h2>
        <p className="text-sm text-gray-500 mb-4">
          Upload your first PDF document to generate an AI-powered summary reel in seconds.
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-rose-500 to-rose-700 text-white hover:from-rose-600 hover:to-rose-800 rounded-full px-6 py-2.5 shadow-md"
        >
          <Link to="/upload" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Your First Summary</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NoSummaries;
