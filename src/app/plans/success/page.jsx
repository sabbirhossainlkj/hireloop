import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSubscription } from "@/lib/actions/subscription";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
 console.log(status)
  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    console.log(subsInfo)
    // update the user table about the new plan
    const result = await createSubscription(subsInfo)
    console.log(result)

    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 antialiased dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 text-center transition-all">
          {/* Success Checkmark Icon Animation */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-6 animate-bounce">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
            Payment Successful!
          </h1>

          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-6">
            Thank you for your purchase
          </p>

          <hr className="border-slate-100 dark:border-slate-800 my-4" />

          {/* Confirmation Message */}
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
            We appreciate your business! A confirmation email has been sent to{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded break-all">
              {customerEmail}
            </span>
            .
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full text-center bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm"
            >
              Go to Dashboard / Home
            </Link>

            <a
              href="mailto:orders@example.com"
              className="block w-full text-center bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium py-2.5 transition-colors"
            >
              Need help? Contact Support
            </a>
          </div>
        </div>
      </section>
    );
  }
}
