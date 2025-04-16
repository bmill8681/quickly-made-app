"use client"
import { useState, ReactNode } from "react"
import { useRouter } from "next/navigation"

import Button from "@mui/material/Button"
import { Typography } from "@mui/material"

const BUTTON_STATE = {
	IDLE: "IDLE",
	LOADING: "LOADING",
	ERROR: "ERROR"
}

export default function LogoutButton({ children }: { children?: ReactNode }) {
	const [buttonState, setButtonState] = useState(BUTTON_STATE.IDLE)
	/* TODO: Look into refactoring this into a server action. */
	const router = useRouter()
	const handleLogout = () => {
		setButtonState(BUTTON_STATE.LOADING)
		fetch("/api/auth/logout")
			.then(() => {
				router.replace("/")
			})
			.catch((err) => {
				console.error(err?.message || "Unable to log out, please try again")
				setButtonState(BUTTON_STATE.ERROR)
			})
	}
	return (
		<>
			<Button
				variant="contained"
				color="secondary"
				onClick={handleLogout}
				loading={buttonState === BUTTON_STATE.LOADING}
			>
				{children || "Logout"}
			</Button>
			{buttonState === BUTTON_STATE.ERROR && <Typography marginTop={'1rem'} fontSize={'0.75rem'} color='red'>Please try again</Typography>}
		</>
	)
}
