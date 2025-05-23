import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Admin credentials (in a real app, this would be handled securely on the backend)
  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  // Normal user credentials
  const userCredentials = {
    username: 'user',
    password: 'user123'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check if admin
    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Store user role in localStorage
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/projects');
      return;
    }

    // Check if normal user
    if (username === userCredentials.username && password === userCredentials.password) {
      // Store user role in localStorage
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/projects');
      return;
    }

    // If credentials don't match
    setError(language === 'ar' ? 'اسم المستخدم أو كلمة المرور غير صحيحة' : 'Invalid username or password');
  };

  return (
    <LoginSection>
      <Container>
        <LoginCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoginTitle>
            {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
          </LoginTitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <LoginForm onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="username">
                {language === 'ar' ? 'اسم المستخدم' : 'Username'}
              </Label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit">
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </SubmitButton>
          </LoginForm>
          
          <LoginInfo>
            <h4>{language === 'ar' ? 'معلومات تسجيل الدخول للاختبار:' : 'Test Login Info:'}</h4>
            <p><strong>{language === 'ar' ? 'المسؤول:' : 'Admin:'}</strong> admin / admin123</p>
            <p><strong>{language === 'ar' ? 'المستخدم:' : 'User:'}</strong> user / user123</p>
          </LoginInfo>
        </LoginCard>
      </Container>
    </LoginSection>
  );
};

const LoginSection = styled.section`
  padding: 120px 0 80px;
  background-color: var(--light-color);
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const LoginCard = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 40px;
  max-width: 500px;
  margin: 0 auto;
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: var(--primary-color);
  font-size: 2rem;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--dark-color);
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 2px rgba(41, 128, 185, 0.2);
  }
`;

const SubmitButton = styled.button`
  padding: 14px 20px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 10px;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LoginInfo = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  
  h4 {
    margin-bottom: 10px;
    color: var(--primary-color);
  }
  
  p {
    margin-bottom: 5px;
    font-size: 0.9rem;
  }
`;

export default Login;
