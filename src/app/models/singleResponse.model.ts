export class SingleResponseModel {
    constructor(
        public success?: boolean | null,
        public message?: string | null,
        public data?: any | null
    ) { }
}