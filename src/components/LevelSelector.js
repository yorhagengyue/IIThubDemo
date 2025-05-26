import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle, Clock, Star, MoreVertical, RotateCcw, Search, Filter } from 'lucide-react';
import { LEVEL_STATUS } from '../hooks/useProgress';
import { difficultyConfig } from '../data/levels';
import './LevelSelector.css';

export function LevelSelector({ levels, progress, onSelectLevel, onResetProgress }) {
  const [showResetMenu, setShowResetMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const menuRef = useRef(null);

  // 临时调试信息
  console.log('LevelSelector - Progress data:', progress);
  console.log('LevelSelector - First level ID:', levels[0]?.id);
  console.log('LevelSelector - First level progress:', progress[levels[0]?.id]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowResetMenu(false);
      }
    };

    if (showResetMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResetMenu]);

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

  // Calculate global progress
  const calculateGlobalProgress = () => {
    const totalLevels = levels.length;
    const completedLevels = levels.filter(level => 
      progress[level.id]?.status === LEVEL_STATUS.COMPLETED
    ).length;
    const inProgressLevels = levels.filter(level => 
      progress[level.id]?.status === LEVEL_STATUS.IN_PROGRESS
    ).length;
    
    const completionRate = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;
    const progressRate = totalLevels > 0 ? ((completedLevels + inProgressLevels * 0.5) / totalLevels) * 100 : 0;
    
    return {
      completed: completedLevels,
      total: totalLevels,
      completionRate: Math.round(completionRate),
      progressRate: Math.round(progressRate)
    };
  };

  // Filter levels based on search and difficulty
  const filteredLevels = levels.filter(level => {
    const matchesSearch = level.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         level.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || level.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const globalProgress = calculateGlobalProgress();

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      onResetProgress();
      setShowResetMenu(false);
    }
  };

  return (
    <div className="level-selector">
      {/* Global Progress Header */}
      <div className="global-progress-section">
        <div className="progress-stats">
          <h2 className="progress-title">Your Learning Journey</h2>
          <div className="progress-numbers">
            <span className="progress-percentage">{globalProgress.completionRate}% Complete</span>
            <span className="progress-fraction">{globalProgress.completed}/{globalProgress.total} Lessons</span>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-track">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${globalProgress.progressRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Header with Controls */}
      <div className="header">
        <div className="header-main">
          <h1>CSS Learning Levels</h1>
          <p>Master CSS core skills through interactive exercises</p>
        </div>
        
        <div className="header-controls">
          {/* Search and Filter */}
          <div className="search-filter-section">
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-dropdown">
              <Filter size={16} />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Menu Button */}
          <div className="menu-container" ref={menuRef}>
            <button 
              className="menu-button"
              onClick={() => setShowResetMenu(!showResetMenu)}
              title="More options"
            >
              <MoreVertical size={18} />
            </button>
            
            {showResetMenu && (
              <div className="menu-dropdown">
                <button 
                  className="menu-item danger"
                  onClick={handleResetProgress}
                >
                  <RotateCcw size={16} />
                  Reset All Progress
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Levels Grid */}
      <div className="levels-grid">
        {filteredLevels.map((level, index) => {
          const levelProgress = progress[level.id];
          let status;
          if (index === 0) {
            status = levelProgress?.status || LEVEL_STATUS.AVAILABLE;
          } else {
            status = levelProgress?.status || LEVEL_STATUS.LOCKED;
          }
          
          const difficulty = difficultyConfig[level.difficulty];
          const isClickable = status !== LEVEL_STATUS.LOCKED;
          const isLocked = status === LEVEL_STATUS.LOCKED;
          const isCompleted = status === LEVEL_STATUS.COMPLETED;

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
              {/* Achievement Badge for Completed */}
              {isCompleted && (
                <div className="achievement-badge">
                  <CheckCircle size={20} />
                </div>
              )}

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

                {/* Unlock Condition for Locked Levels */}
                {isLocked && index > 0 && (
                  <div className="unlock-condition">
                    <Lock size={14} />
                    <span>Complete previous lesson to unlock</span>
                  </div>
                )}

                {levelProgress && !isLocked && (
                  <div className="progress-info">
                    {status === LEVEL_STATUS.COMPLETED && (
                      <div className="completion-info">
                        <div className="completion-time">
                          <span>Completed in: {formatTime(levelProgress.timeSpent)}</span>
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
                
                {/* Action Button on Hover */}
                {isClickable && (
                  <div className="action-button">
                    {status === LEVEL_STATUS.COMPLETED ? 'Review' : 
                     status === LEVEL_STATUS.IN_PROGRESS ? 'Continue' : 'Start'}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No Results Message */}
      {filteredLevels.length === 0 && (
        <div className="no-results">
          <p>No lessons found matching your criteria.</p>
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setFilterDifficulty('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
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