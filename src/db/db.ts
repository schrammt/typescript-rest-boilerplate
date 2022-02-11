import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { User as UserEntity } from "../entity";

const DbConnectionOptions: ConnectionOptions = {
    type: "sqlite",
    database: `./data/db.sqlite`,
    entities: [UserEntity],
    logging: true,
    synchronize: true,
  };

export class Database {
    private static connection?: Connection;

    // static async init(options: ConnectionOptions) {
    //     Database.connection = await createConnection(options);
    // }

    public static async getConnection() {
        if (!this.connection) {
            this.connection = await createConnection(DbConnectionOptions);
        }

        return this.connection;
    }
}