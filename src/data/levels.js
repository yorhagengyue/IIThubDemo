// Level data structure definition
export const levels = [
  {
    id: 'web-fundamentals-01',
    title: 'Web Fundamentals: HTML, CSS & JavaScript',
    description: 'Comprehensive introduction to the three core technologies that power the modern web. Learn how HTML, CSS, and JavaScript work together to create amazing web experiences.',
    difficulty: 'beginner',
    estimatedTime: '15-20 minutes',
    type: 'conceptual',
    lesson: {
      content: `
# Web Development Fundamentals

Welcome to the comprehensive world of web development! This course provides an in-depth introduction to the three core technologies that power every website and web application on the internet.

## What You'll Discover

Through this extensive course, you will:
- Understand the fundamental roles of HTML, CSS, and JavaScript
- Learn how these technologies evolved and shaped the modern web
- Explore real-world examples and practical applications
- Master the optimal learning path for web development success
- Gain insights from industry best practices and expert tips

## Course Highlights

- 🎯 **Deep Conceptual Understanding**: Go beyond surface-level explanations to truly understand how web technologies work
- 🏠 **Practical Analogies**: Use relatable metaphors to make complex concepts easy to grasp
- 📊 **Real-World Statistics**: Learn about the current state and scale of web development
- 🚀 **Strategic Learning Path**: Follow a proven roadmap used by successful developers worldwide
- 💡 **Expert Tips**: Benefit from professional insights and best practices

## Interactive Learning Experience

This course features:
- **6 Comprehensive Modules** covering each technology in detail
- **Auto-play Functionality** for guided learning experience
- **Interactive Navigation** to explore at your own pace
- **Key Takeaways** summarized for easy reference
- **Progressive Difficulty** building from basics to advanced concepts

Ready to embark on your web development journey? Let's dive deep into the technologies that power the digital world!
      `,
      hints: [
        'HTML provides the structural foundation - master semantic markup for accessibility and SEO',
        'CSS controls all visual aspects - learn responsive design principles for modern web development',
        'JavaScript adds dynamic behavior - understand event-driven programming and DOM manipulation',
        'The three technologies form a cohesive ecosystem - each builds upon the others',
        'Sequential learning (HTML → CSS → JavaScript) provides the strongest foundation',
        'Practice with real projects to reinforce theoretical knowledge',
        'Join developer communities for support and continuous learning'
      ]
    }
  },
  {
    id: 'css-basics-01',
    title: 'CSS Basics: Colors & Backgrounds',
    description: 'Learn how to use CSS to set element colors and backgrounds',
    difficulty: 'beginner',
    estimatedTime: '2-3 minutes',
    lesson: {
      content: `
# CSS Colors & Backgrounds

In this level, you will learn how to use CSS to set element colors and backgrounds.

## Basic Concepts

- \`color\` property controls text color
- \`background-color\` property controls background color
- Colors can be represented using keywords, hexadecimal, RGB, etc.

## Color Representation Methods

- **Keywords**: red, blue, green, white, black
- **Hexadecimal**: #FF0000, #0000FF, #00FF00
- **RGB**: rgb(255, 0, 0), rgb(0, 0, 255)
- **RGBA**: rgba(255, 0, 0, 0.5) - with transparency

## Task Objectives

Please modify the box below to:
1. Change background color to blue (\`royalblue\`)
2. Change text color to white (\`white\`)

## Practical Tips

- Use browser developer tools to preview color effects in real-time
- Color keywords are easier to remember than hexadecimal values
- Proper color combinations enhance user experience
      `,
      hints: [
        'Use background-color property to set the background',
        'Use color property to set text color',
        'Color values can be keywords like royalblue, white',
        'Make sure to add these two properties in the .box selector',
        'Remember to add semicolon ; after CSS properties'
      ]
    },
    files: {
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Colors & Backgrounds</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="box">
            Hello CSS!
        </div>
    </div>
</body>
</html>`,
        readOnly: true
      },
      '/styles.css': {
        code: `.container {
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
  /* Add your CSS here */
  
}`,
        active: true
      }
    },
    validation: {
      type: 'css-properties',
      rules: [
        {
          selector: '.box',
          property: 'background-color',
          expectedValue: 'royalblue',
          message: 'Please set background color to royalblue'
        },
        {
          selector: '.box',
          property: 'color',
          expectedValue: 'white',
          message: 'Please set text color to white'
        }
      ]
    }
  },
  {
    id: 'css-hover-01',
    title: 'CSS Hover Effects',
    description: 'Learn how to create interactive effects on mouse hover',
    difficulty: 'beginner',
    estimatedTime: '3-4 minutes',
    lesson: {
      content: `
# CSS Hover Effects

Now let's learn how to add hover effects to elements to make pages more interactive!

## Basic Concepts

- \`:hover\` pseudo-class selector activates on mouse hover
- \`transition\` property makes changes smoother
- You can change color, size, position, or any CSS property

## Task Objectives

Add hover effects to the button:
1. Background color changes to dark blue (\`darkblue\`) on hover
2. Add 0.3 second transition animation
      `,
      hints: [
        'Use .button:hover selector',
        'transition property syntax: transition: all 0.3s ease',
        'Change background-color on hover'
      ]
    },
    files: {
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Hover Effects</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <button class="button">
            Hover me!
        </button>
    </div>
</body>
</html>`,
        readOnly: true
      },
      '/styles.css': {
        code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.button {
  padding: 15px 30px;
  font-size: 16px;
  background-color: royalblue;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  /* Add transition effect here */
  
}

/* Add hover effect here */
`,
        active: true
      }
    },
    validation: {
      type: 'css-properties',
      rules: [
        {
          selector: '.button',
          property: 'transition',
          expectedPattern: /transition.*0\.3s/,
          message: 'Please add 0.3 second transition animation'
        },
        {
          selector: '.button:hover',
          property: 'background-color',
          expectedValue: 'darkblue',
          message: 'Please set background color to darkblue on hover'
        }
      ]
    }
  },
  {
    id: 'css-transform-01',
    title: 'CSS Transform Effects',
    description: 'Learn to use transform property for scaling and rotation effects',
    difficulty: 'intermediate',
    estimatedTime: '4-5 minutes',
    lesson: {
      content: `
# CSS Transform

Transform is one of the most powerful properties in CSS for scaling, rotating, moving elements.

## Basic Concepts

- \`transform: scale()\` scales elements
- \`transform: rotate()\` rotates elements
- You can combine multiple transforms: \`transform: scale(1.2) rotate(10deg)\`
- Combined with transition for smooth animations

## Task Objectives

Add hover transform effects to the card:
1. Scale to 1.1 times on hover
2. Rotate 5 degrees clockwise
3. Add smooth transition animation
      `,
      hints: [
        'Use transform: scale(1.1) rotate(5deg)',
        'Remember to add transition property',
        'Add transform effect in :hover pseudo-class'
      ]
    },
    files: {
      '/index.html': {
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Transform Effects</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <h3>Transform Card</h3>
            <p>Hover to see what happens!</p>
        </div>
    </div>
</body>
</html>`,
        readOnly: true
      },
      '/styles.css': {
        code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.card {
  width: 250px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  /* Add transition effect here */
  
}

.card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.card p {
  margin: 0;
  color: #666;
}

/* Add hover transform effect here */
`,
        active: true
      }
    },
    validation: {
      type: 'css-properties',
      rules: [
        {
          selector: '.card',
          property: 'transition',
          expectedPattern: /transition.*transform/,
          message: 'Please add transition animation for transform property'
        },
        {
          selector: '.card:hover',
          property: 'transform',
          expectedPattern: /scale\(1\.1\).*rotate\(5deg\)|rotate\(5deg\).*scale\(1\.1\)/,
          message: 'Please add scale(1.1) and rotate(5deg) transform on hover'
        }
      ]
    }
  }
];

// Difficulty level configuration
export const difficultyConfig = {
  beginner: {
    label: 'Beginner',
    color: '#22c55e',
    icon: '🌱'
  },
  intermediate: {
    label: 'Intermediate', 
    color: '#f59e0b',
    icon: '🌿'
  },
  advanced: {
    label: 'Advanced',
    color: '#ef4444', 
    icon: '🌳'
  }
}; 