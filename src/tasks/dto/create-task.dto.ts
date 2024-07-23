import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {
    @IsNotEmpty({ message: "O nome obrigatório"})
    @IsString()
    name: string;

    @IsNotEmpty({ message: "O status obrigatório"})
    @IsEnum(TaskStatus)
    status: TaskStatus;



    projectId: number;
    
}
