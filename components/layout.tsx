import Header from './header';
import Footer from './footer';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="w-11/12 md:w-7/12 mx-auto flex min-h-screen flex-col items-center text-gray-600 body-font">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
