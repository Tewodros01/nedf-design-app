import HolyLoader from "holy-loader";
import Providers from "./providers";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";

export default function RootGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <HolyLoader color="#868686" />
      <TopBanner />
      <TopNavbar />
      {children}
      <Footer />
    </Providers>
  );
}
