import React, { ReactNode } from "react";

import { Box } from '@mui/material'
import LogoutButton from "./components/LogoutButton";

export default function PageLayout({ children }: { children?: ReactNode }) {
	return (
		<Box sx={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
			{children}
			<Box>
				<LogoutButton />
			</Box>
		</Box>
	)
}