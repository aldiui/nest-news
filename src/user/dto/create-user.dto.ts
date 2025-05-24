import { z, ZodObject } from "zod";


const CreateUserSchema = z.object({
    username: z.string(
        {
            required_error: "Username is required",
            invalid_type_error: "Username must be a string",
        })
        .min(1, { message: "Username is required" }),
    email: z.string(
        {
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
        .email({ message: "Email must be a valid email address" }),
    name: z.string(
        {
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
       .min(1, { message: "Name is required" }),
})

export class CreateUserDto {
   static schema: ZodObject<any> = CreateUserSchema;

   constructor(
       public readonly username: string,
       public readonly email: string,
       public readonly name: string,
   ) { }
}