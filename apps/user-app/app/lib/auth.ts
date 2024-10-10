import db from "@repo/orm/client"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "phone Number", type: "text", placeholder: "+91 " },

        password: { label: "Password", type: "Password" },
      },
        
      async authorize(Credientials: Record<"phone" | "password", string> |undefined) {
        if (!Credientials) {
          console.log("Credentials are undefined");
          return null; // Or throw an error
        }
        const hashedPassword = await bcrypt.hash(Credientials.password, 10);
        console.log(hashedPassword);
        console.log(process.env.JWT_SECRET);
        const exisitingUser = await db.user.findFirst({
          where: {
            number: Credientials.phone,
          },
        });
        // console.log(exisitingUser);
        if (exisitingUser) {
          const passwordValidation = await bcrypt.compare(
            Credientials.password,
            exisitingUser.password
          );

          if (passwordValidation) {
            return {
              id: exisitingUser.id.toString(),
              name: exisitingUser.name,
              email: exisitingUser.number,
            };
          }
          return null;
        }
        try {
          const user = await db.user.create({
            data: {
              number: Credientials.phone,
              password: hashedPassword,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.log(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",

  callbacks: {
    async session({ token, session }:any) {
      console.log("callbacks");
      session.user.id = token.sub;
      return session;
    },
  },
};
