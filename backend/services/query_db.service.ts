import dotenv from 'dotenv';
import mysql from "mysql";

dotenv.config();

class QueryDbService {
    private query: string;

    constructor(query: string) {
      this.query = query
    }

    private dbCredentials = {
        host: process.env.QUERY_DB_HOST,
        port: process.env.QUERY_DB_PORT,
        user: process.env.QUERY_DB_USER,
        password: process.env.QUERY_DB_PASSWORD,
        database: process.env.QUERY_DB_NAME,
        driver: process.env.QUERY_DB_DRIVER || "mysql",
    }

    public exec() {
        switch (this.dbCredentials.driver) {
            case "mysql":
                return this.execMySQL();
            case "pgsql":
                return this.execPgSQL();
        }
    }

    private execMySQL() {
        const connection = mysql.createConnection({
            host: this.dbCredentials.host,
            user: this.dbCredentials.user,
            password: this.dbCredentials.password,
            database: this.dbCredentials.database,
        })

        return new Promise((resolve, reject) => {
            connection.query(this.query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    };

    private execPgSQL() {
    }
}

export default QueryDbService;