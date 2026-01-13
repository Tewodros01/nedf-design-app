import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { SocialNetworks } from "./footer.types";
import LayoutSpacing from "./LayoutSpacing";

const socialsData: SocialNetworks[] = [
  {
    id: 1,
    icon: <FaTwitter />,
    url: "https://twitter.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 4,
    icon: <FaGithub />,
    url: "https://github.com/",
  },
];

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="pt-8 md:pt-[50px]  px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            {/* Newsletter Section */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-1 text-black">
                Subscribe For The Latest
              </h3>
              <h3 className="text-lg font-semibold mb-8 text-black">
                Releases.
              </h3>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Enter your email</p>
                <input
                  type="email"
                  placeholder="example@domain.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-600 bg-transparent text-sm placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-start mb-8">
                <input type="checkbox" id="privacy" className="mt-1 mr-3" />
                <label
                  htmlFor="privacy"
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  I have Read And Agree To The Regarding Privacy Policy
                </label>
              </div>

              <div className="inline-block">
                <Image
                  priority
                  src="/images/chapa.png"
                  width={80}
                  height={32}
                  alt="Chapa"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Menu Section */}
            <div>
              <h3 className="text-lg font-semibold mb-8 text-black">Menu</h3>
              <div className="space-y-5">
                <Link
                  href="/wallet"
                  className="block text-sm text-gray-600 hover:text-black uppercase"
                >
                  WALLET
                </Link>
                <Link
                  href="/workbook"
                  className="block text-sm text-gray-600 hover:text-black uppercase"
                >
                  WORKBOOK
                </Link>
                <Link
                  href="/belts"
                  className="block text-sm text-gray-600 hover:text-black uppercase"
                >
                  BELTS
                </Link>
                <Link
                  href="/bracelets"
                  className="block text-sm text-gray-600 hover:text-black uppercase"
                >
                  BRACELETS
                </Link>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-lg font-semibold mb-8 text-black">Address</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <HiLocationMarker className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Addis Ababa, Nifas Silk Lafto Woreda Haya
                    <br />
                    Hulet, Bldg 5th Floor
                  </p>
                </div>
                <div className="flex items-center">
                  <HiMail className="w-5 h-5 text-gray-500 mr-3" />
                  <a
                    href="mailto:nedf@nedfmanagement.com"
                    className="text-sm text-gray-600"
                  >
                    nedf@nedfmanagement.com
                  </a>
                </div>
                <div className="flex items-center">
                  <HiPhone className="w-5 h-5 text-gray-500 mr-3" />
                  <span className="text-sm text-gray-600">
                    +251911234567 / +251911234567
                  </span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center mb-8">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-black hover:text-white transition-all mr-3 w-7 h-7 rounded-full border border-black/20 flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>

              <div className="text-right">
                <Link
                  href="#top"
                  className="inline-block px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600 hover:text-black hover:border-gray-600 bg-transparent transition-colors"
                >
                  Back To Top
                </Link>
              </div>
            </div>
          </div>

          <hr className="h-[1px] border-t-black/10 mb-6 mt-16" />
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
            <p className="text-sm text-black/60 mb-4 sm:mb-0">
              2025 NEDF Design. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-black"
            >
              Privacy and policy
            </Link>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
