import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";
import { ProfileView } from "@/modules/profile/views/profile-view";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfileView user={user} />;
}
