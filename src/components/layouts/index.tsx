import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Service worker registration
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker Registered:", registration);
      })
      .catch((error) => {
        console.error("Service Worker Registration Failed:", error);
      });
  }

  return (
    <main className="dark flex min-h-screen flex-col bg-background text-foreground">
      <header className="">
        <Navbar />
      </header>
      <section className="flex justify-center">{children}</section>
    </main>
  );
};

export default Layout;
