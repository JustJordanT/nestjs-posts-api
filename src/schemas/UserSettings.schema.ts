import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
	@Prop({ type: String, unique: true })
	username: string;
	@Prop({ required: false })
	receiveNotifications?: boolean;

	@Prop({ required: false })
	receiveEmails?: boolean;

	@Prop({ required: false })
	receiveSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);