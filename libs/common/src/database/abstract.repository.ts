import { Model } from "mongoose";
import { AbstractDocument } from "./abstract.schema";





export abstract class AbstractRepository<TDocument extends AbstractDocument>{
    constructor(private readonly model: Model<TDocument>){}

    getModelName(){
        return this.model.modelName;
    }
    
    convertToObjectId(id: string): any {
        return this.model.schema.path('_id').cast(id);
    }
}



