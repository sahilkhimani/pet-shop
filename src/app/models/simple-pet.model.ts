export class SimplePetModel {
    constructor(
        public petId?: number,
        public petName?: string,
        public petAge?: number,
        public petPrice?: number,
        public petGender?: string,
        public BreedId? : number,
        public breedName?: string,
        public ownerId?: string,
        public petDesc?: string,
    ) { }
}