import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty({ message: "O nome  obrigatório."})
    @IsString()
    name: string;

    @IsNotEmpty({ message: "A descrição obrigatória"})
    @IsString()
    description: string;
}