
import React from 'react';
import { Check, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '0',
      desc: 'Perfect for exploring AI art',
      features: ['5 images per day', 'Standard resolution', 'Community styles', 'Basic support'],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '19',
      desc: 'For serious creators & designers',
      features: ['100 images per day', 'Ultra HD resolution', 'Private generation', 'All premium styles', 'Priority support'],
      cta: 'Go Pro Now',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '49',
      desc: 'Team collaboration & high volume',
      features: ['Unlimited generations', 'API access', 'Team accounts (5 seats)', 'Custom models', 'Dedicated manager'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6">Simple, Transparent <span className="gradient-text">Pricing</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Whether you're just starting out or scaling a business, we have a plan that fits your creative needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative p-8 rounded-3xl glass-morphism border ${
              plan.popular ? 'border-purple-500 shadow-2xl shadow-purple-500/10' : 'border-gray-800'
            } flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                <Zap size={12} fill="white" /> Recommended
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">${plan.price}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <p className="text-gray-400 mt-4 text-sm">{plan.desc}</p>
            </div>
            
            <div className="space-y-4 mb-10 flex-grow">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-800 text-gray-500'}`}>
                    <Check size={12} />
                  </div>
                  {f}
                </div>
              ))}
            </div>
            
            <button className={`w-full py-4 rounded-xl font-bold transition-all ${
              plan.popular ? 'gradient-bg text-white hover:opacity-90' : 'bg-white text-black hover:bg-gray-200'
            }`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center text-gray-500 text-sm">
        <p>All plans include a 7-day money-back guarantee. Prices in USD.</p>
      </div>
    </div>
  );
};

export default Pricing;
