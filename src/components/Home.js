import MainLayout from "./MainLayout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Home({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <MainLayout>{children}</MainLayout>
    </>
  );
}

export default Home;
