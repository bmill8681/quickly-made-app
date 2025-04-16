import NextLink from 'next/link';

import { Box, Breadcrumbs, Card, Divider, Link, Skeleton, Typography } from "@mui/material";


export default function LoadingPage() {
	return (
		<Box sx={{ display: 'flex', flexDirection: "column", gap: '2rem' }}>
			<Breadcrumbs aria-label="breadcrumb">
				<NextLink href="/" passHref >
					<Link underline="hover" color="inherit" >
						Home
					</Link>
				</NextLink>
				<Typography sx={{ color: 'text.primary' }}>Profile</Typography>
			</Breadcrumbs>
			<Card sx={{ maxWidth: 600, padding: "1rem" }}>
				<Box sx={{ display: "flex", gap: '2rem', alignItems: 'center' }}>
					<Skeleton variant="circular" width={60} height={60} />
					<Box>
						<Skeleton variant="rounded" width={300} height={30} />
						<Skeleton variant="rounded" width={300} height={30} />
					</Box>
				</Box>
				<Divider sx={{ marginY: "1.5rem" }} />
				<Typography color="secondary" fontWeight='bold'>
					Company Expected Activity
				</Typography>
				<Typography>
					(Need to verify what this is.)
				</Typography>
			</Card>
		</Box>
	)
}