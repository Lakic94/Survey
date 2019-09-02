
export class Question {

    id:string;
    title:string;
    questionType:string;
    options?:[];

    constructor(model:any){
        this.title = model.title;
        this.questionType = model.questionType;
        if(model.options === ''){
            this.options = model.options;
        }
    }

    option(options:any ){
        this.options = options;
    }
}