// populate/populateServicos.js
const { Servico } = require('../models');

async function populateServicos() {
  console.log('Inserindo dados de serviços...');
  await Servico.bulkCreate([
    {
      nome: 'Corte de Cabelo Masculino',
      descricao: 'Corte e finalização',
      preco: 40.00,
      duracao: '00:30:00',
      categoria_id: 1,
      imagem_url: 'https://images.unsplash.com/photo-1511920922889-5c35bfd95a7f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Hidratação Capilar',
      descricao: 'Hidratação para cabelos secos',
      preco: 60.00,
      duracao: '00:45:00',
      categoria_id: 1,
      imagem_url: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Cauterização Capilar',
      descricao: 'Tratamento para reconstrução capilar',
      preco: 70.00,
      duracao: '01:00:00',
      categoria_id: 1,
      imagem_url: 'https://www.belezasimples.com.br/wp-content/uploads/2019/10/0000cauterizacao_capa-710x503.jpg',
    },
    {
      nome: 'Coloração',
      descricao: 'Coloração capilar completa',
      preco: 90.00,
      duracao: '01:30:00',
      categoria_id: 1,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1661630726197-3bb591b15d98?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Botox Capilar',
      descricao: 'Redução de volume e hidratação',
      preco: 80.00,
      duracao: '01:00:00',
      categoria_id: 1,
      imagem_url: 'https://paradafeminina.com.br/wp-content/uploads/2020/02/botox.png',
    },
    {
      nome: 'Maquiagem Social',
      descricao: 'Maquiagem para eventos sociais',
      preco: 100.00,
      duracao: '01:00:00',
      categoria_id: 2,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1661770834484-266859b6be88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Sobrancelha Design',
      descricao: 'Design e preenchimento de sobrancelha',
      preco: 40.00,
      duracao: '00:30:00',
      categoria_id: 2,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1663050996462-4671145bf66f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Limpeza de Pele',
      descricao: 'Limpeza profunda da pele',
      preco: 120.00,
      duracao: '01:00:00',
      categoria_id: 2,
      imagem_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Peeling Facial',
      descricao: 'Tratamento de rejuvenescimento facial',
      preco: 150.00,
      duracao: '01:00:00',
      categoria_id: 2,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1663040173266-4d41d3736cc9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Maquiagem para Noivas',
      descricao: 'Maquiagem especial para noivas',
      preco: 200.00,
      duracao: '02:00:00',
      categoria_id: 2,
      imagem_url: 'https://images.unsplash.com/photo-1592343516059-cf2712eb0dee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Hidratação Facial',
      descricao: 'Hidratação profunda da pele',
      preco: 50.00,
      duracao: '00:30:00',
      categoria_id: 3,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1708271138660-0427d0f25942?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Massagem Relaxante',
      descricao: 'Massagem para relaxamento',
      preco: 90.00,
      duracao: '01:00:00',
      categoria_id: 3,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1661582395155-e74bb0d891c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Tratamento Antienvelhecimento',
      descricao: 'Tratamento para pele madura',
      preco: 200.00,
      duracao: '01:30:00',
      categoria_id: 3,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1661457800454-64ba872af3f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Esfoliação Corporal',
      descricao: 'Esfoliação e hidratação corporal',
      preco: 80.00,
      duracao: '01:00:00',
      categoria_id: 3,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1683121902668-41f60858608a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Drenagem Linfática',
      descricao: 'Massagem de drenagem linfática',
      preco: 100.00,
      duracao: '01:00:00',
      categoria_id: 3,
      imagem_url: 'https://d1xe7tfg0uwul9.cloudfront.net/sbd-portal-2024/wp-content/uploads/2022/06/Drenagem-linfatica-e-benefica-para-a-saude-shutterstock-1.webp',
    },
    {
      nome: 'Manicure Tradicional',
      descricao: 'Manicure com esmaltação',
      preco: 25.00,
      duracao: '00:30:00',
      categoria_id: 4,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1661290231745-15f1ed6fea88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Pedicure Completa',
      descricao: 'Cuidado completo dos pés',
      preco: 35.00,
      duracao: '00:40:00',
      categoria_id: 4,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1661499249417-c20d6b668469?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Esmaltação em Gel',
      descricao: 'Esmaltação duradoura em gel',
      preco: 50.00,
      duracao: '00:50:00',
      categoria_id: 4,
      imagem_url: 'https://unhadecoradasimples.com.br/wp-content/uploads/2024/06/unhas-em-gel-decoradas-12.jpg',
    },
    {
      nome: 'Unhas Acrigel',
      descricao: 'Alongamento e esmaltação com acrigel',
      preco: 80.00,
      duracao: '01:30:00',
      categoria_id: 4,
      imagem_url: 'https://vidarealdemulheres.com.br/wp-content/uploads/2024/05/unhas-acrigel-decoradas-capa-.jpeg',
    },
    {
      nome: 'Unhas de Fibra',
      descricao: 'Alongamento e esmaltação com fibra',
      preco: 90.00,
      duracao: '01:30:00',
      categoria_id: 4,
      imagem_url: 'https://unhadecoradasimples.com.br/wp-content/uploads/2024/04/13_hq720.jpg',
    },
    {
      nome: 'Perfume Importado',
      descricao: 'Perfume com fragrância marcante',
      preco: 200.00,
      duracao: '00:00:00',
      categoria_id: 5,
      imagem_url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Perfume Nacional',
      descricao: 'Perfume com fragrância suave',
      preco: 120.00,
      duracao: '00:00:00',
      categoria_id: 5,
      imagem_url: 'https://essenciadehomem.com.br/wp-content/uploads/2023/11/Perfumes-Masculinos-Nacionais-Que-Parecem-Importados.jpg',
    },
    {
      nome: 'Água de Colônia',
      descricao: 'Perfume leve para uso diário',
      preco: 80.00,
      duracao: '00:00:00',
      categoria_id: 5,
      imagem_url: 'https://images.unsplash.com/photo-1674469296521-e6b42d9768a4?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Deo Colônia',
      descricao: 'Perfume suave para uso cotidiano',
      preco: 90.00,
      duracao: '00:00:00',
      categoria_id: 5,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1675018083544-021f18a5ef19?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      nome: 'Perfume Amadeirado',
      descricao: 'Perfume com notas amadeiradas',
      preco: 250.00,
      duracao: '00:00:00',
      categoria_id: 5,
      imagem_url: 'https://plus.unsplash.com/premium_photo-1691592871274-5d0531e7518b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]);
  console.log('Serviços inseridos.');
}

module.exports = populateServicos;