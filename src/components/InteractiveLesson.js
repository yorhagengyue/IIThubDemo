import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Lightbulb, BookOpen, Code } from 'lucide-react';
import './InteractiveLesson.css';

// Helper to strip HTML tags for plain text explanations
const stripHtml = (html) => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

export function InteractiveLesson({ lesson, isActive = true }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [currentCode, setCurrentCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Enhanced teaching steps for complete beginners - ultra simplified
  const parseSteps = (lesson) => {
    return [
      {
        id: 'recognize-canvas',
        title: 'Recognize the Canvas',
        subtitle: 'This is your paper to paint',
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
  /* COLORS_HERE */
}`
        },
        explanation: `
          <div class="detailed-explanation">
            <h4>Goal</h4>
            <p>Turn the gray box into blue using 3 lines of CSS</p>
            
            <h4>Current State</h4>
            <p>Right side: A gray box with "Hello CSS!" text</p>
            <p>Left side: Code that controls the box appearance</p>
            
            <h4>Next Steps</h4>
            <p>We'll add color code at line 16 comment</p>
            <p>You'll see the box change color instantly</p>
          </div>
        `,
        highlight: '/* COLORS_HERE */',
        tips: [
          '1. Observe the gray box on the right',
          '2. Notice the comment at line 16',
          '3. Prepare to add color code'
        ]
      },
      {
        id: 'understand-css-structure',
        title: 'CSS Syntax Rules',
        subtitle: 'Learn to talk with computers',
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
  /* COLORS_HERE */
}`
        },
        explanation: `
          <div class="detailed-explanation">
            <h4>CSS Basic Format</h4>
            <div class="code-example">
              <code>selector { property: value; }</code>
            </div>
            
            <h4>Real Example</h4>
            <p><strong>.box</strong> = Find the box</p>
            <p><strong>width: 200px;</strong> = Set width to 200 pixels</p>
            <p><strong>;</strong> = End of instruction</p>
            
            <h4>Coming Up</h4>
            <p>We'll add two new properties:</p>
            <ul>
              <li><strong>background-color</strong> - Background color</li>
              <li><strong>color</strong> - Text color</li>
            </ul>
          </div>
        `,
        highlight: '/* COLORS_HERE */',
        tips: [
          '1. CSS format: property: value;',
          '2. End each line with semicolon',
          '3. About to learn two color properties'
        ]
      },
      {
        id: 'add-background-color',
        title: 'Add Background Color',
        subtitle: 'Make the box blue',
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
        explanation: `
          <div class="detailed-explanation">
            <h4>What Just Happened</h4>
            <p>Added one line: <code>background-color: royalblue;</code></p>
            <p>Box background changed from gray to blue instantly</p>
            
            <h4>Code Breakdown</h4>
            <ul>
              <li><strong>background-color</strong> - Background color property</li>
              <li><strong>royalblue</strong> - CSS color name</li>
              <li><strong>;</strong> - End of instruction</li>
            </ul>
            
            <h4>Observe Changes</h4>
            <p>Only background changed, text/size/border stayed same</p>
            <p>But text became harder to read</p>
          </div>
        `,
        highlight: 'background-color: royalblue;',
        codeChange: {
          line: 16,
          text: '  background-color: royalblue;'
        },
        tips: [
          '1. Background successfully turned blue',
          '2. Text became hard to read',
          '3. Need to adjust text color'
        ]
      },
      {
        id: 'contrast-problem',
        title: 'Contrast Problem',
        subtitle: 'Why text is hard to read',
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
  /* TEXT_COLOR_HERE */
}`
        },
        explanation: `
          <div class="detailed-explanation">
            <h4>Contrast Rules</h4>
            <p><strong>Dark background → Light text</strong></p>
            <p><strong>Light background → Dark text</strong></p>
            
            <h4>Current Problem</h4>
            <p>Background: Blue (dark)</p>
            <p>Text: Black (dark)</p>
            <p>Result: Dark + Dark = Hard to read</p>
            
            <h4>Solution</h4>
            <p>Change text to white for good contrast</p>
            <p>Next step: <code>color: white;</code></p>
          </div>
        `,
        highlight: '/* TEXT_COLOR_HERE */',
        tips: [
          '1. Dark background needs light text',
          '2. Current contrast is insufficient',
          '3. About to add white text'
        ]
      },
      {
        id: 'add-text-color',
        title: 'Add Text Color',
        subtitle: 'Make text clear and readable',
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
        explanation: `
          <div class="detailed-explanation">
            <h4>Perfect!</h4>
            <p>Added: <code>color: white;</code></p>
            <p>Text is now clear and readable</p>
            
            <h4>Two Core Properties</h4>
            <ul>
              <li><strong>background-color</strong> - Controls background</li>
              <li><strong>color</strong> - Controls text</li>
            </ul>
            
            <h4>Professional Result</h4>
            <p>Blue-white is a classic professional combination</p>
            <p>Widely used in corporate websites and apps</p>
          </div>
        `,
        highlight: 'color: white;',
        codeChange: {
          line: 17,
          text: '  color: white;'
        },
        tips: [
          '1. Text is now clear and readable',
          '2. Mastered two core properties',
          '3. Created professional color scheme'
        ]
      },
      {
        id: 'practice-time',
        title: 'Practice Time',
        subtitle: 'Try other color combinations',
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
  background-color: /* TRY_COLORS */;
  color: /* TRY_TEXT_COLOR */;
}`
        },
        explanation: `
          <div class="detailed-explanation">
            <h4>Your Turn Now</h4>
            <p>Try modifying color values and see the effects</p>
            
            <h4>Colors You Can Try</h4>
            <ul>
              <li><strong>red, green, blue, purple</strong></li>
              <li><strong>orange, pink, gold, silver</strong></li>
              <li><strong>darkblue, lightblue, navy</strong></li>
            </ul>
            
            <h4>Remember Contrast Rules</h4>
            <p>Dark background with light text</p>
            <p>Light background with dark text</p>
            
            <h4>Experiment Suggestion</h4>
            <p>Try <code>background-color: green;</code> with <code>color: white;</code></p>
          </div>
        `,
        highlight: '/* TRY_COLORS */',
        tips: [
          '1. Modify color values to see effects',
          '2. Maintain good contrast',
          '3. Observe real-time changes'
        ]
      },
      {
        id: 'mastery-summary',
        title: 'Skill Mastery',
        subtitle: 'You are now a CSS color expert',
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
        explanation: `
          <div class="detailed-explanation">
            <h4>Congratulations! You've Mastered</h4>
            <ul>
              <li><strong>CSS Basic Syntax</strong> - property: value;</li>
              <li><strong>Background Colors</strong> - background-color</li>
              <li><strong>Text Colors</strong> - color</li>
              <li><strong>Contrast Principles</strong> - light/dark pairing</li>
            </ul>
            
            <h4>Real-World Applications</h4>
            <p>These skills can be used for:</p>
            <ul>
              <li>Website design</li>
              <li>App interfaces</li>
              <li>Digital products</li>
            </ul>
            
            <h4>Next Steps</h4>
            <p>Continue learning more CSS properties and techniques</p>
          </div>
        `,
        highlight: null,
        tips: [
          '1. Mastered CSS color fundamentals',
          '2. Understand contrast principles',
          '3. Can create professional color schemes'
        ]
      }
    ];
  };

  const steps = parseSteps(lesson);
  const currentStepData = steps[currentStep];

  // Enhanced typewriter effect with better synchronization
  const typeCode = useCallback(async (newCodeStr, codeChange) => {
    if (!codeChange || !currentCode) {
      setCurrentCode(newCodeStr);
      return;
    }

    setIsTyping(true);
    const baseCodeLines = currentCode.split('\n');
    const textToType = codeChange.text.trim();
    
    while (baseCodeLines.length <= codeChange.line) {
      baseCodeLines.push('');
    }

    for (let i = 0; i <= textToType.length; i++) {
      const tempLines = [...baseCodeLines];
      tempLines[codeChange.line] = textToType.slice(0, i);
      const updatedFileContent = tempLines.join('\n');
      setCurrentCode(updatedFileContent);
      await new Promise(resolve => setTimeout(resolve, 100 / animationSpeed));
    }

    setCurrentCode(newCodeStr);
    setIsTyping(false);
  }, [currentCode, animationSpeed]);

  const goToNextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Apply code changes with animation if specified
      if (steps[nextStep].codeChange) {
        typeCode(steps[nextStep].code['/styles.css'], steps[nextStep].codeChange);
      } else {
        setCurrentCode(steps[nextStep].code['/styles.css']);
      }
    }
  }, [currentStep, steps, typeCode]);

  const goToPrevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentCode(steps[prevStep].code['/styles.css']);
      setIsTyping(false);
    }
  };

  const resetLesson = () => {
    setCurrentStep(0);
    setCurrentCode(steps[0].code['/styles.css']);
    setIsPlaying(false);
    setIsTyping(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Initialize code with first step
  useEffect(() => {
    if (steps.length > 0) {
      setCurrentCode(steps[0].code['/styles.css']);
    }
  }, [steps]);

  // Enhanced auto-play with longer intervals for reading
  useEffect(() => {
    if (!isPlaying || !isActive || isTyping || currentStep >= steps.length - 1) return;

    const timer = setTimeout(() => {
      goToNextStep();
    }, 15000 / animationSpeed); // Increased to 15 seconds for complete beginners

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, isActive, isTyping, animationSpeed, steps.length, goToNextStep]);

  return (
    <div className="interactive-lesson">
      {/* Enhanced control panel with better UX */}
      <div className="lesson-controls">
        <div className="playback-controls">
          <button className="control-btn primary" onClick={togglePlay}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="control-btn secondary" onClick={resetLesson}>
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <div className="step-info">
          <div className="step-counter">
            <Code size={16} />
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="step-progress">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="speed-control">
          <label>Playback Speed: </label>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.25"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          />
          <span>{animationSpeed}x</span>
        </div>
      </div>

      {/* Main content area with improved layout */}
      <div className="lesson-main">
        {/* Enhanced narrative panel with larger text */}
        <div className="lesson-narrative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="narrative-content"
            >
              <div className="step-header">
                <h2 className="step-title">{currentStepData.title}</h2>
                <p className="step-subtitle">{currentStepData.subtitle}</p>
              </div>

              <div 
                className="step-explanation"
              >
                {stripHtml(currentStepData.explanation)}
              </div>

              {currentStepData.highlight && (
                <motion.div 
                  className="code-highlight"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="highlight-label">
                    <BookOpen size={18} />
                    New Code:
                  </div>
                  <div className="highlight-code">
                    {currentStepData.highlight}
                  </div>
                </motion.div>
              )}

              {currentStepData.tips && (
                <motion.div 
                  className="tips-section"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="tips-header">
                    <Lightbulb size={18} />
                    Learning Points:
                  </div>
                  <ul className="tips-list">
                    {currentStepData.tips.map((tip, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                      >
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced navigation with better accessibility */}
          <div className="narrative-navigation">
            <button 
              className="nav-btn prev"
              onClick={goToPrevStep}
              disabled={currentStep === 0}
              aria-label="Previous Step"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button 
              className="nav-btn next"
              onClick={goToNextStep}
              disabled={currentStep >= steps.length - 1}
              aria-label="Next Step"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Enhanced editor panel with better indicators */}
        <div className="lesson-editor">
          <div className="editor-header">
            <h4>Live Code Editor</h4>
            {isTyping && (
              <div className="typing-indicator">
                <span>Typing...</span>
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
          
          <Sandpack
            template="react"
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
              '/styles.css': {
                code: currentCode,
                active: true
              }
            }}
            options={{
              showNavigator: false,
              showTabs: false,
              showLineNumbers: true,
              showInlineErrors: true,
              wrapContent: true,
              editorHeight: '100%',
              autorun: true,
              autoReload: true,
              recompileMode: "immediate",
              recompileDelay: 200,
              activeFile: '/styles.css',
              visibleFiles: ['/styles.css'],
              closableTabs: false,
              readOnly: false,
              showPreview: true,
              showConsole: false
            }}
            theme="light"
            customSetup={{ 
              dependencies: {}
            }}
          />
        </div>
      </div>
    </div>
  );
} 