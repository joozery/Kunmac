import React from 'react';
import DashboardOverview from './pages/DashboardOverview';
import ManageCars from './pages/ManageCars';
import ManageArticles from './pages/ManageArticles';
import ManageContacts from './pages/ManageContacts';
import Settings from './pages/Settings';

function MainContent({ selectedPage }) {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      {selectedPage === 'overview' && <DashboardOverview />}
      {selectedPage === 'cars' && <ManageCars />}
      {selectedPage === 'articles' && <ManageArticles />}
      {selectedPage === 'contacts' && <ManageContacts />}
      {selectedPage === 'settings' && <Settings />}
    </main>
  );
}

export default MainContent; 