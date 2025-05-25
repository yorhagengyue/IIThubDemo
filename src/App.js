import React, { useState } from 'react';
import { LevelSelector } from './components/LevelSelector';
import { LevelPlayer } from './components/LevelPlayer';
import { useProgress } from './hooks/useProgress';
import { levels } from './data/levels';
import './App.css';

function App() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const progressHook = useProgress();

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    progressHook.startLevel(level.id);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    progressHook.setCurrentLevel(null);
  };

  const handleLevelComplete = (levelId, nextLevelId) => {
    progressHook.completeLevel(levelId, nextLevelId);
  };

  return (
    <div className="App">
      {!selectedLevel && (
        <header className="App-header">
          <h1>CSS Interactive Learning Platform</h1>
          <p>Master CSS through hands-on practice</p>
        </header>
      )}
      
      <main className="App-main">
        {selectedLevel ? (
          <LevelPlayer
            level={selectedLevel}
            onBack={handleBackToLevels}
            onComplete={handleLevelComplete}
            progressHook={progressHook}
          />
        ) : (
          <LevelSelector
            levels={levels}
            progress={progressHook.progress}
            onSelectLevel={handleLevelSelect}
            onResetProgress={progressHook.resetProgress}
          />
        )}
      </main>
      
      {!selectedLevel && (
        <footer className="App-footer">
          <p>&copy; 2024 CSS Learning Platform. Learn CSS step by step.</p>
        </footer>
      )}
    </div>
  );
}

export default App; 