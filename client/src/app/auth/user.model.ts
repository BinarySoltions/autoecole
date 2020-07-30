export class User {
    id: number;
    email: string;
    password: string;
    password_confirmation:string;
    name: string;
    access_token: string;
    remember_me:boolean=true;
    idSocial:string;
    image:string;
    provider:string;
    token?:string;
    idToken?:string;
    from?:string;
}
