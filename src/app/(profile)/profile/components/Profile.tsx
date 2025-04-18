import { TUserProfile } from "@/app/types"
import NextLink from 'next/link'
import { Avatar, Box, Card, Typography, Breadcrumbs, Link, Divider } from "@mui/material"

export default function Profile({ profile }: { profile: TUserProfile }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: "column", gap: '2rem' }}>
			{/*
			*	Note: Breadcrumbs here don't make much sense because the home page
			*	redirects to the profile page. I've included them as a good practice to
			*	have for page navigation. These may be included or excluded based on UX.
			*/}
			<Breadcrumbs aria-label="breadcrumb">
				<Link component={NextLink} underline="hover" color="inherit" href="/">
					Home
				</Link>
				<Typography sx={{ color: 'text.primary' }}>Profile</Typography>
			</Breadcrumbs>
			<Card sx={{ maxWidth: 600, padding: "1rem" }}>
				<Box sx={{ display: "flex", gap: '2rem', alignItems: 'center' }}>
					<Avatar alt={profile.full_name} src={profile.avatar_url} sx={{ width: 60, height: 60 }}>
						{profile.first_name.toUpperCase().slice(0, 1)}
					</Avatar>
					<Box>
						<Typography fontWeight='bold'>{profile.full_name}</Typography>
						<Typography color="info">{profile.email}</Typography>
					</Box>
				</Box>
				<Divider sx={{ marginY: "1.5rem" }} />
				<Typography fontWeight='bold'>
					{profile.business_name}
				</Typography>
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