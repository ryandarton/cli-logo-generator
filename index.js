import('inquirer').then(({ default: inquirer }) => {
  const fs = require('fs');
  const { Triangle, Circle, Square } = require('./lib/shapes');

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo:',
        validate: (input) => input.length <= 3,
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color keyword or hexadecimal number for the text color:',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Select a shape for the logo:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a color keyword or hexadecimal number for the shape color:',
      },
    ])
    .then((answers) => {
      // Generate the SVG file based on user input
      const { text, textColor, shape, shapeColor } = answers;
      let logo;

      switch (shape) {
        case 'triangle':
          logo = new Triangle();
          break;
        case 'circle':
          logo = new Circle();
          break;
        case 'square':
          logo = new Square();
          break;
      }

      logo.setColor(shapeColor);

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
        ${logo.render()}
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${text}</text>
      </svg>`;

      fs.writeFileSync('examples/logo.svg', svg);
      console.log('Generated logo.svg');
    });
});
