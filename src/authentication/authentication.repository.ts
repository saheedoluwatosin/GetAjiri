import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "libs/common/src/database/abstract.repository";
import { User} from "libs/common/src/schema/user.schema";
import { Model } from "mongoose";






export class AuthenticationRepository extends AbstractRepository<User>{
    constructor(
        @InjectModel(User.name) 
        readonly userModel: Model<User>,
    ) {
        super(userModel);
    }
    

    // async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    //     return this.userModel.findOne({ phoneNumber }).exec();
    // }

    
}