import { useState, useEffect } from 'react';

// Progress status enumeration
export const LEVEL_STATUS = {
  LOCKED: 'locked',
  AVAILABLE: 'available', 
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

// Progress management Hook
export function useProgress() {
  const [progress, setProgress] = useState({});
  const [currentLevel, setCurrentLevel] = useState(null);

  // Load progress from local storage
  useEffect(() => {
    const savedProgress = localStorage.getItem('learning_progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);
      } catch (error) {
        console.error('Failed to parse saved progress:', error);
        initializeProgress();
      }
    } else {
      initializeProgress();
    }
  }, []);

  // Initialize progress (first level available, others locked)
  const initializeProgress = () => {
    const initialProgress = {
      'css-basics-01': {
        status: LEVEL_STATUS.AVAILABLE,
        attempts: 0,
        completedAt: null,
        timeSpent: 0,
        hintsUsed: 0
      }
    };
    setProgress(initialProgress);
    saveProgress(initialProgress);
  };

  // Save progress to local storage
  const saveProgress = (newProgress) => {
    localStorage.setItem('learning_progress', JSON.stringify(newProgress));
  };

  // Get level status
  const getLevelStatus = (levelId) => {
    return progress[levelId]?.status || LEVEL_STATUS.LOCKED;
  };

  // Start level
  const startLevel = (levelId) => {
    const newProgress = {
      ...progress,
      [levelId]: {
        ...progress[levelId],
        status: LEVEL_STATUS.IN_PROGRESS,
        attempts: (progress[levelId]?.attempts || 0) + 1,
        startedAt: Date.now()
      }
    };
    setProgress(newProgress);
    saveProgress(newProgress);
    setCurrentLevel(levelId);
  };

  // Complete level
  const completeLevel = (levelId, nextLevelId = null) => {
    const now = Date.now();
    const startTime = progress[levelId]?.startedAt || now;
    const timeSpent = (progress[levelId]?.timeSpent || 0) + (now - startTime);

    const newProgress = {
      ...progress,
      [levelId]: {
        ...progress[levelId],
        status: LEVEL_STATUS.COMPLETED,
        completedAt: now,
        timeSpent
      }
    };

    // Unlock next level
    if (nextLevelId) {
      newProgress[nextLevelId] = {
        ...progress[nextLevelId],
        status: LEVEL_STATUS.AVAILABLE,
        attempts: 0,
        completedAt: null,
        timeSpent: 0,
        hintsUsed: 0
      };
    }

    setProgress(newProgress);
    saveProgress(newProgress);
  };

  // Record hint usage
  const recordHintUsage = (levelId) => {
    const newProgress = {
      ...progress,
      [levelId]: {
        ...progress[levelId],
        hintsUsed: (progress[levelId]?.hintsUsed || 0) + 1
      }
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  // Reset progress
  const resetProgress = () => {
    localStorage.removeItem('learning_progress');
    initializeProgress();
    setCurrentLevel(null);
  };

  // Get overall statistics
  const getStats = () => {
    const levels = Object.values(progress);
    const completed = levels.filter(l => l.status === LEVEL_STATUS.COMPLETED).length;
    const totalTime = levels.reduce((sum, l) => sum + (l.timeSpent || 0), 0);
    const totalAttempts = levels.reduce((sum, l) => sum + (l.attempts || 0), 0);
    
    return {
      completedLevels: completed,
      totalLevels: levels.length,
      totalTimeSpent: totalTime,
      totalAttempts,
      completionRate: levels.length > 0 ? (completed / levels.length) * 100 : 0
    };
  };

  return {
    progress,
    currentLevel,
    setCurrentLevel,
    getLevelStatus,
    startLevel,
    completeLevel,
    recordHintUsage,
    resetProgress,
    getStats
  };
} 