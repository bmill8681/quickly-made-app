"use server"

import { LoginResponse } from "../types"

// TODO: If I had more time, refactor this to be more generic using a generic Request rather than login specific
// and use this for the profile fetch as well. That way we are better able to use type safety in the responses.

const fetchLogin = async <T>({ email, password }: { email: string; password: string }): Promise<T> => {
	const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: {
			"Content-Type": "application/json",
		},
	})
	return response.json()
}

export async function login({ email, password }: { email: string; password: string }) {
	try {
		const response = await fetchLogin<LoginResponse>({ email, password })

		if (!response.success) {
			return Promise.reject("Invalid login credentials, please try again.")
		}
		return response
	} catch (err) {
		console.error(err)
		return Promise.reject("Invalid login credentials, please try again.") // OWASP Standard - don't give different responses on invalid password vs. other errors
	}
}
