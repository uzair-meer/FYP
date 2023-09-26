import Layout from "../layout/Layout";

//TODO: set info of any user (user, company, driver, admin) in context -> here

export default function DashboardLayout({ children }) {
  // return <section className="bg-slate-400 mt-5">{children}</section>

  return <Layout>{children}</Layout>;
}
