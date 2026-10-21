import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6 border border-blue-100">
        <FileQuestion className="h-8 w-8" />
      </div>
      <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">
        Error 404
      </span>
      <h1 className="text-3xl font-extrabold text-slate-900 font-heading sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 text-sm text-slate-600 max-w-md">
        The requested URL does not exist on the JSS Placement Intelligence Hub. Please check the address or return home.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Company Portal</span>
        </Link>
      </div>
    </div>
  );
};

