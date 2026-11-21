import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { cn } from '../../utils/utils';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for personal use',
    features: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9,
    description: 'Perfect for occasional use',
    features: [
      '20 PDF summaries per month',
      'Faster processing speed',
      'Priority email support',
      'Access to full summary library',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    description: 'Perfect for professionals and teams',
    features: [
      'Unlimited PDF summaries',
      'Fastest processing speed',
      'Access to full summary library',
      'Team collaboration features',
      'Early access to new features',
    ],
  },
];

const Pricing = () => {
  return (
    <section className="relative" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center mb-12 sm:mb-16 lg:mb-24">
          <h2 className="text-rose-500 font-bold uppercase text-xl">
            Pricing
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            Simple, transparent pricing for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ id, name, price, description, features }) => {
  const { isAuthenticated } = useAuth();

  const handlePaidPlanClick = () => {
    toast.info(`${name} Plan selected`, {
      description:
        'Stripe payment gateway will process this subscription once live Stripe keys are configured.',
    });
  };

  return (
    <div
      className={cn(
        'flex flex-col justify-between h-[25rem] md:h-[27rem] lg:h-[26rem] bg-white border border-gray-200 rounded-2xl shadow-sm transform hover:scale-105 transition duration-200 p-6',
        id === 'basic' && 'border-2 border-rose-300 shadow-md',
        id === 'pro' && 'border-2 border-rose-500 shadow-lg'
      )}
    >
      <div>
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>

        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-extrabold text-gray-900">${price}</span>
          <span className="text-xs text-gray-500">USD /month</span>
        </div>

        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="text-sm flex items-center gap-2 text-gray-700">
              <Check size={16} className="text-rose-600 shrink-0" strokeWidth={2.5} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        {id === 'free' ? (
          <Button
            asChild
            className="text-base w-full bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-rose-500 text-white transform transition duration-200 rounded-full"
          >
            <Link
              to={isAuthenticated ? '/upload' : '/sign-up'}
              className="w-full flex items-center gap-2 justify-center"
            >
              <span>{isAuthenticated ? 'Start Summarizing' : 'Get Started'}</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </Link>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handlePaidPlanClick}
            className={cn(
              'text-base w-full bg-gradient-to-r from-rose-800 to-rose-600 hover:from-rose-600 hover:to-rose-800 text-white transform transition duration-200 rounded-full',
              id === 'basic' && 'from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600',
              id === 'pro' && 'from-rose-900 to-rose-600 hover:from-rose-600 hover:to-rose-900'
            )}
          >
            <span className="w-full flex items-center gap-2 justify-center">
              <span>Subscribe to {name}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pricing;
