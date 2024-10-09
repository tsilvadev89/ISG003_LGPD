const con = require('../database/dbConnection');

// Funções CRUD para usuários

exports.createUser = async (userData) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = `
            INSERT INTO usuario (
                nome_usuario, email_usuario, senha_usuario, diretoria_usuario, 
                permissao_usuario, admin_usuario, userPhoto
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            userData.nome_usuario, userData.email_usuario, userData.senha_usuario, 
            userData.diretoria_usuario, userData.permissao_usuario, 
            userData.admin_usuario, userData.userPhoto
        ];
        const result = await conn.query(query, values);
        return { id: result.insertId, ...userData };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.getAllUsers = async () => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'SELECT * FROM usuario';
        const rows = await conn.query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.getUserById = async (userId) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
        const rows = await conn.query(query, [userId]);
        if (rows.length === 0) {
            throw new Error('Usuário não encontrado');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.updateUserById = async (userId, userData) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = `
            UPDATE usuario SET 
                nome_usuario = ?, email_usuario = ?, senha_usuario = ?, 
                diretoria_usuario = ?, permissao_usuario = ?, admin_usuario = ?, 
                userPhoto = ? 
            WHERE id_usuario = ?
        `;
        const values = [
            userData.nome_usuario, userData.email_usuario, userData.senha_usuario, 
            userData.diretoria_usuario, userData.permissao_usuario, 
            userData.admin_usuario, userData.userPhoto, userId
        ];
        const result = await conn.query(query, values);
        if (result.affectedRows === 0) {
            throw new Error('Usuário não encontrado');
        }
        return { message: 'Usuário atualizado com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.deleteUserById = async (userId) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'DELETE FROM usuario WHERE id_usuario = ?';
        const result = await conn.query(query, [userId]);
        if (result.affectedRows === 0) {
            throw new Error('Usuário não encontrado');
        }
        return { message: 'Usuário excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};
