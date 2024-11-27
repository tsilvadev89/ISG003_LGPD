const bcrypt = require('bcrypt');
const { Funcionario } = require('../models');

async function populateFuncionarios() {
  console.log('Inserindo dados de funcionários...');

  // Senha padrão para os testes
  const defaultPassword = '123456789';

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // Array de funcionários para inserir
  const funcionariosData = [
    {
      primeiro_nome: 'Thiago',
      sobrenome: 'Silva',
      email: 't_hiago_csilva@hotmail.com',
      cargo_id: 1,
      data_contratacao: '2021-01-15',
      imagem_url: 'https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      senha: hashedPassword, // Senha criptografada
    },
    {
      primeiro_nome: 'Thiago',
      sobrenome: 'Silva',
      email: 'thiagodorockk@hotmail.com',
      cargo_id: 2,
      data_contratacao: '2020-08-20',
      imagem_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      senha: hashedPassword, // Senha criptografada
    },
    {
      primeiro_nome: 'Juliano',
      sobrenome: 'Prado',
      email: 'juliano.devprado98@gmail.com',
      cargo_id: 3,
      data_contratacao: '2019-07-12',
      imagem_url: 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      senha: hashedPassword, // Senha criptografada
    },
    {
      primeiro_nome: 'Pedro',
      sobrenome: 'Cardozo',
      email: 'phsc020609@gmail.com',
      cargo_id: 4,
      data_contratacao: '2021-03-10',
      imagem_url: 'https://images.unsplash.com/photo-1573497490790-9053816a01d4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      senha: hashedPassword, // Senha criptografada
    },
    {
      primeiro_nome: 'Thiago',
      sobrenome: 'Silva',
      email: 'tsilva.dev89@gmail.com',
      cargo_id: 5,
      data_contratacao: '2022-05-05',
      imagem_url: 'https://images.unsplash.com/photo-1674049405530-7bbb0b0c1eef?q=80&w=2070&auto=format&fit=crop&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      senha: hashedPassword, // Senha criptografada
    },
  ];

  // Inserir os dados no banco de dados
  await Funcionario.bulkCreate(funcionariosData);
  console.log('Funcionários inseridos.');
}

module.exports = populateFuncionarios;
