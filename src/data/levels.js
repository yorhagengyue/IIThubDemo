// Level data structure definition
export const levels = [
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
      '/App.js': {
        code: `import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <button className="button">
        Hover me!
      </button>
    </div>
  );
}`,
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
      '/App.js': {
        code: `import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <div className="card">
        <h3>Transform Card</h3>
        <p>Hover to see what happens!</p>
      </div>
    </div>
  );
}`,
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