import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 max-w-sm mb-6">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back Home</span>
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
