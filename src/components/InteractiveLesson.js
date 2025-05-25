import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import './InteractiveLesson.css';

export function InteractiveLesson({ lesson, isActive = true }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [currentCode, setCurrentCode] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const sandpackRef = useRef(null);

  // Parse teaching steps
  const parseSteps = (lesson) => {
    return [
      {
        id: 'intro',
        title: 'Welcome to the CSS Color World',
        subtitle: 'Let\'s explore how CSS adds color to web pages',
        code: {
          '/styles.css': `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.box {
  width: 200px;
  height: 100px;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}`
        },
        explanation: 'First, we have a simple box. It\'s white now, let\'s add some color to it!',
        highlight: null
      },
      {
        id: 'background-color',
        title: 'Add Background Color',
        subtitle: 'Using the background-color property',
        code: {
          '/styles.css': `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.box {
  width: 200px;
  height: 100px;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  background-color: royalblue;
}`
        },
        explanation: 'Great! We added background-color: royalblue, and now the box has a beautiful blue background.',
        highlight: 'background-color: royalblue;',
        codeChange: {
          line: 13,
          text: '  background-color: royalblue;'
        }
      },
      {
        id: 'text-color',
        title: 'Change Text Color',
        subtitle: 'Using the color property to make text clearer',
        code: {
          '/styles.css': `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.box {
  width: 200px;
  height: 100px;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  background-color: royalblue;
  color: white;
}`
        },
        explanation: 'Now we added color: white, making the text white and much clearer on the blue background.',
        highlight: 'color: white;',
        codeChange: {
          line: 14,
          text: '  color: white;'
        }
      },
      {
        id: 'complete',
        title: 'Complete!',
        subtitle: 'You\'ve mastered the basics of CSS colors',
        code: {
          '/styles.css': `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.box {
  width: 200px;
  height: 100px;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  background-color: royalblue;
  color: white;
}`
        },
        explanation: 'Congratulations! You\'ve learned how to use background-color and color properties. Now try modifying the code yourself!',
        highlight: null
      }
    ];
  };

  const steps = parseSteps(lesson);
  const currentStepData = steps[currentStep];

  // Initialize code
  useEffect(() => {
    if (steps.length > 0) {
      setCurrentCode(steps[0].code);
    }
  }, []);

  // Auto-play control
  useEffect(() => {
    if (!isPlaying || !isActive || isTyping || currentStep >= steps.length -1) return;

    const timer = setTimeout(() => {
      goToNextStep();
    }, 4000 / animationSpeed);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, isActive, isTyping, animationSpeed, steps.length]);

  // Typewriter effect for adding code
  const typeCode = async (newCode, codeChange) => {
    if (!codeChange || !currentCode['/styles.css']) {
      setCurrentCode(newCode);
      return;
    }

    setIsTyping(true);
    const baseCodeLines = currentCode['/styles.css'].split('\n');
    const textToType = codeChange.text.trim(); // Trim to avoid leading/trailing space issues in typing
    
    // Ensure the target line exists, or prepare to insert
    while (baseCodeLines.length <= codeChange.line) {
        baseCodeLines.push('');
    }
    
    // If the line is not empty, it implies we might be overwriting or inserting
    // For simplicity, this version inserts the new line and types it out.
    // A more complex version might compare and type diffs.
    const targetLineInitialContent = baseCodeLines[codeChange.line] || '';
    baseCodeLines.splice(codeChange.line, 0, ''); // Insert a blank line for typing

    for (let i = 0; i <= textToType.length; i++) {
      const typedText = textToType.slice(0, i);
      const tempCodeLines = [...baseCodeLines]; // Work on a copy
      tempCodeLines[codeChange.line] = typedText; // Type into the new blank line
      
      const updatedFileContent = tempCodeLines.join('\n');
      setCurrentCode(prev => ({ ...prev, '/styles.css': updatedFileContent }));

      await new Promise(resolve => setTimeout(resolve, 60 / animationSpeed)); // Adjusted typing speed
    }
    
    // Final state after typing should match the step's code accurately
    // This ensures that if typing was interrupted or had issues, it corrects to the final state.
    setCurrentCode(newCode);
    setIsTyping(false);
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStepIndex = currentStep + 1;
      const nextStepData = steps[nextStepIndex];
      setCurrentStep(nextStepIndex);
      
      if (nextStepData.codeChange) {
        typeCode(nextStepData.code, nextStepData.codeChange);
      } else {
        setCurrentCode(nextStepData.code);
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      const prevStepData = steps[prevStepIndex];
      setCurrentStep(prevStepIndex);
      // When going back, just set the code, don't re-type
      setCurrentCode(prevStepData.code);
    }
  };

  const resetLesson = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCurrentCode(steps[0].code);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Ensure initial code is set for Sandpack
  const sandpackFiles = currentCode && Object.keys(currentCode).length > 0 ? currentCode : steps[0]?.code || {};

  return (
    <div className="interactive-lesson">
      {/* Control panel */}
      <div className="lesson-controls">
        <div className="playback-controls">
          <button className="control-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause lesson" : "Play lesson"}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="control-btn" onClick={resetLesson} aria-label="Reset lesson">
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="step-info">
          <span className="step-counter">{currentStep + 1} / {steps.length}</span>
          <div className="step-progress">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="speed-control">
          <label htmlFor="speedRange">Speed: </label>
          <input
            id="speedRange"
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            aria-label="Animation speed"
          />
          <span>{animationSpeed}x</span>
        </div>
      </div>

      {/* Main content area */}
      <div className="lesson-main">
        {/* Left side: Narration and explanation */}
        <div className="lesson-narrative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep} // Ensures re-render on step change for animations
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="narrative-content"
            >
              <motion.h2 
                className="step-title"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              >
                {currentStepData.title}
              </motion.h2>
              
              <motion.h3 
                className="step-subtitle"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              >
                {currentStepData.subtitle}
              </motion.h3>

              <motion.p 
                className="step-explanation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
              >
                {currentStepData.explanation}
              </motion.p>

              {currentStepData.highlight && (
                <motion.div 
                  className="code-highlight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                >
                  <span className="highlight-label">New code:</span>
                  <code className="highlight-code">{currentStepData.highlight}</code>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="narrative-navigation">
            <button 
              className="nav-btn prev"
              onClick={goToPrevStep}
              disabled={currentStep === 0}
              aria-label="Previous step"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            <button 
              className="nav-btn next"
              onClick={goToNextStep}
              disabled={currentStep >= steps.length - 1}
              aria-label="Next step"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right side: Code editor */}
        <div className="lesson-editor">
          <div className="editor-header">
            <h4>Live Code Demo</h4>
            {isTyping && (
              <div className="typing-indicator">
                <span>Typing...</span> 
                {/* Simplified typing indicator for brevity */}
              </div>
            )}
          </div>
          
          <Sandpack
            key={currentStep} // Re-mount Sandpack on step change to ensure code updates reliably
            ref={sandpackRef}
            template="react" // Using react template for CSS/HTML structure
            files={{
              '/App.js': {
                code: `import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <div className="box">
        Hello CSS!
      </div>
    </div>
  );
}`,
                readOnly: true
              },
              ...sandpackFiles // Spread the current step's code, typically /styles.css
            }}
            options={{
              showNavigator: false,
              showTabs: true,
              showLineNumbers: true,
              showInlineErrors: false, // Keep false for cleaner demo UI
              wrapContent: true,
              editorHeight: '100%', // Make editor take full available height
              editorWidthPercentage: 50, // Default, can be adjusted
              autorun: true,
              autoReload: true,
              recompileMode: "immediate",
              recompileDelay: 100,
              readOnly: currentStep < steps.length - 1, // Make editable on the last step
              bundlerURL: "https://sandpack-bundler.codesandbox.io/", // Optional: specify bundler URL
              logLevel: 'error' // Reduce console noise from Sandpack
            }}
            theme="light" // Changed to light theme
            customSetup={{
              dependencies: {}
              // entry: "/index.js" // Default, ensure it matches your setup if changed
            }}
          />
        </div>
      </div>
    </div>
  );
} 