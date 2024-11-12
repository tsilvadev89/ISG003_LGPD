import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePageLayout from "../components/layouts/Pages/Home/HomePage/HomePageLayout";
import NotFoundPage from '../components/layouts/Pages/PageNotFound/PageNotFound';

import CadastroProdutosLayout from '../components/layouts/Pages/PageCadastros/Produtos/CadastroProdutosLayout';
import CadastroServicoLayout from '../components/layouts/Pages/PageCadastros/Servicos/CadastroServicoLayout';
import CadastroPessoasLayout from '../components/layouts/Pages/PageCadastros/Pessoas/CadastroPessoasLayout';
import DashboardLayout from '../components/layouts/Pages/DashBoard/DashboardLayout';
import CadastroCategoriaLayout from '../components/layouts/Pages/PageCadastros/Categoria/CadastroCategoriaLayout';
import CadastroCargoLayout from '../components/layouts/Pages/PageCadastros/Cargo/CadastroCargoLayout';
import LoginLayout from '../components/layouts/Pages/Login/LoginLayout';

import PrivateRoute from './PrivateRoute'; // Importe o PrivateRoute
import ConfiguracaoLayout from '../components/layouts/Pages/Configuracao/ConfiguracaoLayout';

const RoutesConfig: React.FC = () => {
    return (
        <Routes>
            {/* Rota pública */}
            <Route path="/" element={<LoginLayout />} />

            {/* Rotas privadas, protegidas pelo PrivateRoute */}
            <Route path="/home" element={<PrivateRoute element={<HomePageLayout />} />} />
            <Route path="/cadastropessoas" element={<PrivateRoute element={<CadastroPessoasLayout />} />} />
            <Route path="/cadastroproduto" element={<PrivateRoute element={<CadastroProdutosLayout />} />} />
            <Route path="/cadastroservicos" element={<PrivateRoute element={<CadastroServicoLayout />} />} />
            <Route path="/categorias" element={<PrivateRoute element={<CadastroCategoriaLayout />} />} />
            <Route path="/cargos" element={<PrivateRoute element={<CadastroCargoLayout />} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<DashboardLayout />} />} />

            <Route path="/configuracao" element={<PrivateRoute element={<ConfiguracaoLayout />} />} />

            {/* Rota de "Página não encontrada" */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default RoutesConfig;
