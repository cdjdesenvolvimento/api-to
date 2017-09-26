import { IDataBaseMySqlService, DatabaseServiceId } from './../database/interface';
import { inject, injectable } from "inversify";
import { ISampleServiceMySql } from './interface';


@injectable()
export class SampleServiceMysql implements ISampleServiceMySql {

    @inject(DatabaseServiceId)
    private db: IDataBaseMySqlService;

    sampleQuery(id: String): Promise<{}> {
        return this.db.query('SELECT * FROM persons WHERE ( id = ? )', id).then(function (rows) {
            return rows
        })
    }
}