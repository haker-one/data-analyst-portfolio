import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaFileExcel, FaChartBar, FaUsers, FaTrash } from 'react-icons/fa';
import { SiTableau, SiGoogledatastudio } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// Security utilities
// Simple encryption/decryption for project data
const encryptData = (data) => {
  try {
    return btoa(JSON.stringify(data));
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

const decryptData = (encrypted) => {
  try {
    return JSON.parse(atob(encrypted));
  } catch (error) {
    console.error('Decryption error:', error);
    return [];
  }
};

// Input sanitization to prevent XSS
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Replace potentially dangerous characters
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#96;')
    .trim();
};

const Projects = () => {
  const { language } = useLanguage();
  const { isOwnerMode, showAdminControls } = useAuth();
  const [customProjects, setCustomProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    icon: 'FaFileExcel',
    image: 'https://placehold.co/600x400/e9ecef/495057?text=New+Project'
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  // Load custom projects from localStorage on component mount
  useEffect(() => {
    try {
      const encryptedProjects = localStorage.getItem('portfolioProjects');
      if (encryptedProjects) {
        // Decrypt projects data
        const decryptedProjects = decryptData(encryptedProjects);
        if (Array.isArray(decryptedProjects)) {
          setCustomProjects(decryptedProjects);
        } else {
          console.error('Invalid projects data format');
          setCustomProjects([]);
        }
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // If there's an error, initialize with empty array
      setCustomProjects([]);
    }
  }, []);
  
  // Save custom projects to localStorage whenever they change
  useEffect(() => {
    try {
      // Only save if there are custom projects
      if (customProjects && customProjects.length > 0) {
        // Encrypt projects data before saving
        const encryptedData = encryptData(customProjects);
        if (encryptedData) {
          localStorage.setItem('portfolioProjects', encryptedData);
          console.log('Projects encrypted and saved successfully');
        }
      }
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  }, [customProjects]);
  
  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.title_ar || !formData.title_en || !formData.description_ar || !formData.description_en) {
      setSuccessMessage(language === 'ar' ? 'جميع الحقول مطلوبة!' : 'All fields are required!');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    
    // Create a new project object with sanitized inputs
    const newProject = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5), // More unique ID
      title: {
        ar: sanitizeInput(formData.title_ar),
        en: sanitizeInput(formData.title_en)
      },
      description: {
        ar: sanitizeInput(formData.description_ar),
        en: sanitizeInput(formData.description_en)
      },
      icon: sanitizeInput(formData.icon),
      // Validate image URL format or use default
      image: /^https?:\/\/.+\..+/.test(formData.image) ? 
        sanitizeInput(formData.image) : 
        'https://placehold.co/600x400/e9ecef/495057?text=New+Project',
      items: []
    };
    
    // Add the new project to custom projects with immutable pattern
    setCustomProjects(prevProjects => [...prevProjects, newProject]);
    
    // Reset form
    setFormData({
      title_ar: '',
      title_en: '',
      description_ar: '',
      description_en: '',
      icon: 'FaFileExcel',
      image: 'https://placehold.co/600x400/e9ecef/495057?text=New+Project'
    });
    
    // Show success message
    setSuccessMessage(language === 'ar' ? 'تمت إضافة المشروع بنجاح!' : 'Project added successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Handle project deletion
  const handleDeleteProject = (id) => {
    const updatedProjects = customProjects.filter(project => project.id !== id);
    setCustomProjects(updatedProjects);
    setSuccessMessage(language === 'ar' ? 'تم حذف المشروع بنجاح!' : 'Project deleted successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Get icon options for the form select
  const getIconOptions = () => {
    return [
      { value: 'FaFileExcel', label: language === 'ar' ? 'إكسل' : 'Excel' },
      { value: 'FaChartBar', label: language === 'ar' ? 'رسم بياني' : 'Chart Bar' },
      { value: 'FaUsers', label: language === 'ar' ? 'مستخدمين' : 'Users' },
      { value: 'SiTableau', label: 'Tableau' },
      { value: 'SiGoogledatastudio', label: language === 'ar' ? 'لوكر ستوديو' : 'Looker Studio' }
    ];
  };
  
  const getProjects = () => {
    // Get default projects based on language
    let defaultProjects = getDefaultProjects();
    
    // Format custom projects to match the structure we're using
    const formattedCustomProjects = customProjects.map(project => {
      // Map icon string to the actual React component
      let iconComponent;
      switch(project.icon) {
        case 'FaFileExcel':
          iconComponent = <FaFileExcel />;
          break;
        case 'FaChartBar':
          iconComponent = <FaChartBar />;
          break;
        case 'FaUsers':
          iconComponent = <FaUsers />;
          break;
        case 'SiTableau':
          iconComponent = <SiTableau />;
          break;
        case 'SiGoogledatastudio':
          iconComponent = <SiGoogledatastudio />;
          break;
        default:
          iconComponent = <FaChartBar />;
      }
      
      return {
        id: project.id, // Keep the ID for custom projects
        title: project.title[language],
        icon: iconComponent,
        description: project.description[language],
        items: project.items || [],
        image: project.image,
        isCustom: true // Add a flag to clearly identify custom projects
      };
    });
    
    // Combine default and custom projects
    return [...defaultProjects, ...formattedCustomProjects];
  };
  
  const getDefaultProjects = () => {
    if (language === 'ar') {
      return [
        {
          title: "تحليل المبيعات – إكسل",
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

  // Get all projects (default + custom)
  const projects = getProjects();

  return (
    <ProjectsSection>
      <Container>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === 'ar' ? 'مشاريعي' : 'My Projects'}
        </PageTitle>
        
        {/* Only show add project button in owner mode with admin controls visible */}
        {isOwnerMode && showAdminControls && (
          <AddProjectButton onClick={toggleForm}>
            {showForm 
              ? (language === 'ar' ? 'إلغاء' : 'Cancel') 
              : (language === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project')}
          </AddProjectButton>
        )}
        
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        
        {showForm && (
          <FormContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Form onSubmit={handleSubmit}>
              <FormTitle>{language === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</FormTitle>
              
              <FormGroup>
                <Label>{language === 'ar' ? 'عنوان المشروع (بالعربية)' : 'Project Title (Arabic)'}</Label>
                <Input
                  type="text"
                  name="title_ar"
                  value={formData.title_ar}
                  onChange={handleChange}
                  required
                  dir="rtl"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>{language === 'ar' ? 'عنوان المشروع (بالإنجليزية)' : 'Project Title (English)'}</Label>
                <Input
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleChange}
                  required
                  dir="ltr"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>{language === 'ar' ? 'وصف المشروع (بالعربية)' : 'Project Description (Arabic)'}</Label>
                <Textarea
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleChange}
                  required
                  dir="rtl"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>{language === 'ar' ? 'وصف المشروع (بالإنجليزية)' : 'Project Description (English)'}</Label>
                <Textarea
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  required
                  dir="ltr"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>{language === 'ar' ? 'أيقونة المشروع' : 'Project Icon'}</Label>
                <Select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  required
                >
                  {getIconOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>{language === 'ar' ? 'رابط صورة المشروع' : 'Project Image URL'}</Label>
                <Input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <SubmitButton type="submit">
                {language === 'ar' ? 'إضافة المشروع' : 'Add Project'}
              </SubmitButton>
            </Form>
          </FormContainer>
        )}
        
        <ProjectDescription>
          {language === 'ar' 
            ? 'هنا مجموعة من المشاريع التي عملت عليها كمحلل بيانات، والتي تُظهر مهاراتي في تحليل البيانات وتصورها وتحويلها إلى رؤى عملية.'
            : 'Here is a collection of projects I worked on as a Data Analyst, showcasing my skills in data analysis, visualization, and turning data into actionable insights.'}
        </ProjectDescription>
        
        <ProjectsContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {projects.map((project, index) => {
            // Check if this is a custom project using the isCustom flag
            const isCustomProject = project.isCustom === true;
            
            return (
            <ProjectItem 
              key={isCustomProject ? project.id : index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                
                {/* Show delete button only for custom projects when in owner mode with admin controls visible */}
                {isCustomProject && isOwnerMode && showAdminControls && (
                  <DeleteButton onClick={() => handleDeleteProject(project.id)}>
                    <FaTrash />
                    <span>{language === 'ar' ? 'حذف المشروع' : 'Delete Project'}</span>
                  </DeleteButton>
                )}
              </ProjectContent>
            </ProjectItem>
          );
          })}
        </ProjectsContainer>
        
        <ContactCTA>
          <CTATitle>{language === 'ar' ? 'هل تريد معرفة المزيد عن مشاريعي؟' : 'Want to know more about my projects?'}</CTATitle>
          <CTAButton to="/contact">{language === 'ar' ? 'تواصل معي' : 'Contact Me'}</CTAButton>
        </ContactCTA>
      </Container>
    </ProjectsSection>
  );
};

const PageTitle = styled(motion.h1)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: var(--primary-color);
`;

const AddProjectButton = styled.button`
  display: block;
  margin: 0 auto 30px;
  padding: 12px 25px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SuccessMessage = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: var(--border-radius);
  text-align: center;
`;

const FormContainer = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 30px;
  margin-bottom: 40px;
  overflow: hidden;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const FormTitle = styled.h3`
  grid-column: 1 / -1;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: var(--primary-color);
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

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 2px rgba(41, 128, 185, 0.2);
  }
`;

const Select = styled.select`
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
  grid-column: 1 / -1;
  padding: 14px 20px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding: 8px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    background-color: #c0392b;
  }
`;

// Removed unused styled component

const ProjectsSection = styled.section`
  padding: 120px 0 80px;
  background-color: var(--light-color);
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
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
