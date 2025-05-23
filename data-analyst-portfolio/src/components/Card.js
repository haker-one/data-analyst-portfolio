import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = ({ title, description, icon, image, link, items }) => {
  return (
    <CardContainer 
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {image && <CardImage src={image} alt={title} />}
      
      <CardContent>
        {icon && <CardIcon>{icon}</CardIcon>}
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        
        {items && items.length > 0 && (
          <CardList>
            {items.map((item, index) => (
              <CardListItem key={index}>{item}</CardListItem>
            ))}
          </CardList>
        )}
        
        {link && (
          <CardLink href={link} target="_blank" rel="noopener noreferrer">
            عرض المزيد
          </CardLink>
        )}
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled(motion.div)`
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
  color: var(--secondary-color);
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--primary-color);
`;

const CardDescription = styled.p`
  margin-bottom: 15px;
  color: var(--text-color);
  line-height: 1.6;
`;

const CardList = styled.ul`
  margin-top: auto;
  margin-bottom: 15px;
`;

const CardListItem = styled.li`
  position: relative;
  padding-right: 20px;
  margin-bottom: 8px;
  
  &:before {
    content: "•";
    position: absolute;
    right: 0;
    color: var(--secondary-color);
  }
`;

const CardLink = styled.a`
  align-self: flex-start;
  margin-top: auto;
  color: var(--secondary-color);
  font-weight: 600;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-color);
  }
`;

export default Card;
