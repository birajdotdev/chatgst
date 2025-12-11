import { redirect } from "next/navigation";

import { getUserProfile } from "@/lib/auth";
import { ProfileView } from "@/modules/profile/views/profile-view";

export default async function ProfilePage() {
  const user = await getUserProfile();

  if (!user) {
    redirect("/login");
  }

  // Cast user to match schema types if necessary, or pass as is if compatible
  return <ProfileView user={user as unknown as any} />;
}
