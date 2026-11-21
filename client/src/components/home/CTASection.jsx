import React from 'react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CTASection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative bg-gray-50/70 py-16 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-gray-900">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="mx-auto max-w-[650px] text-gray-600 md:text-lg">
              Transform lengthy documents into concise summaries with our
              AI-powered tool.
            </p>
          </div>

          <div>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-slate-900 to-rose-600 hover:from-rose-600 hover:to-slate-900 text-white shadow-xl transition-all duration-200"
            >
              <Link
                to={isAuthenticated ? '/upload' : '/sign-up'}
                className="flex items-center justify-center gap-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
