import Header from './header';
import Footer from './footer';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
