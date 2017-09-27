export const BaseId = Symbol("base");  

export interface IResult {
    status: boolean,
    message: string,
    data: any
}

export interface IError {
    status: boolean,
    message: string,
    data: Array<any>
}
export interface IBase {
    signResult(data: object): IResult
    notSingResult(message: String): IError 
}
