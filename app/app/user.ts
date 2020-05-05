export class RegisterUser{
    constructor(
        public aadhar: Number,
        public name: String,
        public birth: Date,
        public occupation: String,
        public address: String,
        public place: String,
        public district: String,
        public contact: Number,
        public sex: String,
        public maritial: String,
        public email: String,
        public password: String
    ){}
}

export class LoginUser{
    constructor(
        public aadhar: Number,
        public password: String
    ){ }
}