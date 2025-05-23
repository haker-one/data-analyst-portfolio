import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaChartBar, FaDatabase, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { language } = useLanguage();
  return (
    <>
      <HeroSection>
        <Container>
          <HeroContent
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{language === 'ar' ? 'وسام عبدالله' : 'Wessam Abdullah'}</HeroTitle>
            <HeroSubtitle>{language === 'ar' ? 'مهتم بتحليل البيانات' : 'Data Analysis Enthusiast'}</HeroSubtitle>
            <HeroDescription>
              {language === 'ar' 
                ? 'أتعلم تحليل البيانات وتصورها بشغف مستخدمًا Excel وSQL وPython وPower BI وTableau وLooker Studio'
                : 'Learning data analysis and visualization with passion using Excel, SQL, Python, Power BI, Tableau, and Looker Studio'}
            </HeroDescription>
            <ButtonGroup>
              <PrimaryButton to="/projects">{language === 'ar' ? 'مشاهدة أعمالي' : 'View My Projects'}</PrimaryButton>
              <SecondaryButton to="/contact">{language === 'ar' ? 'تواصل معي' : 'Contact Me'}</SecondaryButton>
            </ButtonGroup>
          </HeroContent>
        </Container>
      </HeroSection>

      <ServicesSection>
        <Container>
          <SectionTitle>{language === 'ar' ? 'ماذا أقدم' : 'What I Offer'}</SectionTitle>
          
          <ServicesContainer>
            <ServiceCard
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ServiceIcon>
                <FaDatabase />
              </ServiceIcon>
              <ServiceTitle>{language === 'ar' ? 'تحليل البيانات' : 'Data Analysis'}</ServiceTitle>
              <ServiceDescription>
                {language === 'ar' 
                  ? 'استخراج الرؤى ذات المغزى من مجموعات البيانات المعقدة باستخدام SQL وPython وExcel.'
                  : 'Extracting meaningful insights from complex datasets using SQL, Python, and Excel.'}
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ServiceIcon>
                <FaChartBar />
              </ServiceIcon>
              <ServiceTitle>{language === 'ar' ? 'تصور البيانات' : 'Data Visualization'}</ServiceTitle>
              <ServiceDescription>
                {language === 'ar' 
                  ? 'إنشاء لوحات معلومات تفاعلية ومقنعة بصريًا باستخدام Power BI وTableau وLooker Studio.'
                  : 'Creating interactive and visually compelling dashboards using Power BI, Tableau, and Looker Studio.'}
              </ServiceDescription>
            </ServiceCard>

            <ServiceCard
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ServiceIcon>
                <FaChartLine />
              </ServiceIcon>
              <ServiceTitle>{language === 'ar' ? 'التحليلات' : 'Analytics'}</ServiceTitle>
              <ServiceDescription>
                {language === 'ar' 
                  ? 'تحويل البيانات الخام إلى رؤى عملية لدعم القرارات الاستراتيجية ونمو الأعمال.'
                  : 'Transforming raw data into actionable insights to support strategic decisions and business growth.'}
              </ServiceDescription>
            </ServiceCard>
          </ServicesContainer>
        </Container>
      </ServicesSection>

      <CTASection>
        <Container>
          <CTAContent>
            <CTATitle>{language === 'ar' ? 'هل أنت مستعد للعمل معًا؟' : 'Ready to Work Together?'}</CTATitle>
            <CTADescription>
              {language === 'ar' 
                ? 'دعنا نتعاون لتحويل بياناتك إلى رؤى قيمة تدفع نجاح عملك.'
                : "Let's collaborate to transform your data into valuable insights that drive your business success."}
            </CTADescription>
            <CTAButton to="/contact">{language === 'ar' ? 'تواصل معي' : 'Contact Me'}</CTAButton>
          </CTAContent>
        </Container>
      </CTASection>
    </>
  );
};

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, var(--primary-color), var(--dark-color));
  color: var(--light-color);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to top, rgba(236, 240, 241, 1), rgba(236, 240, 241, 0));
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--secondary-color);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  padding: 12px 30px;
  background-color: var(--secondary-color);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const SecondaryButton = styled(Link)`
  padding: 12px 30px;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
  
  &:hover {
    background-color: white;
    color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ServicesSection = styled.section`
  padding: 100px 0;
  background-color: var(--light-color);
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

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const ServiceCard = styled(motion.div)`
  background-color: white;
  padding: 40px 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: var(--secondary-color);
  margin-bottom: 20px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const ServiceDescription = styled.p`
  color: var(--text-color);
  line-height: 1.7;
`;

const CTASection = styled.section`
  padding: 80px 0;
  background: linear-gradient(to right, var(--primary-color), var(--dark-color));
  color: var(--light-color);
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  background-color: var(--secondary-color);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
  
  &:hover {
    background-color: white;
    color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default Home;
