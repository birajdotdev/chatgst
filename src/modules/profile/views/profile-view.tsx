import { UserProfile } from "@/lib/auth";

import { ProfileForm } from "../components/profile-form";
import { UpdateProfileSchema } from "../validations/profile-schema";

interface ProfileViewProps {
  user: UserProfile;
}

export function ProfileView({ user }: ProfileViewProps) {
  return (
    <div className="container max-w-5xl py-10">
      <ProfileForm
        initialData={user as unknown as Partial<UpdateProfileSchema>}
      />
    </div>
  );
}
