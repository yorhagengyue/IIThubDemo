import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Lightbulb, BookOpen, Globe, Code, Palette, Zap } from 'lucide-react';
import './ConceptualLesson.css';

export function ConceptualLesson({ lesson, isActive = true }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Web development fundamentals teaching steps
  const conceptSteps = [
    {
      id: 'welcome',
      title: 'Welcome to Web Development',
      subtitle: 'Understanding the three core technologies for building websites',
      icon: <Globe size={48} />,
      content: `
        <div class="concept-intro">
          <h3>What is Web Development?</h3>
          <p>Web development is the process of creating websites and web applications. Every website you visit, from simple blogs to complex social media platforms, is built using three core technologies that work together seamlessly.</p>
          
          <div class="stats-grid">
            <div class="stat-item">
              <h4>4.9B+</h4>
              <p>Internet users worldwide</p>
            </div>
            <div class="stat-item">
              <h4>1.8B+</h4>
              <p>Websites on the internet</p>
            </div>
            <div class="stat-item">
              <h4>25+</h4>
              <p>Years of web evolution</p>
            </div>
          </div>
          
          <div class="analogy-box">
            <h4>🏠 Building a House Analogy</h4>
            <p>Think of building a website like constructing a house:</p>
            <ul>
              <li><strong>HTML</strong> = The house frame and structure (foundation, walls, rooms)</li>
              <li><strong>CSS</strong> = Paint, decoration, and furniture (colors, layout, style)</li>
              <li><strong>JavaScript</strong> = Electrical systems and smart devices (interactivity, functionality)</li>
            </ul>
            <p>Just as you need all three elements to create a livable, beautiful, and functional home, you need HTML, CSS, and JavaScript to create a complete web experience.</p>
          </div>
          
          <div class="timeline-preview">
            <h4>📚 What You'll Learn Today</h4>
            <div class="preview-steps">
              <span>HTML Fundamentals</span>
              <span>CSS Styling</span>
              <span>JavaScript Interactivity</span>
              <span>How They Connect</span>
              <span>Real-World Examples</span>
              <span>Your Learning Path</span>
            </div>
          </div>
        </div>
      `,
      highlights: [
        'Websites are built with three core technologies',
        'Each technology has a specific and important purpose',
        'They work together to create complete web experiences',
        'Understanding their roles is key to web development success'
      ]
    },
    {
      id: 'html-intro',
      title: 'HTML - The Skeleton of Web Pages',
      subtitle: 'HyperText Markup Language - The Foundation of the Web',
      icon: <Code size={48} />,
      content: `
        <div class="tech-explanation">
          <h3>What is HTML?</h3>
          <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It provides the basic structure and content of every website you visit. Think of it as the skeleton that holds everything together.</p>
          
          <div class="history-box">
            <h4>📜 Brief History</h4>
            <p>HTML was created by Tim Berners-Lee in 1990 at CERN. It started as a simple way to share documents between researchers and has evolved into the foundation of the modern web.</p>
          </div>
          
          <div class="feature-grid">
            <div class="feature-item">
              <h4>📝 Content Structure</h4>
              <p>Defines headings, paragraphs, lists, and other content elements using semantic tags</p>
              <div class="example-code">
                &lt;h1&gt;Main Title&lt;/h1&gt;<br>
                &lt;p&gt;Paragraph text&lt;/p&gt;<br>
                &lt;ul&gt;&lt;li&gt;List item&lt;/li&gt;&lt;/ul&gt;
              </div>
            </div>
            <div class="feature-item">
              <h4>🔗 Hyperlink System</h4>
              <p>Creates connections and navigation between pages, the "HyperText" in HTML</p>
              <div class="example-code">
                &lt;a href="page.html"&gt;Link&lt;/a&gt;<br>
                &lt;nav&gt;Navigation menu&lt;/nav&gt;
              </div>
            </div>
            <div class="feature-item">
              <h4>📱 Semantic Meaning</h4>
              <p>Helps search engines, screen readers, and other tools understand content structure</p>
              <div class="example-code">
                &lt;header&gt;Page header&lt;/header&gt;<br>
                &lt;main&gt;Main content&lt;/main&gt;<br>
                &lt;footer&gt;Page footer&lt;/footer&gt;
              </div>
            </div>
            <div class="feature-item">
              <h4>🖼️ Media Embedding</h4>
              <p>Inserts images, videos, audio, and other multimedia content</p>
              <div class="example-code">
                &lt;img src="photo.jpg" alt="Description"&gt;<br>
                &lt;video controls&gt;&lt;/video&gt;<br>
                &lt;audio controls&gt;&lt;/audio&gt;
              </div>
            </div>
          </div>
          
          <div class="example-box">
            <h4>HTML's Role in Action</h4>
            <p>HTML tells the browser: "This is a heading, this is a paragraph, this is a button, this is an image." It creates the content hierarchy and meaning that both humans and machines can understand.</p>
            
            <div class="comparison-table">
              <div class="comparison-row">
                <div class="comparison-label">Without HTML:</div>
                <div class="comparison-value">Just plain text with no structure</div>
              </div>
              <div class="comparison-row">
                <div class="comparison-label">With HTML:</div>
                <div class="comparison-value">Organized, meaningful, and accessible content</div>
              </div>
            </div>
          </div>
        </div>
      `,
      highlights: [
        'HTML defines web page structure and content',
        'Uses semantic tags to mark different content types',
        'Foundation of all web pages and applications',
        'Enables accessibility and search engine optimization',
        'Created the concept of hypertext and web linking'
      ]
    },
    {
      id: 'css-intro',
      title: 'CSS - The Beautician of Web Pages',
      subtitle: 'Cascading Style Sheets - Making the Web Beautiful',
      icon: <Palette size={48} />,
      content: `
        <div class="tech-explanation">
          <h3>What is CSS?</h3>
          <p>CSS (Cascading Style Sheets) is responsible for the visual presentation of web pages. It transforms plain HTML into beautiful, engaging, and user-friendly interfaces. Without CSS, the web would be a very boring place!</p>
          
          <div class="history-box">
            <h4>🎨 The Styling Revolution</h4>
            <p>Before CSS (pre-1996), styling was mixed with HTML content. CSS separated presentation from content, revolutionizing web design and making websites more maintainable and flexible.</p>
          </div>
          
          <div class="feature-grid">
            <div class="feature-item">
              <h4>🎨 Visual Design</h4>
              <p>Controls colors, fonts, backgrounds, and all visual elements that make websites attractive</p>
              <div class="example-code">
                color: #3366ff;<br>
                font-family: Arial, sans-serif;<br>
                background: linear-gradient(45deg, blue, purple);
              </div>
            </div>
            <div class="feature-item">
              <h4>📐 Layout Control</h4>
              <p>Manages position, size, spacing, and arrangement of elements on the page</p>
              <div class="example-code">
                display: flex;<br>
                justify-content: center;<br>
                margin: 20px auto;
              </div>
            </div>
            <div class="feature-item">
              <h4>✨ Animation & Effects</h4>
              <p>Creates smooth transitions, hover effects, and engaging animations</p>
              <div class="example-code">
                transition: all 0.3s ease;<br>
                transform: scale(1.1);<br>
                animation: fadeIn 2s;
              </div>
            </div>
            <div class="feature-item">
              <h4>📱 Responsive Design</h4>
              <p>Adapts layouts to different devices and screen sizes automatically</p>
              <div class="example-code">
                @media (max-width: 768px) {<br>
                &nbsp;&nbsp;font-size: 14px;<br>
                }
              </div>
            </div>
          </div>
          
          <div class="css-powers">
            <h4>🚀 The Power of CSS</h4>
            <div class="power-grid">
              <div class="power-item">
                <strong>Separation of Concerns:</strong> Keep content (HTML) separate from presentation (CSS)
              </div>
              <div class="power-item">
                <strong>Reusability:</strong> One CSS file can style multiple HTML pages
              </div>
              <div class="power-item">
                <strong>Maintainability:</strong> Change the entire site's look by editing CSS
              </div>
              <div class="power-item">
                <strong>Performance:</strong> CSS files are cached, making sites load faster
              </div>
            </div>
          </div>
          
          <div class="example-box">
            <h4>CSS's Role in Action</h4>
            <p>CSS tells the browser: "Make this heading blue and 24px, center this button and add a shadow, create a 3-column layout, and make it all responsive on mobile devices."</p>
          </div>
        </div>
      `,
      highlights: [
        'CSS controls all visual aspects of web pages',
        'Separates content from presentation for better organization',
        'Creates beautiful, responsive user interfaces',
        'Enables animations and interactive visual effects',
        'Makes websites accessible across all devices'
      ]
    },
    {
      id: 'javascript-intro',
      title: 'JavaScript - The Brain of Web Pages',
      subtitle: 'The Programming Language That Brings Web Pages to Life',
      icon: <Zap size={48} />,
      content: `
        <div class="tech-explanation">
          <h3>What is JavaScript?</h3>
          <p>JavaScript is a powerful programming language that adds interactivity, dynamic behavior, and complex functionality to web pages. It transforms static websites into dynamic, responsive applications that can react to user input and provide real-time experiences.</p>
          
          <div class="history-box">
            <h4>⚡ The Language of the Web</h4>
            <p>Created by Brendan Eich in just 10 days in 1995, JavaScript has become one of the most popular programming languages in the world. It's the only programming language that runs natively in web browsers.</p>
          </div>
          
          <div class="feature-grid">
            <div class="feature-item">
              <h4>🖱️ User Interaction</h4>
              <p>Responds to clicks, keyboard input, mouse movements, and touch gestures</p>
              <div class="example-code">
                button.addEventListener('click', function() {<br>
                &nbsp;&nbsp;alert('Button clicked!');<br>
                });
              </div>
            </div>
            <div class="feature-item">
              <h4>🔄 Dynamic Content</h4>
              <p>Updates page content in real-time without requiring a page refresh</p>
              <div class="example-code">
                document.getElementById('content').innerHTML = 'New content';<br>
                element.style.display = 'block';
              </div>
            </div>
            <div class="feature-item">
              <h4>🌐 Data Communication</h4>
              <p>Exchanges data with servers, APIs, and databases to create dynamic experiences</p>
              <div class="example-code">
                fetch('/api/data')<br>
                &nbsp;&nbsp;.then(response => response.json())<br>
                &nbsp;&nbsp;.then(data => console.log(data));
              </div>
            </div>
            <div class="feature-item">
              <h4>🎮 Complex Applications</h4>
              <p>Powers games, calculators, interactive maps, and sophisticated web applications</p>
              <div class="example-code">
                class Game {<br>
                &nbsp;&nbsp;constructor() { this.score = 0; }<br>
                &nbsp;&nbsp;play() { /* game logic */ }<br>
                }
              </div>
            </div>
          </div>
          
          <div class="js-capabilities">
            <h4>🎯 What JavaScript Can Do</h4>
            <div class="capability-list">
              <div class="capability-item">
                <strong>Form Validation:</strong> Check user input before submission
              </div>
              <div class="capability-item">
                <strong>Interactive Maps:</strong> Google Maps, navigation, location services
              </div>
              <div class="capability-item">
                <strong>Real-time Chat:</strong> Instant messaging and communication
              </div>
              <div class="capability-item">
                <strong>Data Visualization:</strong> Charts, graphs, and interactive dashboards
              </div>
              <div class="capability-item">
                <strong>E-commerce:</strong> Shopping carts, payment processing, inventory
              </div>
              <div class="capability-item">
                <strong>Games:</strong> Browser-based games and interactive entertainment
              </div>
            </div>
          </div>
          
          <div class="example-box">
            <h4>JavaScript's Role in Action</h4>
            <p>JavaScript tells the browser: "When the user clicks this button, show a popup; when they type in this field, validate the email format; when they scroll down, load more content; when they hover over this element, show a tooltip."</p>
          </div>
        </div>
      `,
      highlights: [
        'JavaScript adds interactivity and dynamic behavior',
        'Handles user actions and events in real-time',
        'Creates complex web applications and games',
        'Communicates with servers and external APIs',
        'The only programming language that runs in browsers'
      ]
    },
    {
      id: 'how-they-work',
      title: 'How They Work Together',
      subtitle: 'Understanding the Perfect Collaboration of HTML, CSS, and JavaScript',
      icon: <Globe size={48} />,
      content: `
        <div class="collaboration-explanation">
          <h3>The Perfect Trinity</h3>
          <p>HTML, CSS, and JavaScript work together like a perfectly orchestrated symphony. Each has its own role, but together they create experiences that are greater than the sum of their parts.</p>
          
          <div class="workflow-steps">
            <div class="workflow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>HTML Builds the Foundation</h4>
                <p>HTML creates the basic structure and content of the web page, defining what elements exist and their semantic meaning. It's like laying the foundation and framing of a house.</p>
                <div class="step-details">
                  <strong>What it provides:</strong> Content structure, semantic meaning, accessibility foundation, SEO framework
                </div>
              </div>
            </div>
            
            <div class="workflow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>CSS Adds Beauty and Layout</h4>
                <p>CSS takes the HTML structure and transforms it into a visually appealing, well-organized interface. It's like decorating and furnishing the house.</p>
                <div class="step-details">
                  <strong>What it provides:</strong> Visual design, layout control, responsive behavior, animations and effects
                </div>
              </div>
            </div>
            
            <div class="workflow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>JavaScript Brings It to Life</h4>
                <p>JavaScript adds interactivity and dynamic behavior, making the website respond to user actions and provide real-time functionality. It's like adding electricity and smart systems to the house.</p>
                <div class="step-details">
                  <strong>What it provides:</strong> User interaction, dynamic content updates, data processing, complex functionality
                </div>
              </div>
            </div>
          </div>
          
          <div class="real-examples">
            <h4>🌟 Real-World Examples</h4>
            
            <div class="example-showcase">
              <div class="example-item">
                <h5>📧 Contact Form</h5>
                <ul>
                  <li><strong>HTML:</strong> Creates form fields, labels, and submit button</li>
                  <li><strong>CSS:</strong> Styles the form layout, colors, and responsive design</li>
                  <li><strong>JavaScript:</strong> Validates input, shows error messages, submits data</li>
                </ul>
              </div>
              
              <div class="example-item">
                <h5>🛒 E-commerce Product Page</h5>
                <ul>
                  <li><strong>HTML:</strong> Product info, images, add-to-cart button, reviews</li>
                  <li><strong>CSS:</strong> Product gallery, pricing display, mobile optimization</li>
                  <li><strong>JavaScript:</strong> Image zoom, quantity selector, cart functionality</li>
                </ul>
              </div>
              
              <div class="example-item">
                <h5>📊 Interactive Dashboard</h5>
                <ul>
                  <li><strong>HTML:</strong> Chart containers, data tables, navigation menu</li>
                  <li><strong>CSS:</strong> Dashboard layout, chart styling, responsive grid</li>
                  <li><strong>JavaScript:</strong> Data fetching, chart rendering, real-time updates</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="collaboration-benefits">
            <h4>🤝 Benefits of This Collaboration</h4>
            <div class="benefit-grid">
              <div class="benefit-item">
                <strong>Separation of Concerns:</strong> Each technology handles what it does best
              </div>
              <div class="benefit-item">
                <strong>Maintainability:</strong> Changes to one layer don't break others
              </div>
              <div class="benefit-item">
                <strong>Scalability:</strong> Easy to add features and expand functionality
              </div>
              <div class="benefit-item">
                <strong>Performance:</strong> Optimized loading and caching strategies
              </div>
            </div>
          </div>
        </div>
      `,
      highlights: [
        'Three technologies work in perfect harmony',
        'Each layer builds upon the previous one',
        'Separation of concerns makes development easier',
        'Together they create rich, interactive experiences',
        'This architecture scales from simple sites to complex applications'
      ]
    },
    {
      id: 'learning-path',
      title: 'Your Learning Journey',
      subtitle: 'From Zero to Web Developer - A Strategic Approach',
      icon: <BookOpen size={48} />,
      content: `
        <div class="learning-guide">
          <h3>The Optimal Learning Path</h3>
          <p>Learning web development is like learning to drive - you need to master the basics before moving to advanced techniques. Here's the proven path that thousands of successful developers have followed.</p>
          
          <div class="learning-timeline">
            <div class="timeline-item">
              <div class="timeline-marker html">HTML</div>
              <div class="timeline-content">
                <h4>Phase 1: Master HTML (2-3 weeks)</h4>
                <p>Build a solid foundation by understanding how to structure content and create semantic, accessible web pages.</p>
                <div class="skills">
                  <span>Basic Tags</span>
                  <span>Document Structure</span>
                  <span>Semantic HTML</span>
                  <span>Forms & Input</span>
                  <span>Accessibility</span>
                </div>
                <div class="learning-goals">
                  <strong>Goal:</strong> Create well-structured, semantic HTML documents that are accessible and SEO-friendly.
                </div>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker css">CSS</div>
              <div class="timeline-content">
                <h4>Phase 2: Learn CSS (3-4 weeks)</h4>
                <p>Transform your HTML into beautiful, responsive designs that work across all devices and browsers.</p>
                <div class="skills">
                  <span>Selectors & Properties</span>
                  <span>Box Model</span>
                  <span>Flexbox & Grid</span>
                  <span>Responsive Design</span>
                  <span>Animations</span>
                </div>
                <div class="learning-goals">
                  <strong>Goal:</strong> Create visually appealing, responsive websites that provide excellent user experiences.
                </div>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker js">JS</div>
              <div class="timeline-content">
                <h4>Phase 3: JavaScript Fundamentals (4-6 weeks)</h4>
                <p>Add interactivity and dynamic behavior to create engaging, functional web applications.</p>
                <div class="skills">
                  <span>Variables & Functions</span>
                  <span>DOM Manipulation</span>
                  <span>Event Handling</span>
                  <span>APIs & Fetch</span>
                  <span>ES6+ Features</span>
                </div>
                <div class="learning-goals">
                  <strong>Goal:</strong> Build interactive web applications that respond to user input and communicate with servers.
                </div>
              </div>
            </div>
          </div>
          
          <div class="learning-tips">
            <h4>💡 Pro Learning Tips</h4>
            <div class="tips-grid">
              <div class="tip-item">
                <strong>Practice Daily:</strong> Code for at least 30 minutes every day, consistency beats intensity
              </div>
              <div class="tip-item">
                <strong>Build Projects:</strong> Apply what you learn by building real projects, not just following tutorials
              </div>
              <div class="tip-item">
                <strong>Join Communities:</strong> Connect with other learners and developers for support and motivation
              </div>
              <div class="tip-item">
                <strong>Read Documentation:</strong> Get comfortable with official docs - they're your best friend
              </div>
              <div class="tip-item">
                <strong>Debug Actively:</strong> Don't fear errors - they're learning opportunities in disguise
              </div>
              <div class="tip-item">
                <strong>Stay Updated:</strong> Web technologies evolve rapidly, keep learning new features and best practices
              </div>
            </div>
          </div>
          
          <div class="next-steps">
            <h4>🚀 What Comes After the Basics?</h4>
            <div class="advanced-path">
              <div class="path-item">
                <strong>Frontend Frameworks:</strong> React, Vue, Angular for complex applications
              </div>
              <div class="path-item">
                <strong>Backend Development:</strong> Node.js, Python, or other server-side technologies
              </div>
              <div class="path-item">
                <strong>Databases:</strong> SQL and NoSQL databases for data storage
              </div>
              <div class="path-item">
                <strong>DevOps & Deployment:</strong> Git, CI/CD, cloud platforms, and hosting
              </div>
            </div>
          </div>
          
          <div class="encouragement">
            <h4>🎯 Ready to Start Your Journey?</h4>
            <p>Remember, every expert was once a beginner. The key is to start, stay consistent, and never stop learning. The following interactive courses will guide you through each technology step by step.</p>
            <p><strong>Your journey to becoming a web developer starts now!</strong></p>
          </div>
        </div>
      `,
      highlights: [
        'Sequential learning is proven to be most effective',
        'Each phase builds essential skills for the next',
        'Consistent daily practice is key to success',
        'Building projects reinforces theoretical knowledge',
        'The web development community is supportive and welcoming'
      ]
    }
  ];

  const currentStepData = conceptSteps[currentStep];

  const goToNextStep = () => {
    if (currentStep < conceptSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetLesson = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !isActive || currentStep >= conceptSteps.length - 1) return;

    const timer = setTimeout(() => {
      goToNextStep();
    }, 12000 / animationSpeed); // 12 seconds per step

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, isActive, animationSpeed, conceptSteps.length]);

  return (
    <div className="conceptual-lesson">
      {/* Control Panel */}
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
            <BookOpen size={16} />
            Step {currentStep + 1} of {conceptSteps.length}
          </div>
          <div className="step-progress">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / conceptSteps.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="speed-control">
          <label>Speed: </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.25"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          />
          <span>{animationSpeed}x</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lesson-main">
        <div className="concept-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="concept-panel"
            >
              {/* Step Header */}
              <div className="step-header">
                <motion.div 
                  className="step-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {currentStepData.icon}
                </motion.div>
                <div className="step-titles">
                  <h2 className="step-title">{currentStepData.title}</h2>
                  <p className="step-subtitle">{currentStepData.subtitle}</p>
                </div>
              </div>

              {/* Main Content */}
              <motion.div 
                className="step-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                dangerouslySetInnerHTML={{ __html: currentStepData.content }}
              />

              {/* Key Points Summary */}
              {currentStepData.highlights && (
                <motion.div 
                  className="highlights-section"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="highlights-header">
                    <Lightbulb size={18} />
                    Key Points:
                  </div>
                  <ul className="highlights-list">
                    {currentStepData.highlights.map((highlight, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                      >
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="concept-navigation">
            <button 
              className="nav-btn prev"
              onClick={goToPrevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button 
              className="nav-btn next"
              onClick={goToNextStep}
              disabled={currentStep >= conceptSteps.length - 1}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 