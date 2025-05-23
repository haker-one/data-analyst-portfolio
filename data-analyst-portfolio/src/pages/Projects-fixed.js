import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFileExcel, FaChartBar, FaUsers } from 'react-icons/fa';
import { SiTableau, SiGoogledatastudio } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { language } = useLanguage();
  
  const getProjects = () => {
    if (language === 'ar') {
      return [
        {
          title: "تحليل المبيعات – Excel",
          icon: <FaFileExcel />,
          description: "تحليل شامل لبيانات المبيعات باستخدام Excel لتحديد الاتجاهات والمنتجات الأفضل أداءً.",
          items: [
            "تحليل اتجاهات المبيعات وأفضل المنتجات أداءً",
            "بناء لوحات معلومات تفاعلية باستخدام PivotTables",
            "تقديم رؤى لتعزيز استراتيجية المبيعات"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=Sales+Analysis+Excel"
        },
        {
          title: "لوحة معلومات المبيعات – Tableau",
          icon: <SiTableau />,
          description: "تصميم لوحات معلومات مؤشرات الأداء الرئيسية الديناميكية لتحسين فهم أداء المبيعات.",
          items: [
            "تصميم لوحات معلومات مؤشرات الأداء الرئيسية الديناميكية",
            "تنظيف البيانات وإنشاء تصورات واضحة",
            "تعزيز فهم أداء المبيعات"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=Sales+Dashboard+Tableau"
        },
        {
          title: "لوحة معلومات الأداء – Looker Studio",
          icon: <SiGoogledatastudio />,
          description: "تصور بيانات المبيعات متعددة المصادر لتحديد مناطق النمو والاتجاهات.",
          items: [
            "تصور بيانات المبيعات متعددة المصادر",
            "إنشاء عناصر مرئية مخصصة لتحديد مناطق النمو",
            "تحديد اتجاهات المبيعات والفرص"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=Performance+Dashboard+Looker"
        },
        {
          title: "تحليل الموارد البشرية – Power BI",
          icon: <FaChartBar />,
          description: "بناء لوحات معلومات لتحليل معدل دوران الموظفين والأداء لدعم القرارات الاستراتيجية للموارد البشرية.",
          items: [
            "بناء لوحات معلومات لمعدل دوران الموظفين والأداء",
            "تطبيق DAX للمقاييس المخصصة",
            "دعم قرارات الموارد البشرية الاستراتيجية بالرؤى"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=HR+Analysis+PowerBI"
        },
        {
          title: "تحليل تسرب العملاء – Tableau",
          icon: <FaUsers />,
          description: "تحديد عوامل التسرب والشرائح المعرضة للخطر واقتراح استراتيجيات لتحسين الاحتفاظ بالعملاء.",
          items: [
            "تحديد عوامل التسرب والشرائح المعرضة للخطر",
            "تصور أنماط التسرب",
            "اقتراح استراتيجيات لتحسين الاحتفاظ بالعملاء"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=Customer+Churn+Analysis"
        }
      ];
    } else {
      return [
        {
          title: "Sales Analysis – Excel",
          icon: <FaFileExcel />,
          description: "Comprehensive analysis of sales data using Excel to identify trends and top-performing products.",
          items: [
            "Analyzed trends and top-performing products",
            "Built interactive dashboards with PivotTables",
            "Delivered insights to boost sales strategy"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=Sales+Analysis+Excel"
        },
        {
          title: "Sales Dashboard – Tableau",
          icon: <SiTableau />,
          description: "Designed dynamic KPI dashboards to enhance understanding of sales performance.",
          items: [
            "Designed dynamic KPI dashboards",
            "Cleaned data and created clear visualizations",
            "Enhanced understanding of sales performance"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=Sales+Dashboard+Tableau"
        },
        {
          title: "Performance Dashboard – Looker Studio",
          icon: <SiGoogledatastudio />,
          description: "Visualized multi-source sales data to identify growth areas and trends.",
          items: [
            "Visualized multi-source sales data",
            "Created custom visuals to spot growth areas",
            "Identified sales trends and opportunities"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=Performance+Dashboard+Looker"
        },
        {
          title: "HR Analysis – Power BI",
          icon: <FaChartBar />,
          description: "Built dashboards for turnover and performance analysis to support strategic HR decisions.",
          items: [
            "Built dashboards for turnover and performance",
            "Applied DAX for custom metrics",
            "Supported strategic HR decisions with insights"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=HR+Analysis+PowerBI"
        },
        {
          title: "Customer Churn Analysis – Tableau",
          icon: <FaUsers />,
          description: "Identified churn factors and at-risk segments, and proposed strategies to improve customer retention.",
          items: [
            "Identified churn factors and risky segments",
            "Visualized churn patterns",
            "Proposed strategies to improve retention"
          ],
          image: "https://placehold.co/600x400/e9ecef/495057?text=Customer+Churn+Analysis"
        }
      ];
    }
  };

  const projects = getProjects();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <ProjectsSection>
      <Container>
        <SectionTitle>{language === 'ar' ? 'مشاريعي' : 'My Projects'}</SectionTitle>
        
        <ProjectDescription>
          {language === 'ar' 
            ? 'هنا مجموعة من المشاريع التي عملت عليها كمحلل بيانات، والتي تُظهر مهاراتي في تحليل البيانات وتصورها وتحويلها إلى رؤى عملية.'
            : 'Here is a collection of projects I worked on as a Data Analyst, showcasing my skills in data analysis, visualization, and turning data into actionable insights.'}
        </ProjectDescription>
        
        <ProjectsContainer
          variants={container}
          initial="hidden"
          animate="show"
        >
          {projects.map((project, index) => (
            <ProjectItem 
              key={index}
              variants={item}
            >
              <ProjectImage src={project.image} alt={project.title} />
              <ProjectContent>
                <ProjectIconContainer>
                  {project.icon}
                </ProjectIconContainer>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDesc>{project.description}</ProjectDesc>
                <ProjectFeatures>
                  {project.items.map((item, itemIndex) => (
                    <ProjectFeatureItem key={itemIndex}>
                      {item}
                    </ProjectFeatureItem>
                  ))}
                </ProjectFeatures>
              </ProjectContent>
            </ProjectItem>
          ))}
        </ProjectsContainer>
        
        <ContactCTA>
          <CTATitle>{language === 'ar' ? 'هل تريد معرفة المزيد عن مشاريعي؟' : 'Want to know more about my projects?'}</CTATitle>
          <CTAButton to="/contact">{language === 'ar' ? 'تواصل معي' : 'Contact Me'}</CTAButton>
        </ContactCTA>
      </Container>
    </ProjectsSection>
  );
};

const ProjectsSection = styled.section`
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
  margin-bottom: 20px;
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

const ProjectDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.7;
`;

const ProjectsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectItem = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectContent = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectIconContainer = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--light-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  color: var(--primary-color);
  font-size: 1.8rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const ProjectDesc = styled.p`
  margin-bottom: 20px;
  color: var(--text-color);
  line-height: 1.6;
`;

const ProjectFeatures = styled.ul`
  margin-top: auto;
  padding-left: 20px;
`;

const ProjectFeatureItem = styled.li`
  margin-bottom: 8px;
  color: var(--text-color);
  position: relative;
  
  &:before {
    content: "•";
    color: var(--secondary-color);
    position: absolute;
    left: -20px;
  }
`;

const ContactCTA = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const CTATitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--primary-color);
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: var(--secondary-color);
  color: white;
  padding: 12px 30px;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-color);
    transform: translateY(-3px);
  }
`;

export default Projects;
