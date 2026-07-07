import React from 'react';
import { Link } from 'react-router-dom';

export default function DevHub() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 p-8">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-800">Developer Testing Hub</h1>
          <p className="text-slate-500">Fast navigation for all configured routes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* PUBLIC GUEST ROUTES */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-700 border-b pb-2">Guest / Public</h2>
            <div className="flex flex-col gap-2 text-sm font-bold">
              <Link to="/" className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-center">Real Landing Page</Link>
              <Link to="/courses" className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-center">Courses Overview</Link>
              <Link to="/course/1" className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-center">Course Details (ID: 1)</Link>
              <Link to="/trainer/1" className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-center">Trainer Details (ID: 1)</Link>
              <Link to="/contact" className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-center">Contact</Link>
              <Link to="/login" className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-center">Sign In</Link>
              <Link to="/signup" className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-center">Sign Up</Link>
            </div>
          </div>

          {/* STUDENT & COMPANY */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-700 border-b pb-2">Student & Company</h2>
            <div className="flex flex-col gap-2 text-sm font-bold">
              <Link to="/student/dashboard" className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800 p-2 rounded-lg text-center">Student Dashboard</Link>
              <Link to="/student/profile" className="bg-yellow-50 hover:bg-yellow-100 text-yellow-800 p-2 rounded-lg text-center">Student Profile</Link>
              <Link to="/company/contract" className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 p-2 rounded-lg text-center mt-2">Business Contract</Link>
            </div>
          </div>

          {/* TRAINER & ADMIN */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-700 border-b pb-2">Trainer & Admin</h2>
            <div className="flex flex-col gap-2 text-sm font-bold">
              <Link to="/trainer/dashboard" className="bg-purple-50 hover:bg-purple-100 text-purple-800 p-2 rounded-lg text-center">Trainer Dashboard</Link>
              <Link to="/trainer/profile" className="bg-purple-50 hover:bg-purple-100 text-purple-800 p-2 rounded-lg text-center">Trainer Profile</Link>
              <Link to="/admin/dashboard" className="bg-red-50 hover:bg-red-100 text-red-800 p-2 rounded-lg text-center mt-2">Admin Dashboard</Link>
              <Link to="/admin/approvals" className="bg-red-50 hover:bg-red-100 text-red-800 p-2 rounded-lg text-center">Courses Approval</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}