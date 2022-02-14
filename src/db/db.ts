import { Connection, ConnectionOptions, createConnection } from "typeorm";
import {User as UserEntity } from "../entity";

const DbConnectionOptions: ConnectionOptions = {
    type: "sqlite",
    database: `./data/db.sqlite`,
    entities: [UserEntity],
    logging: false,
    synchronize: true,
  };

export class Database {
    private static connection?: Connection;

    public static async getConnection() {
        if (!this.connection) {
            this.connection = await createConnection(DbConnectionOptions);
        }

        return this.connection;
    }
}