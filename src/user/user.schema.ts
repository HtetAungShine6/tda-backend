import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({
        type: String,
        required: true,
    })
    username: string;

    @Prop({ 
        required: true,
        unique: true 
    })
    email: string;

    @Prop({ 
        type: String,
        minlength: 6,
        required: true,
    })
    password: string;

    @Prop({ 
        type: Date,
        required: true 
    })
    dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);