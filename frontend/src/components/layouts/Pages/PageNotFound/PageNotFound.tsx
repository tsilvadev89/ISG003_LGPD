import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const NotFoundTitle = styled.h1`
  font-size: 3rem;
  color: #333;
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const NotFoundLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
`;

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404 - Página não encontrada</NotFoundTitle>
      <NotFoundText>
        Desculpe, a página que você está procurando não foi encontrada.
      </NotFoundText>
      <NotFoundLink to="/">Voltar para a página inicial</NotFoundLink>
    </NotFoundContainer>
  );
};

export default NotFoundPage; // Certifique-se de ter esse export default no final
