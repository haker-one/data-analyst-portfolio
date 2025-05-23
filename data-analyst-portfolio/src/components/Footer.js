import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>{language === 'ar' ? 'وسام عبدالله' : 'Wessam Abdullah'}</FooterTitle>
          <FooterText>
            {language === 'ar' 
              ? 'مهتم بتحليل البيانات مع شغف كبير في تعلم تقنيات استخراج الرؤى القيمة من البيانات.'
              : 'Data analysis enthusiast with a passion for learning techniques to extract valuable insights from data.'}
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{language === 'ar' ? 'تواصل معي' : 'Contact Me'}</FooterTitle>
          <ContactItem>
            <FaPhone /> <span>01100605412</span>
          </ContactItem>
          <ContactItem>
            <FaEnvelope /> <span>wessamabdullah2011@gmail.com</span>
          </ContactItem>
          <ContactItem>
            <FaMapMarkerAlt /> <span>{language === 'ar' ? 'القاهرة، أسيوط' : 'Cairo, Asyut'}</span>
          </ContactItem>
          <ContactItem>
            <FaLinkedin /> <a href="https://www.linkedin.com/in/wessam-abdullah-b8340b357" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </ContactItem>
        </FooterSection>
      </FooterContent>
      <FooterBottom>
        <p>&copy; {currentYear} {language === 'ar' ? 'وسام عبدالله. جميع الحقوق محفوظة.' : 'Wessam Abdullah. All rights reserved.'}</p>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: var(--light-color);
  padding-top: 60px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
  margin-bottom: 30px;
  padding: 0 15px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 3px;
    background-color: var(--secondary-color);
  }
`;

const FooterText = styled.p`
  margin-bottom: 20px;
  line-height: 1.8;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  svg {
    margin-right: 10px;
    color: var(--secondary-color);
  }
  
  a {
    color: var(--light-color);
    transition: var(--transition);
    
    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  p {
    font-size: 0.9rem;
  }
`;

export default Footer;
