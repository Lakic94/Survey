
export class Question {

    title:string;
    questionType:string;
    options?:[];
    answers?:any[];

    constructor(model:any){
        this.title = model.title;
        this.questionType = model.questionType;
        if(model.options === ''){
            this.options = model.options;
        }
        this.answers = [];
    }

    option(options:any ){
        this.options = options;
    }
}
