const { Cliente, Funcionario, Pedido, ItemPedido, Endereco, Agendamento, Servico, Produto } = require('../models');

// Função para obter todos os dados do usuário para LGPD
exports.getAllUserData = async (req, res) => {
  try {
    const userId = req.user.id; // ID do usuário autenticado

    // Busca dados do cliente e do funcionário, com associações
    const cliente = await Cliente.findByPk(userId, {
      include: [
        { model: Endereco },
        { 
          model: Pedido,
          include: [
            { model: ItemPedido, include: [Produto] }
          ]
        },
        { model: Agendamento, include: [Servico] }
      ]
    });

    const funcionario = await Funcionario.findByPk(userId, {
      include: [
        { model: Endereco },
        { model: Agendamento, include: [Servico] }
      ]
    });

    if (!cliente && !funcionario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const userData = {
      cliente: cliente || null,
      funcionario: funcionario || null
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Erro ao obter dados do usuário para LGPD:', error);
    res.status(500).json({ message: 'Erro ao obter dados do usuário' });
  }
};
