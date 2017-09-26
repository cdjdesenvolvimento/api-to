/**
 * Logging service
 */
export const SampleServiceMySqlId = Symbol("sampleMysql");  

export interface ISampleServiceMySql {

    sampleQuery(id: String): Promise<{}>
}
