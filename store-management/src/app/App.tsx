import React, { useState } from 'react';
import { ShopOwnerDashboard } from './components/ShopOwnerDashboard';
import PartsMarketplace from './components/PartsMarketplace';
import { ShopOwnerApplicationForm } from './components/ShopOwnerApplicationForm';
import { Toaster } from 'sonner';

export type UserRole = 'shop-owner';

export interface User {
  email: string;
  role: UserRole;
}

type Screen =
  | 'home'
  | 'dashboard'
  | 'parts-marketplace'
  | 'shop-owner-application'
  | 'application-submitted';

const defaultShopOwner: User = {
  email: 'owner@appliassist.com',
  role: 'shop-owner',
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigateToHome = () => setCurrentScreen('home');
  const handleNavigateToDashboard = () => setCurrentScreen('dashboard');
  const handleNavigateToPartsMarketplace = () => setCurrentScreen('parts-marketplace');
  const handleNavigateToShopOwnerApplication = () => setCurrentScreen('shop-owner-application');
  const handleApplicationSubmitted = () => setCurrentScreen('application-submitted');

  const handleSelectProduct = (_product: any) => {
    // Part details are not yet wired in this module. This placeholder keeps the marketplace interactive.
  };

  if (currentScreen === 'dashboard') {
    return <ShopOwnerDashboard user={defaultShopOwner} onLogout={handleNavigateToHome} />;
  }

  if (currentScreen === 'parts-marketplace') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={handleNavigateToHome}
            className="mb-6 inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Back to home
          </button>
          <PartsMarketplace onSelectProduct={handleSelectProduct} onBack={handleNavigateToHome} />
        </div>
      </div>
    );
  }

  if (currentScreen === 'shop-owner-application') {
    return (
      <ShopOwnerApplicationForm
        onComplete={handleApplicationSubmitted}
        onBack={handleNavigateToHome}
      />
    );
  }

  if (currentScreen === 'application-submitted') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-900">Application Submitted</h1>
          <p className="mt-4 text-slate-600">
            Thank you for submitting your shop owner application. Our team will review it and reach out with next steps.
          </p>
          <button
            onClick={handleNavigateToHome}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1E2F4F] px-6 py-3 text-white transition hover:bg-[#16273f]"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">APPLIASSIST</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Store Management Hub</h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Access the shop owner dashboard and parts management tools from one place.
            </p>
          </div>
          <div className="space-x-3">
            <button
              onClick={handleNavigateToDashboard}
              className="rounded-full bg-[#1E2F4F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16273f]"
            >
              Go to Dashboard
            </button>
            <button
              onClick={handleNavigateToPartsMarketplace}
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Browse Parts
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <span className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-700">Shop Owner</span>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Shop Owner Dashboard</h2>
            <p className="mt-4 text-slate-600">
              Manage products, orders, and inventory in your appliance parts store.
            </p>
            <button
              onClick={handleNavigateToDashboard}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1E2F4F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16273f]"
            >
              Open Dashboard
            </button>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-700">Parts Marketplace</span>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Browse Inventory</h2>
            <p className="mt-4 text-slate-600">
              Explore listed appliance parts and stock details for your store.
            </p>
            <button
              onClick={handleNavigateToPartsMarketplace}
              className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              View Marketplace
            </button>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-sm font-semibold text-sky-700">Apply</span>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Become a Store Owner</h2>
            <p className="mt-4 text-slate-600">
              Submit your shop owner application to unlock the dashboard and inventory workflow.
            </p>
            <button
              onClick={handleNavigateToShopOwnerApplication}
              className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Apply Now
            </button>
          </div>
        </div>
      </main>

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
