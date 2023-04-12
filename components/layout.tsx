import Header from './header';
import Footer from './footer';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 w-12/12 lg:w-10/12 mx-auto pt-16  min-h-screen text-gray-600 body-font dark:bg-zinc-900">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
