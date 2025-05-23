import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <ContactSection>
      <Container>
        <SectionTitle>تواصل معي</SectionTitle>
        
        <ContactContainer>
          <ContactInfoContainer
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactInfoTitle>معلومات الاتصال</ContactInfoTitle>
            <ContactInfoText>
              أنا دائمًا مهتم بفرص جديدة مثيرة للاهتمام. سواء كنت تريد مناقشة مشروع تحليل بيانات أو لديك أسئلة حول عملي، فأنا هنا للمساعدة.
            </ContactInfoText>
            
            <ContactInfoItem>
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <ContactText>01100605412</ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactText>wessamabdullah2011@gmail.com</ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactText>القاهرة، أسيوط</ContactText>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactIcon>
                <FaLinkedin />
              </ContactIcon>
              <ContactText>
                <a 
                  href="https://www.linkedin.com/in/wessam-abdullah-b8340b357" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </ContactText>
            </ContactInfoItem>
          </ContactInfoContainer>
          
          <ContactFormContainer
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>الاسم</FormLabel>
                <FormInput 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormInput 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>الموضوع</FormLabel>
                <FormInput 
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>الرسالة</FormLabel>
                <FormTextarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                />
              </FormGroup>
              
              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
              </SubmitButton>
              
              {submitSuccess && (
                <SuccessMessage>
                  تم إرسال رسالتك بنجاح! سأقوم بالرد عليك في أقرب وقت ممكن.
                </SuccessMessage>
              )}
              
              {submitError && (
                <ErrorMessage>
                  حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.
                </ErrorMessage>
              )}
            </ContactForm>
          </ContactFormContainer>
        </ContactContainer>
      </Container>
    </ContactSection>
  );
};

const ContactSection = styled.section`
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

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfoContainer = styled(motion.div)`
  background-color: var(--primary-color);
  color: var(--light-color);
  padding: 40px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--light-color);
`;

const ContactInfoText = styled.p`
  margin-bottom: 30px;
  line-height: 1.7;
`;

const ContactInfoItem = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ContactIcon = styled.div`
  color: var(--secondary-color);
  font-size: 1.5rem;
  margin-right: 15px;
`;

const ContactText = styled.div`
  a {
    color: var(--light-color);
    transition: var(--transition);
    
    &:hover {
      color: var(--secondary-color);
    }
  }
`;

const ContactFormContainer = styled(motion.div)`
  background-color: white;
  padding: 40px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const ContactForm = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--primary-color);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    border-color: var(--secondary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  resize: vertical;
  transition: var(--transition);
  
  &:focus {
    border-color: var(--secondary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-block;
  padding: 12px 30px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 12px;
  background-color: #d4edda;
  color: #155724;
  border-radius: var(--border-radius);
`;

const ErrorMessage = styled.div`
  margin-top: 20px;
  padding: 12px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: var(--border-radius);
`;

export default Contact;
