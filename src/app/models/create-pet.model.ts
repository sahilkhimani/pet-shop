export class CreatePetModel {
    constructor(
       public petName : string,
       public petDesc : string,
       public petAge : number,
       public petPrice : number,
       public petGender : string,
       public breedId : number,
    ) { }
}