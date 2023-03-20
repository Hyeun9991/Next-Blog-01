import Header from './header';
import Footer from './footer';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
