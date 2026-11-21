import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:py-28 lg:px-12 transition-all animate-in max-w-7xl">
      <div className="flex">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
          <Badge
            variant="secondary"
            className="relative px-6 py-2 rounded-full font-medium bg-white group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="h-6 w-6 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </div>
      </div>

      <h1 className="font-bold py-6 text-center text-gray-900">
        Transform PDFs into{' '}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{' '}
        summaries
      </h1>

      <h2 className="text-lg sm:text-xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get beautiful summary reel of the document in seconds
      </h2>

      <div className="flex justify-center">
        <Button
          asChild
          variant="link"
          className="text-white mt-6 lg:mt-16 text-base sm:text-lg rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold transform transition duration-200 shadow-xl"
        >
          <Link
            to={isAuthenticated ? '/upload' : '/sign-up'}
            className="flex gap-2 items-center"
          >
            <span>Try Sommaire</span>
            <ArrowRight className="animate-pulse w-8 h-8" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
