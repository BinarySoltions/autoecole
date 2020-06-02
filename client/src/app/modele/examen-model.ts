export class ExamenModel {
    numeroTest:string='';
    nomComplet:string='';
    nomEcole:string='';
    date:string;
    reprise:RepriseModel;
    q1:ReponseModel;
    q2:ReponseModel;
    q3:ReponseModel;
    q4:ReponseModel;
    q5:ReponseModel;
    q6:ReponseModel;
    q7:ReponseModel;
    q8:ReponseModel;
    q9:ReponseModel;
    q10:ReponseModel;
    q11:ReponseModel;
    q12:ReponseModel;
    q13:ReponseModel;
    q14:ReponseModel;
    q15:ReponseModel;
    q16:ReponseModel;
    q17:ReponseModel;
    q18:ReponseModel;
    q19:ReponseModel;
    q20:ReponseModel;
    q21:ReponseModel;
    q22:ReponseModel;
    q23:ReponseModel;
    q24:ReponseModel;
    constructor(){
        this.nomComplet = '';
        this.nomEcole = '';
        this.numeroTest = '';
        this.reprise = new RepriseModel();
        this.q1 = new ReponseModel(false,false,false,false);
        this.q2 = new ReponseModel(false,false,false,false);
        this.q3 = new ReponseModel(false,false,false,false);
        this.q4 = new ReponseModel(false,false,false,false);
        this.q5 = new ReponseModel(false,false,false,false);
        this.q6 = new ReponseModel(false,false,false,false);
        this.q7 = new ReponseModel(false,false,false,false);
        this.q8 = new ReponseModel(false,false,false,false);
        this.q9 = new ReponseModel(false,false,false,false);
        this.q10 = new ReponseModel(false,false,false,false);
        this.q11 = new ReponseModel(false,false,false,false);
        this.q12 = new ReponseModel(false,false,false,false);
        this.q13 = new ReponseModel(false,false,false,false);
        this.q14 = new ReponseModel(false,false,false,false);
        this.q15 = new ReponseModel(false,false,false,false);
        this.q16 = new ReponseModel(false,false,false,false);
        this.q17 = new ReponseModel(false,false,false,false);
        this.q18 = new ReponseModel(false,false,false,false);
        this.q19 = new ReponseModel(false,false,false,false);
        this.q20 = new ReponseModel(false,false,false,false);
        this.q21 = new ReponseModel(false,false,false,false);
        this.q22 = new ReponseModel(false,false,false,false);
        this.q23 = new ReponseModel(false,false,false,false);
        this.q24 = new ReponseModel(false,false,false,false);
    }
}

export class RepriseModel{
    uneFois:any;
    deuxFois:any;
    nFois:any;
}

export class ReponseModel{
    constructor(a,b,c,d){
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    a:any;
    b:any;
    c:any;
    d:any;
}