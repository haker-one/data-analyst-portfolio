import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaDatabase, FaChartBar, FaPython, FaTable, 
  FaFileExcel, FaChartLine, FaChartPie, FaProjectDiagram 
} from 'react-icons/fa';
import { SiTableau, SiGoogleanalytics } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
  const { language } = useLanguage();
  const getSkillCategories = () => {
    if (language === 'ar') {
      return [
        {
          title: "تحليل البيانات",
          icon: <FaChartLine />,
          skills: [
            { name: "SQL", level: 85 },
            { name: "Python (Pandas, NumPy)", level: 80 },
            { name: "Microsoft Excel (تحليل متقدم، جداول محورية)", level: 90 },
            { name: "التفكير التحليلي", level: 85 },
            { name: "حل المشكلات", level: 85 }
          ]
        },
        {
          title: "تصور البيانات",
          icon: <FaChartBar />,
          skills: [
            { name: "Power BI", level: 85 },
            { name: "Tableau", level: 80 },
            { name: "Looker Studio", level: 75 },
            { name: "Microsoft Excel (لوحات المعلومات، الرسوم البيانية)", level: 90 }
          ]
        },
        {
          title: "الأدوات وقواعد البيانات",
          icon: <FaDatabase />,
          skills: [
            { name: "Microsoft Excel", level: 90 },
            { name: "SQL", level: 85 },
            { name: "Google Sheets", level: 80 },
            { name: "Jupyter Notebook", level: 75 }
          ]
        },
        {
          title: "عمليات البيانات",
          icon: <FaProjectDiagram />,
          skills: [
            { name: "تنظيف البيانات", level: 85 },
            { name: "إعداد البيانات", level: 85 },
            { name: "نمذجة البيانات الأساسية", level: 80 }
          ]
        }
      ];
    } else {
      return [
        {
          title: "Data Analysis",
          icon: <FaChartLine />,
          skills: [
            { name: "SQL", level: 85 },
            { name: "Python (Pandas, NumPy)", level: 80 },
            { name: "Microsoft Excel (Advanced Analysis, PivotTables)", level: 90 },
            { name: "Analytical Thinking", level: 85 },
            { name: "Problem Solving", level: 85 }
          ]
        },
        {
          title: "Data Visualization",
          icon: <FaChartBar />,
          skills: [
            { name: "Power BI", level: 85 },
            { name: "Tableau", level: 80 },
            { name: "Looker Studio", level: 75 },
            { name: "Microsoft Excel (Dashboards, Charts)", level: 90 }
          ]
        },
        {
          title: "Tools & Databases",
          icon: <FaDatabase />,
          skills: [
            { name: "Microsoft Excel", level: 90 },
            { name: "SQL", level: 85 },
            { name: "Google Sheets", level: 80 },
            { name: "Jupyter Notebook", level: 75 }
          ]
        },
        {
          title: "Data Operations",
          icon: <FaProjectDiagram />,
          skills: [
            { name: "Data Cleaning", level: 85 },
            { name: "Data Preparation", level: 85 },
            { name: "Basic Data Modeling", level: 80 }
          ]
        }
      ];
    }
  };
  
  const skillCategories = getSkillCategories();

  const tools = [
    { name: "Excel", icon: <FaFileExcel />, color: "#217346" },
    { name: "SQL", icon: <FaDatabase />, color: "#336791" },
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "Power BI", icon: <FaChartBar />, color: "#F2C811" },
    { name: "Tableau", icon: <SiTableau />, color: "#E97627" },
    { name: "Looker Studio", icon: <SiGoogleanalytics />, color: "#4285F4" },
    { name: "Data Visualization", icon: <FaChartPie />, color: "#E74C3C" },
    { name: "Data Analysis", icon: <FaTable />, color: "#3498DB" }
  ];

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
    <SkillsSection>
      <Container>
        <SectionTitle>{language === 'ar' ? 'مهاراتي' : 'My Skills'}</SectionTitle>
        
        <ToolsContainer
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tools.map((tool, index) => (
            <ToolItem key={index} variants={item}>
              <ToolIcon style={{ color: tool.color }}>{tool.icon}</ToolIcon>
              <ToolName>{tool.name}</ToolName>
            </ToolItem>
          ))}
        </ToolsContainer>
        
        <SkillCategoriesContainer>
          {skillCategories.map((category, index) => (
            <SkillCategory 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryHeader>
              
              <SkillsContainer>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex}>
                    <SkillInfo>
                      <SkillName>{skill.name}</SkillName>
                      <SkillLevel>{skill.level}%</SkillLevel>
                    </SkillInfo>
                    <SkillBar>
                      <SkillProgress 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillsContainer>
            </SkillCategory>
          ))}
        </SkillCategoriesContainer>
        
        <AdditionalSkills>
          <AdditionalSkillsTitle>{language === 'ar' ? 'مهارات إضافية' : 'Additional Skills'}</AdditionalSkillsTitle>
          <AdditionalSkillsList>
            {language === 'ar' ? (
              <>
                <AdditionalSkillItem>التفكير التحليلي</AdditionalSkillItem>
                <AdditionalSkillItem>حل المشكلات</AdditionalSkillItem>
                <AdditionalSkillItem>تفسير البيانات</AdditionalSkillItem>
                <AdditionalSkillItem>الانتباه للتفاصيل</AdditionalSkillItem>
                <AdditionalSkillItem>التواصل الفعال</AdditionalSkillItem>
                <AdditionalSkillItem>إدارة الوقت</AdditionalSkillItem>
                <AdditionalSkillItem>التعلم الذاتي</AdditionalSkillItem>
              </>
            ) : (
              <>
                <AdditionalSkillItem>Analytical Thinking</AdditionalSkillItem>
                <AdditionalSkillItem>Problem Solving</AdditionalSkillItem>
                <AdditionalSkillItem>Data Interpretation</AdditionalSkillItem>
                <AdditionalSkillItem>Attention to Detail</AdditionalSkillItem>
                <AdditionalSkillItem>Effective Communication</AdditionalSkillItem>
                <AdditionalSkillItem>Time Management</AdditionalSkillItem>
                <AdditionalSkillItem>Self-Learning</AdditionalSkillItem>
              </>
            )}
          </AdditionalSkillsList>
        </AdditionalSkills>
      </Container>
    </SkillsSection>
  );
};

const SkillsSection = styled.section`
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

const ToolsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 60px;
`;

const ToolItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  width: 120px;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ToolIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const ToolName = styled.h4`
  font-size: 1rem;
  text-align: center;
`;

const SkillCategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background-color: white;
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const CategoryIcon = styled.div`
  font-size: 2rem;
  color: var(--secondary-color);
  margin-right: 15px;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
`;

const SkillsContainer = styled.div``;

const SkillItem = styled.div`
  margin-bottom: 20px;
`;

const SkillInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SkillName = styled.span`
  font-weight: 500;
`;

const SkillLevel = styled.span`
  color: var(--secondary-color);
  font-weight: 600;
`;

const SkillBar = styled.div`
  height: 10px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, var(--secondary-color), var(--primary-color));
  border-radius: 10px;
`;

const AdditionalSkills = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const AdditionalSkillsTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  text-align: center;
`;

const AdditionalSkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const AdditionalSkillItem = styled.div`
  padding: 10px 20px;
  background-color: var(--light-color);
  color: var(--primary-color);
  border-radius: 30px;
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--secondary-color);
    color: white;
    transform: translateY(-3px);
  }
`;

export default Skills;
