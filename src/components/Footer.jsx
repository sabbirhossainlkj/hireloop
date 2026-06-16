import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#050816] text-gray-400 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-blue-500">hire</span>
              <span className="text-orange-500">loop</span>
            </h2>

            <p className="max-w-xs leading-8 text-gray-500">
              The AI-native career platform. Built for people who
              take their work seriously.
            </p>

            <div className="flex items-center gap-3 mt-12">
              <Link
                href="#"
                className="w-11 h-11 rounded-lg bg-[#111827] flex items-center justify-center hover:bg-indigo-600 transition"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="w-11 h-11 rounded-lg bg-indigo-600 flex items-center justify-center"
              >
                <FaPinterestP />
              </Link>

              <Link
                href="#"
                className="w-11 h-11 rounded-lg bg-[#111827] flex items-center justify-center hover:bg-indigo-600 transition"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-indigo-500 font-semibold mb-6">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Job discovery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Worker AI
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Salary data
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-indigo-500 font-semibold mb-6">
              Navigations
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Career library
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-indigo-500 font-semibold mb-6">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Brand Guideline
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500">
            Copyright 2024 — Programming Hero
          </p>

          <div className="flex gap-6">
            <Link
              href="#"
              className="text-gray-500 hover:text-white transition"
            >
              Terms & Policy
            </Link>

            <Link
              href="#"
              className="text-gray-500 hover:text-white transition"
            >
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}