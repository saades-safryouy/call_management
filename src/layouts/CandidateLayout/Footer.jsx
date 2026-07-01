import React from 'react';
import { PhoneCall } from 'lucide-react';

/**
 * Candidate footer — careers-portal style.
 */
const Footer = () => (
  <footer className="border-t border-gray-200 bg-white">
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <PhoneCall className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-gray-900">Attijariwafa Bank</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Careers Portal</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <span className="cursor-default hover:text-primary">About</span>
          <span className="cursor-default hover:text-primary">Life at AWB</span>
          <span className="cursor-default hover:text-primary">Privacy</span>
          <span className="cursor-default hover:text-primary">Contact</span>
        </nav>
      </div>
      <div className="mt-8 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Attijariwafa Bank. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
