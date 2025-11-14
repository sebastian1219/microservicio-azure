import sql from 'mssql';

const config = {
  connectionString: process.env.DB_CONNECTION_STRING
};

export const poolPromise = sql.connect(config).then(pool => {
  console.log('Conectado a Azure SQL');
  return pool;
}).catch(err => {
  console.error('Error de conexión:', err);
});