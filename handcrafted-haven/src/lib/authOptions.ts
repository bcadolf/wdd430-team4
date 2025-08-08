import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt"
import type { AdapterUser } from "next-auth/adapters";
import type { User, Account, Profile } from "next-auth";
import bcrypt from "bcrypt";
import { getSellerByParam } from "./data";


export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "JohnDoe@example.com"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const seller = await getSellerByParam({ field: "store_email", value: credentials.email});
                if (!seller) return null;

                console.log(credentials.password)
                console.log(seller.password)

                const isValid = await bcrypt.compare(credentials.password, seller.password);
                if (!isValid) return null;


                return {
                    id: seller.id,
                    email: seller.store_email,
                    name: seller.owner_first + " " + seller.owner_last,
                }
            }

        })
    ],
    pages: {
        signIn: "/login"
    },
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};
