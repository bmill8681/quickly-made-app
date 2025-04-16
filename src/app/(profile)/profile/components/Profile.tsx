import { TUserProfile } from "@/app/types"
import { Avatar, Box, Card, Typography, Breadcrumbs, Link, Divider } from "@mui/material"

export default function Profile({ profile }: { profile: TUserProfile }) {
	return (
		<Box sx={{ display: 'flex', flexDirection: "column", gap: '2rem' }}>
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/">
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