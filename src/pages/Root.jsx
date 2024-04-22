import { Outlet } from "react-router-dom";
import ProjectSideBar from "../components/ProjectSideBar";

function RootLayout() {
  return (
    <div className="flex flex-row">
      <ProjectSideBar className="w-1/3" />
      <main className="w-[100%]">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
