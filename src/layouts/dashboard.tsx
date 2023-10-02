import { MainNav } from "@/components/views/main-nav";
import { UserNav } from "@/components/views/user-nav";
import { withAuthenticationRequired } from "@auth0/auth0-react";

function DashboardLayoutView(props: React.PropsWithChildren) {
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* <TeamSwitcher /> */}
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <UserNav />
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

const DashboardLayout = withAuthenticationRequired(DashboardLayoutView);
// const DashboardLayout = DashboardLayoutView;
export default DashboardLayout;
