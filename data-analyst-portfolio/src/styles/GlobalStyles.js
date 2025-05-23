import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --light-color: #ecf0f1;
    --dark-color: #1a252f;
    --text-color: #333;
    --text-light: #f8f9fa;
    --transition: all 0.3s ease-in-out;
    --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    --border-radius: 8px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', sans-serif;
    background-color: var(--light-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button, input, textarea {
    font-family: inherit;
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section {
    padding: 80px 0;
  }

  .section-title {
    text-align: center;
    margin-bottom: 50px;
    font-size: 2.5rem;
    color: var(--primary-color);
    position: relative;
  }

  .section-title:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--secondary-color);
  }

  .btn {
    display: inline-block;
    padding: 12px 28px;
    background: var(--secondary-color);
    color: var(--light-color);
    border: none;
    border-radius: var(--border-radius);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
  }

  .btn:hover {
    background: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: var(--box-shadow);
  }

  @media (max-width: 768px) {
    .section {
      padding: 60px 0;
    }
    
    .section-title {
      font-size: 2rem;
    }
  }
`;

export default GlobalStyles;
