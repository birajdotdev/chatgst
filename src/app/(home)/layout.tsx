import HomeLayout from "@/modules/home/layouts/home-layout";

export default function Layout(props: LayoutProps<"/">) {
  return <HomeLayout>{props.children}</HomeLayout>;
}
