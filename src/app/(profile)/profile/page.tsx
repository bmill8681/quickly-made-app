import { NextPage } from "next"
import { fetchProfile } from "@/app/actions/fetchProfile"
import { TUserProfile } from '@/app/types'
import Profile from "./components/Profile"
import PaymentDateChecker from "./components/PaymentDateChecker"



const ProfilePage: NextPage = async () => {
	const profile: TUserProfile | null = await fetchProfile()

	if (!profile) throw new Error("Unable to fetch profile.")

	return (
		<>
			<Profile profile={profile} />
			<PaymentDateChecker />
		</>
	)
}

export default ProfilePage
