export class PetModel {
    constructor(
        public PetId?: number,
        public PetName?: string,
        public PetImg?: string,
        public PetAge?: number,
        public PetPrice?: number,
        public PetGender?: string,
        public BreedId? : number,
        public BreedName?: string,
        public SpeciesId? : number,
        public SpeciesName?: string,
        public OwnerId?: string,
        public PetDesc?: string,
        public PetOrderStatus? : string
    ) { }
}