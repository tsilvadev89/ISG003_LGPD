const createTableQueries = {
    usuarios: `
        CREATE TABLE IF NOT EXISTS usuario (
            id_usuario INT PRIMARY KEY AUTO_INCREMENT,
            nome_usuario VARCHAR(256) NOT NULL,
            email_usuario VARCHAR(256) NOT NULL,
            senha_usuario VARCHAR(256) NOT NULL,
            diretoria_usuario BOOLEAN DEFAULT FALSE,
            permissao_usuario VARCHAR(1) NOT NULL DEFAULT '1',
            admin_usuario BOOLEAN DEFAULT FALSE,
            userPhoto VARCHAR(512)
        );
    `,
    produtos: `
        CREATE TABLE IF NOT EXISTS produto (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(256) NOT NULL,
            image VARCHAR(512) NOT NULL,
            description TEXT,
            purchasePrice DECIMAL(10, 2) NOT NULL,
            salePrice DECIMAL(10, 2) NOT NULL,
            stock INT NOT NULL,
            minStock INT NOT NULL,
            category ENUM('Porção', 'Bebida', 'Combo', 'Diversos') NOT NULL,
            stockLocation VARCHAR(256),
            generalInfo TEXT,
            status BOOLEAN DEFAULT TRUE
        );
    `
};

module.exports = createTableQueries;
