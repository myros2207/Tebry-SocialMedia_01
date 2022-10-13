export class StateModel{
    public readonly Login: string;
    public readonly Token: string;
    public readonly Role: string;

    constructor(Login: string, Token: string, Role: string) {
        this.Login = Login;
        this.Token = Token;
        this.Role = Role;
    }
}