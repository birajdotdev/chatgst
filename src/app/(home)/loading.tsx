import { Spinner } from "@/components/ui/spinner";

export default function loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Spinner className="size-12 text-primary" />
    </main>
  );
}
