export class RegisterModel{
    constructor(
        public UserName? : string | null,
        public UserEmail? : string | null,
        public Password? : string | null,
        public ConfirmPassword? : string | null,
        public PhoneNumber? : string | null,
        public RoleId? : string | null
    ) {}
}