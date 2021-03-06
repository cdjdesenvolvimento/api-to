import { ISampleServiceMySql, SampleServiceMySqlId } from './../../services/sample_service_mysql/interface';
import { ILogService, LogServiceId } from './../../services/log/interface';
import { inject, injectable } from "inversify";

import { get,post, router } from "../../core/http/decorators";
import { IRequest, IResponse, Router } from "../../core/http/router";
import { ConfigServiceId, IConfigService } from "../../services/config/interface";

/**
 * Response interface
 */
interface IVersionResponse {
    commit: string;
    environment: string;
    version: string;
    something: string;
}

interface IError {
    status: boolean,
    message: string,
    data: {}
}

interface IPerson {
    status: boolean,
    message: string,
    data: {
        id: string;
        nome: string;
        sobrenome: string;
    }
}

@injectable()
@router()
export class IndexRouter extends Router {

    @inject(ConfigServiceId)
    private config: IConfigService;

    @inject(SampleServiceMySqlId)
    private sampleServiceMysql: ISampleServiceMySql;

    @get("/")
    public async index(request: IRequest, response: IResponse): Promise<string> {
        return "apito";
    }

    @get("/version")
    public async version(request: IRequest, response: IResponse): Promise<IVersionResponse> {
        return {
            commit: this.config.commit,
            environment: this.config.environment,
            something: this.config.options.this.is.something,
            version: this.config.version,
        };
    }

    @post("/mysql")
    public async mysql(request: IRequest, response: IResponse): Promise<IPerson | IError> {
        return this.sampleServiceMysql.sampleQuery(request.payload.id).then((data) => {
            if (Object.keys(data).length > 0) {
                return this.signResult(data);
            } else {
                return this.notSingResult("Nenhum resultado encontrado para o id:"+request.payload.id);
            }
        })
    }
}
