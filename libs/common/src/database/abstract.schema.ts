import { Directive, Field, InputType, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaType, SchemaTypes } from "mongoose";




@Schema({ timestamps: true, versionKey: false })
@ObjectType({isAbstract: true})
@InputType({isAbstract: true})
@Directive('@key(fields: "id")')
export class AbstractDocument {
    @Prop({ type: SchemaTypes.ObjectId })
    @Field(() => String , { description: 'Unique identifier for the document' })
    id: string;
}
