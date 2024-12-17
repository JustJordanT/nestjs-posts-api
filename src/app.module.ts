import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from './posts/post.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jordantay9014:iIh24KWB5ArRcWeB@cluster0.majhe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
