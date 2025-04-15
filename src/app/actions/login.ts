"use server"

export async function login({ email, password }: { email: string; password: string }) {
	try {
		const resp = await fetch(`${process.env.BASE_URL}/auth/login`, {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
			},
		})
		return resp.json();
	} catch (err) {
		console.error(err)
		return Promise.reject("Invalid login credentials, please try again.")
	}
}
