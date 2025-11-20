import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";

export default async function Layout(props: LayoutProps<"/">) {
  const { isAuthenticated, user } = await auth();
  return (
    <main className="flex h-screen flex-col">
      <Navbar
        className="shrink-0 border-b bg-background"
        isAuthenticated={isAuthenticated}
        user={user}
      />
      <div className="flex flex-1 pt-16">{props.children}</div>
    </main>
  );
}
