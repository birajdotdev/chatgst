import { Navbar } from "@/modules/home/components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
    </main>
  );
}
