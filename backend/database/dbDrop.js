const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "fatec",
  port: 3308,
  connectionLimit: 5
});

async function deleteDatabase() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Conectado");

    const sql = "DROP DATABASE so2";
    await conn.query(sql);
    console.log("Database so2 deletada");

  } catch (err) {
    console.error("Erro durante a operação:", err);
  } finally {
    if (conn) {
      try {
        await conn.end();
        console.log("Conexão encerrada");
      } catch (endErr) {
        console.error("Erro ao encerrar a conexão:", endErr);
      }
    }
  }
}

deleteDatabase().then(() => process.exit()).catch(err => {
  console.error("Erro na execução do script:", err);
  process.exit(1);
});
