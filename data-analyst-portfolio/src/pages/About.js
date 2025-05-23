import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { language } = useLanguage();
  return (
    <AboutSection>
      <Container>
        <SectionTitle>{language === 'ar' ? 'عني' : 'About Me'}</SectionTitle>
        
        <AboutContainer>
          <AboutImageContainer
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AboutImage src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt={language === 'ar' ? 'تحليل البيانات' : 'Data Analysis'} />
          </AboutImageContainer>
          
          <AboutContent
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AboutTitle>{language === 'ar' ? 'مرحبًا، أنا وسام عبدالله' : 'Hello, I\'m Wessam Abdullah'}</AboutTitle>
            <AboutText>
              {language === 'ar' 
                ? 'مهتم بتحليل البيانات وشغوف بتعلم طرق استخراج الرؤى من مجموعات البيانات. أسعى لتطوير مهاراتي في تحليل البيانات والتصور وتطوير لوحات المعلومات باستخدام أدوات مثل Excel وSQL وPython وPower BI وTableau وLooker Studio.' 
                : 'A data analysis enthusiast passionate about learning how to extract insights from datasets. I am developing my skills in data analysis, visualization, and dashboard development using tools like Excel, SQL, Python, Power BI, Tableau, and Looker Studio.'}
            </AboutText>
            <AboutText>
              {language === 'ar'
                ? 'من خلال مشاريع واقعية في تحليل المبيعات والموارد البشرية وتحليلات العملاء، طورت قدرة قوية على تحويل البيانات الخام إلى رؤى واضحة وقابلة للتنفيذ. أنا شغوف باستخدام البيانات لدعم القرارات الاستراتيجية ونمو الأعمال.'
                : 'Through real-world projects in sales, HR, and customer analytics, I\'ve developed a strong ability to turn raw data into clear, actionable insights. I\'m passionate about leveraging data to support strategic decisions and business growth.'}
            </AboutText>
            <AboutText>
              {language === 'ar'
                ? 'أنا دائمًا متحمس للتعلم واستكشاف أدوات جديدة والمساهمة في حلول فعالة تعتمد على البيانات.'
                : 'I\'m always eager to learn, explore new tools, and contribute to impactful data-driven solutions.'}
            </AboutText>
            
            <ContactInfo>
              <ContactTitle>{language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}</ContactTitle>
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
            </ContactInfo>
            
            <EducationInfo>
              <EducationTitle>{language === 'ar' ? 'التعليم' : 'Education'}</EducationTitle>
              <EducationItem>
                <EducationDegree>{language === 'ar' ? 'حفر وتكرير البترول' : 'Petroleum Drilling and Refining'}</EducationDegree>
              </EducationItem>
            </EducationInfo>
            
            <LanguagesInfo>
              <LanguagesTitle>{language === 'ar' ? 'اللغات' : 'Languages'}</LanguagesTitle>
              <LanguagesList>
                <LanguageItem>{language === 'ar' ? 'العربية: اللغة الأم' : 'Arabic: Native'}</LanguageItem>
                <LanguageItem>{language === 'ar' ? 'الإنجليزية: متوسط' : 'English: Intermediate'}</LanguageItem>
              </LanguagesList>
            </LanguagesInfo>
          </AboutContent>
        </AboutContainer>
      </Container>
    </AboutSection>
  );
};

const AboutSection = styled.section`
  padding: 120px 0 80px;
  background-color: var(--light-color);
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: var(--primary-color);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: var(--secondary-color);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImageContainer = styled(motion.div)`
  @media (max-width: 992px) {
    margin: 0 auto;
    max-width: 400px;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const AboutContent = styled(motion.div)`
  @media (max-width: 992px) {
    text-align: center;
  }
`;

const AboutTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
`;

const AboutText = styled.p`
  margin-bottom: 20px;
  line-height: 1.8;
  color: var(--text-color);
`;

const ContactInfo = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ContactTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  svg {
    margin-right: 10px;
    color: var(--secondary-color);
  }
  
  a {
    color: var(--text-color);
    transition: var(--transition);
    
    &:hover {
      color: var(--secondary-color);
    }
  }
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const EducationInfo = styled.div`
  margin-bottom: 30px;
`;

const EducationTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const EducationItem = styled.div`
  margin-bottom: 10px;
`;

const EducationDegree = styled.p`
  font-weight: 600;
  color: var(--text-color);
`;

const LanguagesInfo = styled.div``;

const LanguagesTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const LanguagesList = styled.ul``;

const LanguageItem = styled.li`
  margin-bottom: 5px;
  position: relative;
  padding-right: 20px;
  
  &:before {
    content: "•";
    position: absolute;
    right: 0;
    color: var(--secondary-color);
  }
  
  @media (max-width: 992px) {
    display: inline-block;
    margin-right: 20px;
  }
`;

export default About;
