
declare var DB: any;

class QuestionService {

    private actCategory:any;
    private actQuestion:number;

    private questions = [];  // das ist das ganz json obj mit den categorien, es sind nicht nur die Fragen

    getQuestionNumber() {
        //if (!this.actQuestion == null) {
            return this.actCategory.questions.length;
        //} else {
        //    return 999;
        //}

    }

    //gib mir die nächste frage
    getNextQuestion():Promise<any> {

        const service = this;

        return new Promise((resolve, reject) => {

            if (service.actQuestion == null || service.actQuestion >= service.actCategory.questions.length-1) {
                service.actQuestion = -1;
            }

            service.actQuestion++;

            resolve(service.actCategory.questions[service.actQuestion]);

        });
    }

    getPrevQuestion():Promise<any> {

        const service = this;

        return new Promise((resolve, reject) => {

            if (service.actQuestion == null || service.actQuestion <= 0) {
                service.actQuestion = service.actCategory.questions.length;
            }

            service.actQuestion--;

            resolve(service.actCategory.questions[service.actQuestion]);

        });
    }


    setCategory(cat:string):Promise<boolean> {

        return new Promise((resolve, reject) => {


            var category = this.questions.filter(category => category.name == cat)[0];

            this.actCategory = category;
            this.actQuestion = null;
            
            //aktuelles fragen array shuffeln:
            //var questionsThisCat = this.actCategory.questions;
            //questionsThisCat.sort(function() { return 0.5 - Math.random() });

            this.actCategory.questions.forEach( (q, idx) => {
                //Nummer setzen
                q.number = idx;
            });

            //aktuelles fragen array shuffeln:
            var questionsThisCat = this.actCategory.questions;
            questionsThisCat.sort(function() { return 0.5 - Math.random() });

            resolve(true);
        });
    }

    getCategories():Promise<any> {
        
        return DB.ready().then((yo) => {

            return new Promise((resolve, reject) => {

                DB.Questions.find().resultList((result) => {
                    this.questions = result;
                    resolve(this.questions);
                }, (e) => {
                    console.log('keine Kategorien gefunden!')
                });
            })
        })
    }

    setNewQuestion(q,a):Promise<any> {

        var service = this;

        var item = {
            q : q,
            a : a
        };

        console.log(this.questions);
        //
        // this.questions.forEach((item,idx) => {       //todo: hearusfinden warum hier save nicht geht
        //     console.log(item.name);
        //     if (item.name == service.actCategory.name) {
        //         service.questions[idx].questions.push(item);
        //     }
        // });
        //
        // return service.questions.save({force:true});

        service.actCategory.questions.push(item);
        var tmp = service.actCategory.questions;    //todo: rausfinden warum man hier tmp benötigt

        return DB.Questions.find()
            .equal("name", service.actCategory.name) //service.actCatgegory.name z.B. "Kommunikationsnetze 1"
            .singleResult( function (cat) {

                cat.questions = tmp;
                return cat.save({force: true});
            });


    }

}

export var questionService = new QuestionService();