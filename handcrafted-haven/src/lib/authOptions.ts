import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt"
import type { AdapterUser } from "next-auth/adapters";
import type { User, Account, Profile } from "next-auth";


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
        async jwt({
            token, user,
        }: {
            token: JWT;
            user?: AdapterUser | User;
            account?: Account | null;
            profile?: Profile;
            isNewUser?: boolean;
            trigger?: "signIn" | "signUp" | "update";
            session?: unknown;
        }){ if (user) {
                token.id = user.id
            }
            return token;}
    }
}
