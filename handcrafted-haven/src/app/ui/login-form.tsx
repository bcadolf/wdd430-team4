import { useSearchParams } from "next/navigation"
import { useActionState } from "react";



export default function LoginForm () {
    const searchParams = useSearchParams();
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );


    return (
        <form action={formAction}>
            <h1>Please Login to continue.</h1>

            <label htmlFor="email">
                Email
            </label>
            <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
            />
            <label htmlFor="password">
                Password
            </label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={8}
            />
            <button type="submit" disabled={isPending}>
                Login
            </button>
        
        </form>
    )
};