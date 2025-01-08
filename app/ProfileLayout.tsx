// components
import { PrivateRouteComponent } from "@/components/Auth/PrivateRouterComponent";
import { ClientComponent } from "@/components/ClientComponent";
import ProfileMenu from "@/components/ProfileMenu";
import { SubscribeBannerFooter } from "@/components/SubscribeBannerFooter";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: RootLayoutProps) {
  return (
    <ClientComponent>
      <PrivateRouteComponent>
        <div className="container custom-height-mq:min-h-[95vh] pb-10 flex flex-1 gap-5 lg:gap-[75px] lg:mt-12 md:pt-9">
          <ProfileMenu />
          <div className="flex-1 w-full flex flex-col">{children}</div>
        </div>
        <SubscribeBannerFooter />
      </PrivateRouteComponent>
    </ClientComponent>
  );
}
