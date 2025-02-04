export class UpdateUserModel {
    constructor(
        public UserName?: string,
        public CurrentPassword?: string,
        public Password?: string,
        public ConfirmPassword?: string,
        public PhoneNumber?: string
    ) { }
}