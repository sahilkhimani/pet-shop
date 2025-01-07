export class ResponseModel {
    constructor(
        public success?: boolean | null,
        public message? : string | null,
        public data? : any[] | null
    ) { }
}