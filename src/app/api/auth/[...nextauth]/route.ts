import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"


 export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string ,
      }),
      CredentialsProvider({
                 name: "Credentials",
                 credentials:{
                      username: {
                        label:"Username",
                        type: "text",
                        placeholder: "Your Username",
                      },
                      password: {
                        label:"Password",
                        type: "password",
                        placeholder: "Your Password",
                      },
                 },
                 async authorize (credentials) {
                       const user = {
                        name: "Zaka",
                        id: "10",
                        password: "Zaka"
                       }

                       if(credentials?.username === user.name && credentials?.password === user.password){
                        return user
                       }else{
                        return null
                       }
                 }

      }),
      // ...add more providers here
    ],
  }

const handler = NextAuth(
    authOptions
)

export { handler as GET, handler as POST }