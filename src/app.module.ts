import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuardService } from './modules/auth/auth-guard/auth-guard.service';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeormModule } from './modules/config/typeorm/typeorm.module';
import { UsersModule } from './modules/users/users.module';

// import { CacheModule } from '@nestjs/cache-manager';






@Module({
  imports: [
    ProjectsModule, 
    UsersModule, 
    TasksModule, 
    TypeormModule,
    // CacheModule.register({
    //   isGlobal: true
    // }), 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, { 
    provide: APP_GUARD, useClass: AuthGuardService,
  }],
})
export class AppModule {}
