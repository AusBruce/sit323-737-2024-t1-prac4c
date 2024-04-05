const express = require('express');
const app = express();
const port = 3000;

// Function to perform the calculation
const calculate = (operation, num1, num2) => {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      return num1 / num2;
    default:
      throw new Error('Invalid operation.');
  }
};

// Function to handle the requests
const handleRequest = (operation, req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) {
      logger.log({
        level: 'error',
        message: `Invalid input for ${operation} operation: ${req.query.num1}, ${req.query.num2}`,
      });
      return res.status(400).json({ error: 'Invalid input. Please provide two numbers.' });
    }
    try {
      const result = calculate(operation, num1, num2);
      logger.log({
        level: 'info',
        message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`,
      });
      res.json({ result });
    } catch (error) {
      logger.log({
        level: 'error',
        message: `Error in ${operation} operation: ${error.message}`,
      });
      res.status(400).json({ error: error.message });
    }
  };
  

// Define routes for GET method
app.get('/api/calculate/:operation', (req, res) => {
  const operation = req.params.operation;
  handleRequest(operation, req, res);
});





const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});





app.listen(port, () => {
  console.log(`Calculator service running at http://localhost:${port}`);
});
