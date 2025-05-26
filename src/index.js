import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Initialize main app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize stagewise toolbar only in development mode
if (process.env.NODE_ENV === 'development') {
  import('@stagewise/toolbar-react').then(({ StagewiseToolbar }) => {
    // Create a separate container for the toolbar
    const toolbarContainer = document.createElement('div');
    toolbarContainer.id = 'stagewise-toolbar-root';
    document.body.appendChild(toolbarContainer);

    // Create a separate React root for the toolbar
    const toolbarRoot = ReactDOM.createRoot(toolbarContainer);
    
    // Basic toolbar configuration
    const stagewiseConfig = {
      plugins: []
    };

    toolbarRoot.render(
      <StagewiseToolbar config={stagewiseConfig} />
    );
  }).catch((error) => {
    console.warn('Failed to load stagewise toolbar:', error);
  });
} 