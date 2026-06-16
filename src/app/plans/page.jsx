"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
// Importing Gravity UI Icons for clear item categorization and layout accents

export default function PricingPage() {
  // Toggle state between 'seekers' and 'recruiters'
  const [viewMode, setViewMode] = useState("seekers");
  // Open state management for the FAQ Accordion items
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Job Seekers Pricing Tier Structure
  const seekerPlans = [
    {
      name: "Free",
      id: "seeker_free",
      price: "$0",
      period: "/forever",
      description: "Essential features to get your job search started.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile setup",
        "Standard email alerts",
      ],
      isPopular: false,

      buttonText: "Get Started Free",
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: "$19",
      period: "/month",
      description:
        "Perfect for active candidates looking to accelerate their tracking.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Advanced application tracking status",
        "Comprehensive salary insights",
      ],
      isPopular: true, // Highlights this card uniquely

      buttonText: "Upgrade to Pro",
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: "$39",
      period: "/month",
      description:
        "Maximum visibility and unlimited possibilities for your career.",
      features: [
        "Everything in Pro",
        "Unlimited job applications",
        "Profile boost directly to recruiters",
        "Early access to newly posted jobs",
        "Priority customer support",
      ],
      isPopular: false,

      buttonText: "Go Premium",
    },
  ];

  // Recruiters Pricing Tier Structure
  const recruiterPlans = [
    {
      name: "Free",
      id: 'recruiter_free',
      price: "$0",
      period: "/forever",
      description: "Great for a company's first year of hiring talent.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management system",
        "Standard listing visibility layout",
      ],
      isPopular: false,

      buttonText: "Post a Job Free",
    },
    {
      name: "Growth",
      id: 'recruiter_growth',
      price: "$49",
      period: "/month",
      description: "Scale your hiring infrastructure with seamless pipelines.",
      features: [
        "Up to 10 active job posts",
        "Full applicant tracking tools",
        "Basic operational analytics",
        "Standard email tech support",
      ],
      isPopular: true,

      buttonText: "Start Growth Plan",
    },
    {
      name: "Enterprise",
      id: 'recruiter_enterprise',
      price: "$149",
      period: "/month",
      description:
        "Advanced solutions designed for high-volume talent sourcing.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics & reporting dashboard",
        "Featured job listings styling priority",
        "Team collaboration controls",
        "Custom workspace branding",
        "24/7 Priority engineering support",
      ],
      isPopular: false,
      buttonText: "Contact Enterprise",
    },
  ];

  // FAQ Accordion Dataset
  const faqItems = [
    {
      question: "How does the plan switching mechanism work?",
      answer:
        "You can upgrade, downgrade, or cancel your active premium subscription at any moment straight from your billing profile dashboard settings. Upgrades take effect instantly, while downgrades apply at the end of your current cycle.",
    },
    {
      question: "What is your cancellation and refund policy?",
      answer:
        "If you are not fully satisfied, you can cancel your monthly commitment anytime. We offer a hassle-free 14-day refund window for initial subscriptions if your allocated limits haven't been substantially used up.",
    },
    {
      question: "Which payment methods do you securely accept?",
      answer:
        "We support all major international credit/debit cards including Visa, Mastercard, and American Express, processed securely through Stripe. We also offer PayPal support for select regions.",
    },
    {
      question: "What happens when I hit my monthly application cap?",
      answer:
        "If you hit your application allowance limit, your submission capability pauses for the current cycle. You can either wait for your monthly renewal date or upgrade your tier level to instantly resume sending applications.",
    },
  ];

  const activePlans = viewMode === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* --- 1. Page Header --- */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Flexible Plans for Everyone
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Choose the clear path built to advance your career or discover
            top-tier talent effortlessly.
          </p>

          {/* --- 2. Segmented Toggle Control --- */}
          <div className="pt-4">
            <div className="inline-flex p-1 bg-zinc-200/70 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setViewMode("seekers")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  viewMode === "seekers"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setViewMode("recruiters")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  viewMode === "recruiters"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                For Recruiters
              </button>
            </div>
          </div>
        </div>

        {/* --- 3. Grid Layout for Pricing Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {activePlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-zinc-900 border rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
                plan.isPopular
                  ? "border-primary ring-2 ring-primary/20 scale-102 z-10"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-black text-xs font-bold rounded-full tracking-wide uppercase shadow-sm">
                  Most Popular
                </span>
              )}

              <div>
                {/* Header Sub-section */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2 rounded-lg ${plan.isPopular ? "bg-primary/10 text-primary" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"}`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {plan.name}
                  </h3>
                </div>

                <p className="text-sm text-zinc-400 dark:text-zinc-500 min-h-[40px] mb-6">
                  {plan.description}
                </p>

                {/* Pricing Indicator */}
                <div className="flex items-baseline text-zinc-900 dark:text-zinc-100 mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                    {plan.period}
                  </span>
                </div>

                <hr className="border-zinc-100 dark:border-zinc-800 mb-6" />

                {/* Dynamic Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li
                      key={featureIdx}
                      className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300"
                    >
                      <span className="text-primary mt-0.5 shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* strip from */}
              <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="plan_id" value={plan.id} />
                <section>
                  <button type="submit" role="link">
                    Checkout
                  </button>
                </section>
              </form>

              {/* Card Action Button using Hero UI defaults */}
              <Button
                color={plan.isPopular ? "primary" : "default"}
                variant={plan.isPopular ? "solid" : "bordered"}
                className="w-full font-semibold py-2.5 shadow-sm"
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 justify-center mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                  </button>

                  <div
                    className={`transition-all duration-200 ease-in-out border-zinc-100 dark:border-zinc-800/60 ${
                      isOpen
                        ? "max-h-40 border-t p-5 text-zinc-600 dark:text-zinc-400"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
