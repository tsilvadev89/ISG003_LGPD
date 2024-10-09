const con = require('../database/dbConnection');

// Funções CRUD para produtos

exports.createProduct = async (productData) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = `
            INSERT INTO produto (
                name, image, description, purchasePrice, salePrice, stock, 
                minStock, category, stockLocation, generalInfo, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            productData.name, productData.image, productData.description, 
            productData.purchasePrice, productData.salePrice, productData.stock, 
            productData.minStock, productData.category, productData.stockLocation, 
            productData.generalInfo, productData.status
        ];
        const result = await conn.query(query, values);
        return { id: result.insertId, ...productData };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.getAllProducts = async () => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'SELECT * FROM produto';
        const rows = await conn.query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.getProductById = async (productId) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'SELECT * FROM produto WHERE id = ?';
        const rows = await conn.query(query, [productId]);
        if (rows.length === 0) {
            throw new Error('Produto não encontrado');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.updateProductById = async (productId, productData) => {
    let conn;
    try {
        conn = await con.getConnection();
       /*  console.log(productData); */
        const query = `
            UPDATE produto SET
                name = ?, image = ?, description = ?, purchasePrice = ?, salePrice = ?, 
                stock = ?, minStock = ?, category = ?, stockLocation = ?, 
                generalInfo = ?, status = ?
            WHERE id = ?
        `;
        const values = [
            productData.name, productData.image, productData.description, 
            productData.purchasePrice, productData.salePrice, productData.stock, 
            productData.minStock, productData.category, productData.stockLocation, 
            productData.generalInfo, productData.status, productId
        ];
        const result = await conn.query(query, values);
        if (result.affectedRows === 0) {
            throw new Error('Produto não encontrado');
        }
        return { message: 'Produto atualizado com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};

exports.deleteProductById = async (productId) => {
    let conn;
    try {
        conn = await con.getConnection();
        const query = 'DELETE FROM produto WHERE id = ?';
        const result = await conn.query(query, [productId]);
        if (result.affectedRows === 0) {
            throw new Error('Produto não encontrado');
        }
        return { message: 'Produto excluído com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    } finally {
        if (conn) conn.end();
    }
};
