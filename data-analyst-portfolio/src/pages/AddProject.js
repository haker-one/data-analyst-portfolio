import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaFileExcel, FaChartBar, FaUsers } from 'react-icons/fa';
import { SiTableau, SiGoogledatastudio, SiMicrosoftpowerpoint } from 'react-icons/si';

const AddProject = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    icon: 'FaFileExcel',
    image: 'https://via.placeholder.com/600x400?text=Project+Image'
  });
  
  const [successMessage, setSuccessMessage] = useState('');

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
  }, [projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new project object
    const newProject = {
      id: Date.now().toString(), // Simple unique ID based on timestamp
      title: {
        ar: formData.title_ar,
        en: formData.title_en
      },
      description: {
        ar: formData.description_ar,
        en: formData.description_en
      },
      icon: formData.icon,
      image: formData.image,
      items: []
    };
    
    // Add the new project to the projects array
    setProjects([...projects, newProject]);
    
    // Reset form
    setFormData({
      title_ar: '',
      title_en: '',
      description_ar: '',
      description_en: '',
      icon: 'FaFileExcel',
      image: 'https://via.placeholder.com/600x400?text=Project+Image'
    });
    
    // Show success message
    setSuccessMessage(language === 'ar' ? 'تمت إضافة المشروع بنجاح!' : 'Project added successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const getIconOptions = () => {
    return [
      { value: 'FaFileExcel', label: language === 'ar' ? 'إكسل' : 'Excel' },
      { value: 'FaChartBar', label: language === 'ar' ? 'رسم بياني' : 'Chart Bar' },
      { value: 'FaUsers', label: language === 'ar' ? 'مستخدمين' : 'Users' },
      { value: 'SiTableau', label: 'Tableau' },
      { value: 'SiGoogledatastudio', label: 'Looker Studio' },
      { value: 'SiMicrosoftpowerpoint', label: 'Power BI' }
    ];
  };

  return (
    <PageContainer>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {language === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}
      </PageTitle>
      
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      
      <FormContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Form onSubmit={handleSubmit}>
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
      
      <ProjectsList>
        <ProjectsListTitle>
          {language === 'ar' ? 'المشاريع المضافة' : 'Added Projects'}
        </ProjectsListTitle>
        
        {projects.length === 0 ? (
          <NoProjects>
            {language === 'ar' ? 'لا توجد مشاريع مضافة بعد.' : 'No projects added yet.'}
          </NoProjects>
        ) : (
          <ProjectsGrid>
            {projects.map((project) => (
              <ProjectCard key={project.id}>
                <ProjectTitle>
                  {language === 'ar' ? project.title.ar : project.title.en}
                </ProjectTitle>
                <ProjectDescription>
                  {language === 'ar' ? project.description.ar : project.description.en}
                </ProjectDescription>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        )}
      </ProjectsList>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 60px;
`;

const PageTitle = styled(motion.h1)`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: var(--primary-color);
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
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  padding: 14px 20px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  grid-column: 1 / -1;
  margin-top: 10px;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectsList = styled.div`
  margin-top: 60px;
`;

const ProjectsListTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--primary-color);
`;

const NoProjects = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: #777;
  padding: 30px;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 20px;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--dark-color);
`;

const ProjectDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export default AddProject;
