import { Outlet } from "react-router-dom";

import MainLayout from "../../common/CustomerLayout";
import AccountSidebar from "./AccountSidebar";

const AccountLayout = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-5 py-32">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}

          <div className="lg:w-72 shrink-0">

            <AccountSidebar />

          </div>

          {/* Content */}

          <div className="flex-1">

            <Outlet />

          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default AccountLayout;