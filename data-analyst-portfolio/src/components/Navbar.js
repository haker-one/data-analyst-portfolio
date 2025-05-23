import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaLanguage, FaKey } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const { language, toggleLanguage } = useLanguage();
  const { isOwnerMode, activateOwnerMode, deactivateOwnerMode, showAdminControls, toggleAdminControls } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSecretClick = () => {
    setShowAdminInput(!showAdminInput);
  };
  
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const success = activateOwnerMode(secretCode);
    if (success) {
      setShowAdminInput(false);
      setSecretCode('');
      alert(language === 'ar' ? 'تم تفعيل وضع المالك بنجاح! اضغط Shift + Alt + W لإظهار أدوات الإدارة.' : 'Owner mode activated! Press Shift + Alt + W to toggle admin controls.');
    } else {
      alert(language === 'ar' ? 'الرمز غير صحيح!' : 'Incorrect code!');
    }
  };
  
  const handleLogout = () => {
    deactivateOwnerMode();
    alert(language === 'ar' ? 'تم تسجيل الخروج من وضع المالك.' : 'Logged out from owner mode.');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Change background when scrolled down a bit
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down - hide navbar
        setVisible(false);
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <NavContainer $scrolled={scrolled} $visible={visible}>
      <NavWrapper>
        <LogoContainer>
          <Link to="/">
            <Logo>WA</Logo>
            <LogoText>Wessam Abdullah</LogoText>
          </Link>
        </LogoContainer>

        <MenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <NavMenu $isOpen={isOpen}>
          <NavItem>
            <NavLink to="/" onClick={toggleMenu}>{language === 'ar' ? 'الرئيسية' : 'Home'}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about" onClick={toggleMenu}>{language === 'ar' ? 'عني' : 'About'}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/skills" onClick={toggleMenu}>{language === 'ar' ? 'المهارات' : 'Skills'}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/projects" onClick={toggleMenu}>{language === 'ar' ? 'المشاريع' : 'Projects'}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" onClick={toggleMenu}>{language === 'ar' ? 'تواصل معي' : 'Contact'}</NavLink>
          </NavItem>
          
          <NavItem>
            <LanguageToggle onClick={toggleLanguage}>
              <FaLanguage />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </LanguageToggle>
          </NavItem>
          
          {/* Secret Owner Controls */}
          <NavItem className="secret-control">
            {isOwnerMode ? (
              <>
                <AdminModeButton onClick={toggleAdminControls} $active={showAdminControls}>
                  <FaKey />
                  <span>{language === 'ar' ? (showAdminControls ? 'إخفاء أدوات الإدارة' : 'إظهار أدوات الإدارة') : (showAdminControls ? 'Hide Admin Tools' : 'Show Admin Tools')}</span>
                </AdminModeButton>
                <SecretButton onClick={handleLogout}>
                  <span>{language === 'ar' ? 'خروج' : 'Logout'}</span>
                </SecretButton>
              </>
            ) : (
              <>
                <SecretButton onClick={handleSecretClick}>
                  <FaKey />
                  <span className="sr-only">Access Owner Mode</span>
                </SecretButton>
                {showAdminInput && (
                  <AdminForm onSubmit={handleCodeSubmit}>
                    <AdminInput 
                      type="password" 
                      placeholder={language === 'ar' ? 'أدخل الرمز السري' : 'Enter secret code'} 
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      autoFocus
                    />
                    <SecretButton type="submit">
                      <span>{language === 'ar' ? 'تأكيد' : 'Submit'}</span>
                    </SecretButton>
                  </AdminForm>
                )}
              </>
            )}
          </NavItem>
        </NavMenu>
      </NavWrapper>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.$scrolled ? 'var(--primary-color)' : 'rgba(30, 41, 59, 0.85)'};
  box-shadow: ${props => props.$scrolled ? 'var(--box-shadow)' : 'none'};
  transition: all 0.3s ease-in-out;
  padding: ${props => props.$scrolled ? '10px 0' : '20px 0'};
  transform: translateY(${props => props.$visible ? '0' : '-100%'});
  opacity: ${props => props.$visible ? '1' : '0'};
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  
  a {
    display: flex;
    align-items: center;
  }
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--secondary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  margin-right: 10px;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--light-color);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const MenuButton = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--light-color);
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 0;
    right: ${props => props.$isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    background-color: var(--primary-color);
    padding-top: 80px;
    transition: var(--transition);
    box-shadow: ${props => props.$isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.2)' : 'none'};
  }
`;

const NavItem = styled.li`
  margin: 0 15px;

  @media (max-width: 768px) {
    margin: 15px 0;
    width: 100%;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: var(--light-color);
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  transition: var(--transition);

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background-color: var(--secondary-color);
    transition: var(--transition);
  }

  &:hover {
    color: var(--secondary-color);
  }

  &:hover:after {
    width: 100%;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 10px 0;
  }
`;

const LanguageToggle = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--light-color);
  font-size: 1rem;
  cursor: pointer;
  padding: 10px;
  transition: var(--transition);
  
  svg {
    font-size: 1.2rem;
    margin-right: 5px;
  }
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const AdminModeButton = styled.button`
  background-color: ${props => props.$active ? 'var(--accent-color)' : 'var(--secondary-color)'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  margin-right: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--secondary-color)' : 'var(--accent-color)'};
  }
  
  svg {
    font-size: 1rem;
    margin-right: 5px;
  }
`;

const SecretButton = styled.button`
  background: none;
  border: none;
  color: var(--light-color);
  opacity: 0.3;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  transition: all 0.2s;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 1;
    color: var(--accent-color);
  }
  
  svg {
    font-size: 1rem;
    margin-right: 5px;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

const AdminForm = styled.form`
  position: absolute;
  right: 0;
  top: 100%;
  background-color: var(--dark-color);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  z-index: 1000;
  
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    margin-top: 10px;
  }
`;

const AdminInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--secondary-color);
  background-color: var(--dark-color);
  color: var(--light-color);
  margin-right: 5px;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

export default Navbar;
