import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';

/**
 * CandidateLayout — modern careers-website shell: top navigation + content
 * (pages provide their own hero) + footer. Deliberately NO sidebar.
 */
const CandidateLayout = () => (
  <div className="flex min-h-screen flex-col bg-gray-50">
    <TopNav />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default CandidateLayout;
