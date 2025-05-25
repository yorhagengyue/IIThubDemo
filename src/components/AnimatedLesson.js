import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play, Pause } from 'lucide-react';
import './AnimatedLesson.css';

export function AnimatedLesson({ lesson, isActive = true }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Parse lesson content into structured data
  const parseContent = (content) => {
    const lines = content.split('\n').filter(line => line.trim());
    const sections = [];
    let currentSec = null;

    lines.forEach(line => {
      if (line.startsWith('# ')) {
        if (currentSec) sections.push(currentSec);
        currentSec = {
          type: 'title',
          content: line.slice(2),
          items: []
        };
      } else if (line.startsWith('## ')) {
        if (currentSec) {
          currentSec.items.push({
            type: 'subtitle',
            content: line.slice(3)
          });
        }
      } else if (line.startsWith('- ')) {
        if (currentSec) {
          currentSec.items.push({
            type: 'bullet',
            content: line.slice(2)
          });
        }
      } else if (line.includes('`') && !line.startsWith('```')) {
        if (currentSec) {
          currentSec.items.push({
            type: 'code-inline',
            content: line
          });
        }
      } else if (line.trim()) {
        if (currentSec) {
          currentSec.items.push({
            type: 'text',
            content: line
          });
        }
      }
    });

    if (currentSec) sections.push(currentSec);
    return sections;
  };

  const sections = parseContent(lesson.content);

  // Auto-play control
  useEffect(() => {
    if (!isPlaying || !isActive) return;

    const timer = setTimeout(() => {
      if (currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
      }
    }, 3000 / animationSpeed);

    return () => clearTimeout(timer);
  }, [currentSection, isPlaying, sections.length, animationSpeed, isActive]);

  // Typewriter effect component
  const TypewriterText = ({ text, delay = 0, speed = 50 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      setDisplayText('');
      setIsComplete(false);
      
      const timer = setTimeout(() => {
        let i = 0;
        const typingTimer = setInterval(() => {
          if (i < text.length) {
            setDisplayText(text.slice(0, i + 1));
            i++;
          } else {
            setIsComplete(true);
            clearInterval(typingTimer);
          }
        }, speed / animationSpeed);

        return () => clearInterval(typingTimer);
      }, delay);

      return () => clearTimeout(timer);
    }, [text, delay, speed, animationSpeed]);

    return (
      <span className={`typewriter ${isComplete ? 'complete' : ''}`}>
        {displayText}
        {!isComplete && <span className="cursor">|</span>}
      </span>
    );
  };

  // CSS Demo component
  const CSSDemo = ({ property, value, element = 'div' }) => {
    const [showDemo, setShowDemo] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setShowDemo(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <motion.div 
        className="css-demo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="demo-code">
          <TypewriterText 
            text={`${element} { ${property}: ${value}; }`} 
            delay={500}
            speed={30}
          />
        </div>
        <motion.div 
          className="demo-preview"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={showDemo ? { 
            scale: 1, 
            opacity: 1,
            [property]: value 
          } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {element === 'div' ? 'Demo' : 'Text'}
        </motion.div>
      </motion.div>
    );
  };

  // Render individual content item
  const renderContentItem = (item, index) => {
    const itemDelay = index * 0.3;

    switch (item.type) {
      case 'subtitle':
        return (
          <motion.h2
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: itemDelay }}
            className="animated-subtitle"
          >
            <TypewriterText text={item.content} delay={itemDelay * 1000} />
          </motion.h2>
        );

      case 'bullet':
        return (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: itemDelay }}
            className="animated-bullet"
          >
            <motion.div
              className="bullet-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: itemDelay + 0.2 }}
            >
              •
            </motion.div>
            <TypewriterText text={item.content} delay={itemDelay * 1000 + 200} />
          </motion.li>
        );

      case 'code-inline':
        // Check if it contains a CSS property demonstration
        const cssMatch = item.content.match(/`([^`]+)`.*property/i); // Changed to be case-insensitive and match 'property'
        if (cssMatch) {
          const property = cssMatch[1];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: itemDelay }}
            >
              <p><TypewriterText text={item.content} delay={itemDelay * 1000} /></p>
              <CSSDemo property={property} value="royalblue" /> 
            </motion.div>
          );
        }
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: itemDelay }}
          >
            <TypewriterText text={item.content} delay={itemDelay * 1000} />
          </motion.p>
        );

      default:
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: itemDelay }}
            className="animated-text"
          >
            <TypewriterText text={item.content} delay={itemDelay * 1000} />
          </motion.p>
        );
    }
  };

  return (
    <div className="animated-lesson">
      {/* Control panel */}
      <div className="lesson-controls">
        <button 
          className="play-pause-btn"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        
        <div className="speed-control">
          <label>Speed: </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          />
          <span>{animationSpeed}x</span>
        </div>

        <div className="section-indicator">
          {currentSection + 1} / {sections.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="lesson-progress">
        <motion.div 
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content area */}
      <div className="lesson-content">
        <AnimatePresence mode="wait">
          {sections.map((section, sectionIndex) => (
            sectionIndex <= currentSection && (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
                className="lesson-section"
              >
                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="animated-title"
                >
                  <TypewriterText text={section.content} speed={30} />
                </motion.h1>

                {/* Content items */}
                <div className="section-items">
                  {section.items.map((item, itemIndex) => (
                    renderContentItem(item, itemIndex)
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="lesson-navigation">
        <button 
          className="nav-btn prev"
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
        >
          Previous Section
        </button>
        
        <button 
          className="nav-btn next"
          onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          disabled={currentSection >= sections.length - 1}
        >
          Next Section
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
} 