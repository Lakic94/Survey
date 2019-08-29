export class formModel{
    _id:number;
    title:string;
    description:string;
    questions:any[]

    constructor(){
        this.title='',
        this.description='',
        this.questions=[]
    }
}