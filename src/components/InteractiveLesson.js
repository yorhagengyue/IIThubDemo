import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Lightbulb, BookOpen } from 'lucide-react';
import './InteractiveLesson.css';

export function InteractiveLesson({ lesson, isActive = true }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [currentCode, setCurrentCode] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const sandpackRef = useRef(null);

  // Enhanced teaching steps with detailed explanations
  const parseSteps = (lesson) => {
    return [
      {
        id: 'intro',
        title: '🎨 欢迎来到CSS颜色世界',
        subtitle: '让我们一步步学习如何为网页添加美丽的颜色',
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
  /* 我们将在这里添加颜色属性 */
}`
        },
        explanation: `
          <div class="detailed-explanation">
            <h4>🔍 当前状态分析</h4>
            <p>现在我们有一个简单的盒子元素，它目前是白色背景，黑色文字。让我们来为它添加一些颜色！</p>
            
            <h4>📚 CSS颜色基础知识</h4>
            <ul>
              <li><strong>background-color</strong>：控制元素的背景颜色</li>
              <li><strong>color</strong>：控制文字的颜色</li>
              <li><strong>颜色值</strong>：可以使用关键词、十六进制、RGB等格式</li>
            </ul>
            
            <h4>🎯 学习目标</h4>
            <p>在接下来的步骤中，我们将学会：</p>
            <ol>
              <li>如何设置背景颜色</li>
              <li>如何设置文字颜色</li>
              <li>如何选择合适的颜色搭配</li>
            </ol>
          </div>
        `,
        highlight: null,
        tips: [
          '💡 CSS颜色是网页设计的基础',
          '🎨 好的颜色搭配能提升用户体验',
          '📖 我们将从最基本的颜色属性开始学习'
        ]
      },
      {
        id: 'background-color-intro',
        title: '🎨 认识background-color属性',
        subtitle: '学习如何为元素添加背景颜色',
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
  /* 即将添加背景颜色 */
}`
        },
        explanation: `
          <div class="detailed-explanation">
            <h4>📖 background-color属性详解</h4>
            <p><code>background-color</code> 是CSS中最常用的属性之一，它用来设置元素的背景颜色。</p>
            
            <h4>🔧 语法格式</h4>
            <div class="code-example">
              <code>background-color: 颜色值;</code>
            </div>
            
            <h4>🌈 颜色值的表示方法</h4>
            <ul>
              <li><strong>关键词</strong>：red, blue, green, royalblue 等</li>
              <li><strong>十六进制</strong>：#FF0000, #0000FF, #4169E1 等</li>
              <li><strong>RGB</strong>：rgb(255, 0, 0), rgb(65, 105, 225) 等</li>
              <li><strong>RGBA</strong>：rgba(65, 105, 225, 0.8) 带透明度</li>
            </ul>
            
            <h4>✨ 即将使用的颜色</h4>
            <p>我们将使用 <code>royalblue</code> 这个颜色关键词，它是一种优雅的蓝色。</p>
          </div>
        `,
        highlight: null,
        tips: [
          '💡 royalblue是CSS预定义的颜色关键词',
          '🎨 颜色关键词比十六进制更容易记忆',
          '📏 background-color会填充整个元素区域'
        ]
      },
      {
        id: 'background-color-apply',
        title: '✨ 添加背景颜色',
        subtitle: '实际应用background-color属性',
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
            <h4>🎉 太棒了！背景颜色已添加</h4>
            <p>我们成功添加了 <code>background-color: royalblue;</code>，现在盒子有了美丽的蓝色背景！</p>
            
            <h4>🔍 代码分析</h4>
            <div class="code-breakdown">
              <p><code>background-color:</code> - 属性名，告诉浏览器我们要设置背景颜色</p>
              <p><code>royalblue</code> - 颜色值，这是一种深蓝色</p>
              <p><code>;</code> - 分号，CSS语句的结束标志</p>
            </div>
            
            <h4>🎨 颜色效果观察</h4>
            <ul>
              <li>背景从白色变成了蓝色</li>
              <li>文字仍然是黑色</li>
              <li>边框保持不变</li>
            </ul>
            
            <h4>⚠️ 发现问题</h4>
            <p>黑色文字在蓝色背景上的对比度不够好，阅读起来有些困难。接下来我们需要调整文字颜色。</p>
          </div>
        `,
        highlight: 'background-color: royalblue;',
        codeChange: {
          line: 13,
          text: '  background-color: royalblue;'
        },
        tips: [
          '✅ 背景颜色设置成功！',
          '👀 注意观察颜色变化效果',
          '🤔 思考：文字颜色是否需要调整？'
        ]
      },
      {
        id: 'color-intro',
        title: '📝 认识color属性',
        subtitle: '学习如何设置文字颜色',
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
  /* 即将添加文字颜色 */
}`
        },
        explanation: `
          <div class="detailed-explanation">
            <h4>📖 color属性详解</h4>
            <p><code>color</code> 属性用来设置元素内文字的颜色，它是CSS中最基础的属性之一。</p>
            
            <h4>🔧 语法格式</h4>
            <div class="code-example">
              <code>color: 颜色值;</code>
            </div>
            
            <h4>🎯 为什么要改变文字颜色？</h4>
            <ul>
              <li><strong>可读性</strong>：确保文字在背景上清晰可见</li>
              <li><strong>对比度</strong>：良好的对比度提升用户体验</li>
              <li><strong>美观性</strong>：合适的颜色搭配更加美观</li>
            </ul>
            
            <h4>🎨 颜色搭配原则</h4>
            <p>在深色背景上使用浅色文字，在浅色背景上使用深色文字，这样可以获得最佳的可读性。</p>
            
            <h4>✨ 我们的选择</h4>
            <p>由于背景是深蓝色(royalblue)，我们将使用白色(white)作为文字颜色。</p>
          </div>
        `,
        highlight: null,
        tips: [
          '📚 color属性只影响文字颜色',
          '🎨 白色文字在蓝色背景上对比度很好',
          '👁️ 良好的对比度是网页可访问性的重要因素'
        ]
      },
      {
        id: 'color-apply',
        title: '🌟 设置文字颜色',
        subtitle: '应用color属性改善文字可读性',
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
            <h4>🎉 完美！文字颜色设置成功</h4>
            <p>我们添加了 <code>color: white;</code>，现在文字变成了白色，在蓝色背景上非常清晰！</p>
            
            <h4>🔍 效果对比</h4>
            <div class="comparison">
              <p><strong>之前</strong>：黑色文字 + 蓝色背景 = 对比度不足</p>
              <p><strong>现在</strong>：白色文字 + 蓝色背景 = 对比度优秀</p>
            </div>
            
            <h4>📊 技术分析</h4>
            <ul>
              <li><strong>可读性</strong>：大幅提升，文字清晰易读</li>
              <li><strong>美观度</strong>：蓝白搭配经典优雅</li>
              <li><strong>可访问性</strong>：符合WCAG对比度标准</li>
            </ul>
            
            <h4>🎨 颜色搭配技巧</h4>
            <p>蓝色和白色是经典的颜色搭配，常用于：</p>
            <ul>
              <li>企业网站的主色调</li>
              <li>按钮和链接的设计</li>
              <li>导航栏和标题区域</li>
            </ul>
          </div>
        `,
        highlight: 'color: white;',
        codeChange: {
          line: 14,
          text: '  color: white;'
        },
        tips: [
          '✅ 文字颜色设置完成！',
          '👀 观察对比度的显著改善',
          '🎨 蓝白搭配是经典的设计选择'
        ]
      },
      {
        id: 'complete',
        title: '🏆 恭喜完成！',
        subtitle: '你已经掌握了CSS颜色的基础知识',
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
            <h4>🎉 学习成果总结</h4>
            <p>恭喜你！你已经成功学会了CSS颜色的基础应用。让我们回顾一下学到的内容：</p>
            
            <h4>📚 知识点回顾</h4>
            <div class="knowledge-summary">
              <div class="knowledge-item">
                <h5>1. background-color属性</h5>
                <p>用于设置元素的背景颜色，语法：<code>background-color: 颜色值;</code></p>
              </div>
              <div class="knowledge-item">
                <h5>2. color属性</h5>
                <p>用于设置文字颜色，语法：<code>color: 颜色值;</code></p>
              </div>
              <div class="knowledge-item">
                <h5>3. 颜色搭配原则</h5>
                <p>深色背景配浅色文字，浅色背景配深色文字，确保良好的对比度</p>
              </div>
            </div>
            
            <h4>🚀 下一步建议</h4>
            <ul>
              <li>尝试使用不同的颜色关键词</li>
              <li>学习十六进制颜色值</li>
              <li>探索RGB和RGBA颜色格式</li>
              <li>练习更多的颜色搭配</li>
            </ul>
            
            <h4>💡 实践建议</h4>
            <p>现在你可以在右侧的代码编辑器中尝试修改颜色值，看看不同颜色的效果！</p>
          </div>
        `,
        highlight: null,
        tips: [
          '🎓 你已经掌握了CSS颜色基础！',
          '🔧 现在可以自己动手实践了',
          '🌟 继续学习更多CSS属性吧！'
        ]
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
    }, 6000 / animationSpeed); // Increased time for reading detailed content

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, isActive, isTyping, animationSpeed, steps.length]);

  // Enhanced typewriter effect for adding code
  const typeCode = async (newCode, codeChange) => {
    if (!codeChange || !currentCode['/styles.css']) {
      setCurrentCode(newCode);
      return;
    }

    setIsTyping(true);
    const baseCodeLines = currentCode['/styles.css'].split('\n');
    const textToType = codeChange.text.trim();
    
    while (baseCodeLines.length <= codeChange.line) {
        baseCodeLines.push('');
    }
    
    const targetLineInitialContent = baseCodeLines[codeChange.line] || '';
    baseCodeLines.splice(codeChange.line, 0, '');

    for (let i = 0; i <= textToType.length; i++) {
      const typedText = textToType.slice(0, i);
      const tempCodeLines = [...baseCodeLines];
      tempCodeLines[codeChange.line] = typedText;
      
      const updatedFileContent = tempCodeLines.join('\n');
      setCurrentCode(prev => ({ ...prev, '/styles.css': updatedFileContent }));

      await new Promise(resolve => setTimeout(resolve, 80 / animationSpeed));
    }
    
    setCurrentCode(newCode);
    setIsTyping(false);
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      if (steps[nextStep].codeChange) {
        typeCode(steps[nextStep].code, steps[nextStep].codeChange);
      } else {
        setCurrentCode(steps[nextStep].code);
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentCode(steps[prevStep].code);
    }
  };

  const resetLesson = () => {
    setCurrentStep(0);
    setCurrentCode(steps[0].code);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="interactive-lesson">
      {/* Enhanced control panel */}
      <div className="lesson-controls">
        <div className="playback-controls">
          <button className="control-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="control-btn" onClick={resetLesson}>
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <div className="step-info">
          <div className="step-counter">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="step-progress">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

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
      </div>

      {/* Main content area */}
      <div className="lesson-main">
        {/* Enhanced narrative panel */}
        <div className="lesson-narrative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="narrative-content"
            >
              <div className="step-header">
                <h2 className="step-title">{currentStepData.title}</h2>
                <p className="step-subtitle">{currentStepData.subtitle}</p>
              </div>

              <div 
                className="step-explanation"
                dangerouslySetInnerHTML={{ __html: currentStepData.explanation }}
              />

              {currentStepData.highlight && (
                <motion.div 
                  className="code-highlight"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="highlight-label">
                    <BookOpen size={16} />
                    New Code Added:
                  </div>
                  <div className="highlight-code">
                    {currentStepData.highlight}
                  </div>
                </motion.div>
              )}

              {currentStepData.tips && (
                <motion.div 
                  className="tips-section"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="tips-header">
                    <Lightbulb size={16} />
                    Quick Tips:
                  </div>
                  <ul className="tips-list">
                    {currentStepData.tips.map((tip, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced navigation */}
          <div className="narrative-navigation">
            <button 
              className="nav-btn prev"
              onClick={goToPrevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button 
              className="nav-btn next"
              onClick={goToNextStep}
              disabled={currentStep >= steps.length - 1}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Enhanced editor panel */}
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
            ref={sandpackRef}
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
              ...currentCode
            }}
            options={{
              showNavigator: false,
              showTabs: true,
              showLineNumbers: true,
              showInlineErrors: true,
              wrapContent: true,
              editorHeight: 'calc(100vh - 300px)',
              autorun: true,
              autoReload: true,
              recompileMode: "immediate",
              recompileDelay: 300
            }}
            theme="dark"
            customSetup={{ dependencies: {} }}
          />
        </div>
      </div>
    </div>
  );
} 