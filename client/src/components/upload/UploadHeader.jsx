import React from 'react';
import { Badge } from '../ui/Badge';
import { Sparkles } from 'lucide-react';

const UploadHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant="secondary"
            className="relative px-6 py-2 rounded-full font-medium bg-white group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="h-5 w-5 text-rose-600 mr-1.5 animate-pulse" />
            <p className="text-base text-rose-600 font-semibold">
              AI-Powered Content Creation
            </p>
          </Badge>
        </div>
      </div>

      <div>
        <h1 className="font-bold py-6 text-center text-gray-900">
          Start Uploading{' '}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">Your PDFs</span>
            <span
              className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg">
          Upload your PDF and let our AI do the magic
        </p>
      </div>

      <div className="flex w-full items-center gap-4 py-6 max-w-md">
        <span className="h-px flex-grow bg-gray-200" />
        <span className="text-gray-500 text-sm uppercase tracking-wider font-medium">Upload Document</span>
        <span className="h-px flex-grow bg-gray-200" />
      </div>
    </div>
  );
};

export default UploadHeader;
