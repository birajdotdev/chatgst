import { AppealDraftView } from "@/modules/appeal-draft/views/appeal-draft-view";

export default function Page(props: PageProps<"/appeal-draft">) {
  return <AppealDraftView searchParams={props.searchParams} />;
}
