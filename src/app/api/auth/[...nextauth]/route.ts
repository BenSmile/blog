import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

let users: TUser[] = [];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = users.filter((u: TUser) => {
        u.email === session.user?.email
      })
      if (session.user && sessionUser.length > 1) {
        session.user.email = sessionUser[0].email;
      }
      return session;
    },
    async signIn({ profile }: { profile?: any }) {
      try {

        const userExists = users.filter((u: TUser) => {
          u.email === profile?.email
        })
        if (userExists.length == 0 && profile) {

          const user: TUser = {
            id: users.length + 1,
            name: profile.name,
            email: profile.email,
            phone: '',
            website: '',
            company: null,
            image: profile.picture
          }
          users.push(user)
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
