import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class LoginDto {
    @IsNotEmpty({ message: '"email" field must be filled'})
    @IsString()
    email: string

    @IsNotEmpty({ message: '"password" field must be filled'})
    @IsStrongPassword({ 
        minLength: 8, 
        minLowercase: 1, 
        minNumbers: 1, 
        minSymbols: 1, 
        minUppercase: 1, 
    })
    password: string
}