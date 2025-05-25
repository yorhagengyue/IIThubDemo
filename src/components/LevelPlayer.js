import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sandpack } from '@codesandbox/sandpack-react';
import { ArrowLeft, Lightbulb, CheckCircle, XCircle, Trophy, Clock, Edit3, Eye } from 'lucide-react';
import { useCodeValidation } from '../utils/codeValidator';
import { InteractiveLesson } from './InteractiveLesson';
import { levels } from '../data/levels';
import './LevelPlayer.css';

export function LevelPlayer({ 
  level, 
  onBack, 
  onComplete, 
  progressHook
}) {
  const [currentCode, setCurrentCode] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [validationResult, setValidationResult] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [startTime] = useState(Date.now());
  const [viewMode, setViewMode] = useState('interactive');
  
  const { validate } = useCodeValidation(level, currentCode);
  const progress = progressHook.progress[level.id];

  useEffect(() => {
    if (level?.files) {
      const activeFile = Object.keys(level.files).find(key => level.files[key]?.active || key === '/styles.css');
      if (activeFile && level.files[activeFile]) {
        setCurrentCode(level.files[activeFile].code);
      }
    }
  }, [level, viewMode]);

  useEffect(() => {
    if (viewMode === 'practice' && currentCode && level?.validation) {
      const result = validate();
      setValidationResult(result);
      
      if (result.isValid && !showSuccess) {
        setShowSuccess(true);
        setTimeout(() => {
          const currentIndex = levels.findIndex(l => l.id === level.id);
          const nextLevel = levels[currentIndex + 1];
          onComplete(level.id, nextLevel?.id);
        }, 2000);
      }
    }
  }, [currentCode, level, validate, onComplete, showSuccess, viewMode]);

  const handleCodeChange = (files) => {
    const activeFile = Object.keys(files).find(key => 
      level.files[key]?.active || key === '/styles.css'
    );
    if (activeFile && files[activeFile]) {
      setCurrentCode(files[activeFile].code);
    }
  };

  const handleShowHint = () => {
    setShowHints(true);
    progressHook.recordHintUsage(level.id);
  };

  const handleNextHint = () => {
    if (currentHintIndex < level.lesson.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`;
  };

  const renderLessonContent = (content) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) return <h1 key={index}>{line.slice(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={index}>{line.slice(3)}</h2>;
        if (line.startsWith('- ')) return <li key={index}>{line.slice(2)}</li>;
        if (line.includes('`') && !line.startsWith('```')) {
          const parts = line.split('`');
          return <p key={index}>{parts.map((part, i) => i % 2 === 0 ? part : <code key={i}>{part}</code>)}</p>;
        }
        if (line.trim() === '') return <br key={index} />;
        return <p key={index}>{line}</p>;
      });
  };

  return (
    <div className="level-player">
      <AnimatePresence>
        {showSuccess && (
          <motion.div className="success-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="success-content" initial={{ scale: 0.5, y: 50 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", damping: 15 }}>
              <Trophy className="success-icon" />
              <h2>Level Complete!</h2>
              <p>Congratulations on mastering this skill</p>
              <div className="success-stats">
                <div className="stat"><Clock size={16} /><span>Time: {formatTime(Date.now() - startTime)}</span></div>
                <div className="stat"><Lightbulb size={16} /><span>Hints: {progress?.hintsUsed || 0}</span></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="level-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Levels
        </button>
        <div className="level-info">
          <h1>{level.title}</h1>
          <div className="level-meta">
            <span>Attempts: {progress?.attempts || 1}</span>
            <span>Time: {formatTime(Date.now() - startTime)}</span>
          </div>
        </div>
        <div className="level-actions">
          <button 
            className={`view-toggle-btn ${viewMode === 'interactive' ? 'active-interactive' : 'active-practice'}`}
            onClick={() => setViewMode(viewMode === 'interactive' ? 'practice' : 'interactive')}
          >
            {viewMode === 'interactive' ? <><Edit3 size={16} /> Try It Yourself</> : <><Eye size={16} /> View Interactive Demo</>}
          </button>
          {viewMode === 'practice' && (
            <button 
              className="hint-button"
              onClick={handleShowHint}
              disabled={showHints && currentHintIndex >= level.lesson.hints.length - 1}
            >
              <Lightbulb size={16} />
              {showHints ? 'Next Hint' : 'Get Hint'}
            </button>
          )}
        </div>
      </div>

      <div className={`level-main-area view-mode-${viewMode}`}>
        {viewMode === 'interactive' && (
          <InteractiveLesson 
            lesson={level.lesson} 
            isActive={!showSuccess}
          />
        )}

        {viewMode === 'practice' && (
          <>
            <div className="lesson-panel-practice">
              <div className="lesson-content-markdown">
                {renderLessonContent(level.lesson.content)}
              </div>
              {validationResult && (
                <div className="validation-panel">
                  <div className="validation-header">
                    <h3>Validation Result</h3>
                    <div className="progress-indicator">{validationResult.passedRules}/{validationResult.totalRules}</div>
                  </div>
                  <div className="validation-rules">
                    {validationResult.errors.map((error, index) => (
                      <div key={index} className="validation-rule error"><XCircle size={16} /><span>{error.message}</span></div>
                    ))}
                    {Array.from({ length: validationResult.passedRules }).map((_, index) => (
                      <div key={`passed-${index}`} className="validation-rule success"><CheckCircle size={16} /><span>Requirement {index + 1} completed</span></div>
                    ))}
                  </div>
                </div>
              )}
              <AnimatePresence>
                {showHints && (
                  <motion.div className="hints-panel" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <div className="hints-header"><Lightbulb size={16} /><span>Hint {currentHintIndex + 1}/{level.lesson.hints.length}</span></div>
                    <div className="hint-content">{level.lesson.hints[currentHintIndex]}</div>
                    {currentHintIndex < level.lesson.hints.length - 1 && (
                      <button className="next-hint-button" onClick={handleNextHint}>Next Hint</button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="editor-panel">
              <Sandpack
                key={level.id}
                template="react"
                files={level.files}
                options={{
                  showNavigator: false,
                  showTabs: true,
                  showLineNumbers: true,
                  showInlineErrors: true,
                  wrapContent: true,
                  editorHeight: 'calc(100vh - 200px)',
                  autorun: true,
                  autoReload: true,
                  recompileMode: "immediate",
                  recompileDelay: 300
                }}
                theme="light"
                customSetup={{ dependencies: {} }}
                onFilesChange={handleCodeChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
} 