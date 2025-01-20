// components
import { PrivateRouteComponent } from "@/components/Auth/PrivateRouterComponent";
import { ClientComponent } from "@/components/ClientComponent";
import ProfileMenu from "@/components/ProfileMenu";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: RootLayoutProps) {
  return (
    <ClientComponent>
      <PrivateRouteComponent>
        <div className="container h-[640px] mb-10 flex gap-5 lg:gap-5 mt-14 xl:mt-[-8px]">
          <ProfileMenu />
          <div className="flex-1 w-full flex flex-col">{children}</div>
        </div>
      </PrivateRouteComponent>
    </ClientComponent>
  );
}
