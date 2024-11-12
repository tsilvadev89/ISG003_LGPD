import React from "react";
import { Route, Navigate } from "react-router-dom";
import { authService } from "../services/authService ";

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isAuthenticated = authService.isAuthenticated(); // Verifique se o usuário está autenticado

  if (!isAuthenticated) {
    // Redireciona para a página de login com a mensagem de erro
    return <Navigate to="/" state={{ from: 'private', message: 'Você não está autenticado. Por favor, faça login.' }} />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
