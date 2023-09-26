import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

//<>
//{/* sidebar */}
//{sidebar !== false && <Sidebar listItems={sidebarContent} />}
//{/* navbar */}
//{(navbar !== false) && <Navbar />}
//{/* Page content */}
//<main>{children}</main>
//</>
