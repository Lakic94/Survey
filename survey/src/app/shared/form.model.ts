export class formModel{
    _id:number;
    title:string;
    description:string;
    questions?:Question[];
    userId:string;

    constructor(model:any){
        this.title = model.title;
        this.description = model.description;
        this.questions = [];
        
    }
    
    

}

import { Question } from './question.model'
