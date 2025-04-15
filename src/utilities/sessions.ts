import { SignJWT, jwtVerify } from "jose"

type SessionData = {
	token: string
}

const key = new TextEncoder().encode(process.env.SIGNING_KEY)
const sessionExpiration = "10 sec from now"

export async function encryptSession(sessionData: SessionData) {
	return await new SignJWT(sessionData).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(sessionExpiration).sign(key)
}

export async function decryptSession(jwt: string) {
	const { payload } = await jwtVerify(jwt, key, {
		algorithms: ["HS256"],
	})
	return payload;
}
