import { redirect } from "next/navigation";

// Redirect /user/[id] to /profile/[id] for backwards compatibility
export default async function UserPageRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/profile/${id}`);
}
