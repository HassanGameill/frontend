import { z } from "zod";


const SignInSchema = z.object({
    email: z.string().min(1, { message: "Email address is required" }).email(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
     
  })
  

type TSignIn = z.infer<typeof SignUpSchema>


export {SignInSchema, type  TSignIn}