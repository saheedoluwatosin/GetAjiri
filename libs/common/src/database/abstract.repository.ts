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

    async findById(id: string): Promise<TDocument | null> {
        return this.model.findById(this.convertToObjectId(id)).exec();
    }
    async ifNotFoundCreate(data: Partial<TDocument>): Promise<TDocument> {
        const existingDocument = await this.model.findOne({ _id: this.convertToObjectId(data._id) }).exec();
        if (existingDocument) {
            return existingDocument;
        }
        const newDocument = new this.model(data);
        return newDocument.save();
    }

    async findOneAndUpdate(
        filter: Partial<TDocument>,
        update: Partial<TDocument>,
        options: { new?: boolean } = {}
    ): Promise<TDocument | null> {
        return this.model.findOneAndUpdate(filter, update, { new: options.new }).exec();
    }
}



