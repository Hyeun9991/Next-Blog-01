import Header from './header';
import Footer from './footer';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 w-11/12 md:w-10/12 mx-auto pt-24 flex flex-col min-h-screen text-gray-600 body-font dark:bg-zinc-900">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
