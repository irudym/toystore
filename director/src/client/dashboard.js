import React from 'react';

import AppContent from './components/app_content';
import Header from './components/header';


class Dashboard extends React.Component {
  render() {
    return (
      <AppContent>
        <Header title="Dashboard" />
        <div>
          Dashboard
        </div>
      </AppContent>
    );
  }
}

export default Dashboard;
