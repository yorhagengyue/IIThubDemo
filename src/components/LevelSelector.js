import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle, Clock, Star } from 'lucide-react';
import { LEVEL_STATUS } from '../hooks/useProgress';
import { difficultyConfig } from '../data/levels';
import './LevelSelector.css';

export function LevelSelector({ levels, progress, onSelectLevel, onResetProgress }) {
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case LEVEL_STATUS.COMPLETED:
        return <CheckCircle className="status-icon completed" />;
      case LEVEL_STATUS.IN_PROGRESS:
        return <Play className="status-icon in-progress" />;
      case LEVEL_STATUS.AVAILABLE:
        return <Play className="status-icon available" />;
      default:
        return <Lock className="status-icon locked" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case LEVEL_STATUS.COMPLETED:
        return 'Completed';
      case LEVEL_STATUS.IN_PROGRESS:
        return 'In Progress';
      case LEVEL_STATUS.AVAILABLE:
        return 'Available';
      default:
        return 'Locked';
    }
  };

  return (
    <div className="level-selector">
      <div className="header">
        <h1>CSS Learning Levels</h1>
        <p>Master CSS core skills through interactive exercises</p>
        <button 
          className="reset-button"
          onClick={onResetProgress}
          title="Reset all progress"
        >
          Reset Progress
        </button>
      </div>

      <div className="levels-grid">
        {levels.map((level, index) => {
          const levelProgress = progress[level.id];
          const status = levelProgress?.status || LEVEL_STATUS.LOCKED;
          const difficulty = difficultyConfig[level.difficulty];
          const isClickable = status !== LEVEL_STATUS.LOCKED;

          return (
            <motion.div
              key={level.id}
              className={`level-card ${status} ${isClickable ? 'clickable' : ''}`}
              onClick={() => isClickable && onSelectLevel(level)}
              whileHover={isClickable ? { scale: 1.02, y: -2 } : {}}
              whileTap={isClickable ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="level-header">
                <div className="level-number">#{index + 1}</div>
                <div className="level-status">
                  {getStatusIcon(status)}
                </div>
              </div>

              <div className="level-content">
                <h3 className="level-title">{level.title}</h3>
                <p className="level-description">{level.description}</p>
                
                <div className="level-meta">
                  <div className="difficulty">
                    <span className="difficulty-icon">{difficulty.icon}</span>
                    <span className="difficulty-label">{difficulty.label}</span>
                  </div>
                  <div className="estimated-time">
                    <Clock size={14} />
                    <span>{level.estimatedTime}</span>
                  </div>
                </div>

                {levelProgress && (
                  <div className="progress-info">
                    {status === LEVEL_STATUS.COMPLETED && (
                      <div className="completion-info">
                        <div className="completion-time">
                          <span>Completion time: {formatTime(levelProgress.timeSpent)}</span>
                        </div>
                        {levelProgress.attempts > 1 && (
                          <div className="attempts">
                            <span>Attempts: {levelProgress.attempts}</span>
                          </div>
                        )}
                        {levelProgress.hintsUsed > 0 && (
                          <div className="hints">
                            <span>Hints used: {levelProgress.hintsUsed}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {status === LEVEL_STATUS.IN_PROGRESS && (
                      <div className="in-progress-info">
                        <span>Continue learning</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="level-footer">
                <span className="status-text">{getStatusText(status)}</span>
                {status === LEVEL_STATUS.COMPLETED && (
                  <div className="stars">
                    {[1, 2, 3].map(star => (
                      <Star 
                        key={star} 
                        size={16} 
                        className={`star ${getStarRating(levelProgress) >= star ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Calculate star rating based on performance
function getStarRating(levelProgress) {
  if (!levelProgress || levelProgress.status !== LEVEL_STATUS.COMPLETED) {
    return 0;
  }

  let stars = 1; // Base completion star

  // Fast completion bonus
  if (levelProgress.timeSpent < 60000) { // Within 1 minute
    stars++;
  }

  // Low hint usage bonus
  if (levelProgress.hintsUsed === 0) {
    stars++;
  } else if (levelProgress.hintsUsed <= 1) {
    stars += 0.5;
  }

  // Low attempt count bonus
  if (levelProgress.attempts === 1) {
    stars += 0.5;
  }

  return Math.min(3, Math.floor(stars));
} 