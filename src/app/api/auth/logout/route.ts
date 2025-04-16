import { cookies } from "next/headers"

export async function GET() {
	(await cookies()).delete("session")

	return Response.json({ message: "Successfully logged out." }, { status: 200 })
}
