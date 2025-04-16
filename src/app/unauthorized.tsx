import LogoutButton from "./(profile)/profile/components/LogoutButton";

export default function UnauthorizedPage() {

	return (
		<main>
			<h1>401 - Unauthorized</h1>
			<p>Please log in to access this page.</p>
			<LogoutButton>Go Login</LogoutButton>
		</main>
	)
}