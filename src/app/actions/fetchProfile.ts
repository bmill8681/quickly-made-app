"use server"

import { unauthorized } from "next/navigation"
import { verifySession } from "@/utilities/sessions"
import _get from "lodash.get"

export async function fetchProfile() {
	const session = await verifySession()
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve("OK")
		}, 3000)
	})
	const resp = await fetch(`${process.env.BASE_URL}/auth/user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.token}`,
		},
	}).then((resp) => {
		if (resp.status === 401) {
			unauthorized()
		}
		return resp.json()
	})

	if (!resp.success) {
		return null
	}

	// Probably want to be careful about what we return to the frontend from the user object.
	// I don't know if any of the values are sensitive, so I'm going to just return what's needed
	// for now.

	// name, email, business name, Company Expected Activity
	const { user } = resp
	return {
		full_name: _get(user, "full_name", ""),
		first_name: _get(user, "first_name", ""),
		last_name: _get(user, "last_name", ""),
		email: _get(user, "email", ""),
		business_name: _get(user, "Company.name", ""),
		CompanyId: _get(user, "Company.id", ""),
		avatar_url: _get(user, "avatar_url", ""),
	}
}
