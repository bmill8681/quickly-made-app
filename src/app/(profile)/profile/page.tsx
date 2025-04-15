'use client'
import { NextPage } from "next"
import { useRouter } from "next/navigation"

import Box from "@mui/material/Box"
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography"

const ProfilePage: NextPage = () => {
	/* #region TEMPORARY */
	const router = useRouter();
	const handleLogout = () => {
		fetch('/api/auth/logout')
			.then(() => { router.replace('/') })
			.catch(err => { console.log(err?.message || "something went wrong") })
	}
	/* #endregion TEMPORARY */
	return (
		<Box>
			<Typography> Profile Page </Typography>

			<Button onClick={handleLogout}>Logout</Button>

		</Box>
	)
}

export default ProfilePage
