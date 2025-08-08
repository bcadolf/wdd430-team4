import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt"





export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session, token }: { session: Session; token: JWT}) {
            if (session.user) {
                (session.user as { id?: string}).id = token.id as string;
            }
            return session;
        },
        async jwt(params: any) {
            const { token, user} = params;
            if (user) {
                token.id = user.id
            }
            return token;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};