import { IRequest } from './../core/http/router';

import { inject, injectable } from "inversify";
import { IBase, IResult,IError } from './interface';



@injectable()
export class Base implements IBase{


    notSingResult(message: string): IError {
        return  {
            status  : false,
            data    : [],
            message : message
        }
    }

    signResult(data: object): IResult {
        let iterator;
        if (Object.keys(data).length > 1) {
            iterator = data;
        } else {
            iterator = data[0];
        }
         return  {
            status  : true,
            data    : iterator,
            message : ""
        }
    }
}