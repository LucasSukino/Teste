import mysql from 'mysql2/promise';

export default async function conectar(){
    if (global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password:'',  
            database: 'sistema',
            waitForConnections: true,
            connectionLimit: 1000,
            maxIdle: 1000, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 200000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
          });

          global.poolConexoes = pool;
          return await pool.getConnection();
    }
}