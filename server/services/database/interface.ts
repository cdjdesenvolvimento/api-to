import { IService } from "../../core/dependencies/service";
var mysql = require('mysql')

export const DatabaseServiceId = Symbol("database");

export interface IDataBaseMySqlService  {

    initialize(): void;
    query(sql, args) :  Promise<{}>
    close():  Promise<{}>
}