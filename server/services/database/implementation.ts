import * as knex from "knex";
import { createLogger, LoggerOptions, LogLevel } from "bunyan";
import { inject, injectable } from "inversify";
import { ILogService, LogServiceId } from "../log/interface";
import { IDataBaseMySqlService } from "./interface";
import { ConfigServiceId, IConfigService } from "../config/interface";
var mysql = require('mysql')


@injectable()
export class DataBaseMySqlService implements IDataBaseMySqlService {

    db: any;

    @inject(LogServiceId)
    private logger: ILogService;

    @inject(ConfigServiceId)
    private config: IConfigService;

    connection: any;



    initialize(): void {
        const options = this.config.options.database;
        this.connection = mysql.createConnection({
            host: options.host,
            user: options.user,
            password: options.password,
            database: options.database,
        });
        this.logger.info({ database: { host: options.host, user: options.user, password: options.password, database: options.database } }, "database initialized");
        this.connection.connect();
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
    public get knex() {
        return this.db;
    }
}