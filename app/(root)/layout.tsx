import HolyLoader from "holy-loader";
import Providers from "./providers";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";

export default function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <HolyLoader color="#868686" />
      <SiteHeader />
      {children}
      <Footer />
    </Providers>
  );
}
