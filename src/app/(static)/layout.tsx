import { Footer } from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function GeneralTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
