import { NextPage } from "next"
import { fetchProfile } from "@/app/actions/fetchProfile"
import { TUserProfile } from '@/app/types'
import Profile from "./components/Profile"



const ProfilePage: NextPage = async () => {
	const profile: TUserProfile | null = await fetchProfile()

	if (!profile) throw new Error("Unable to fetch profile.")

	return (
		<>
			<Profile profile={profile} />
		</>
	)
}

export default ProfilePage
