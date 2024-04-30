import { Navbar } from '@/modules/navegacion/Navbar';
import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Open_Sans({ subsets: ["latin"] });


/*Documentacion para implementar PWA: https://medium.com/readytowork-org/implementing-pwa-in-the-next-13-application-3e46f6b3f6d8 
                                      https://developer.chrome.com/docs/extensions/reference/manifest?hl=es-419#minimal-manifest
                                      
   Generador de manifest: https://www.simicart.com/manifest-generator.html/                                   
*/

export const metadata: Metadata = {
  title: "Portal SO",
  description: "Portal de Sales Operations",
  generator: "Next.js",

  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  //themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Sales Operations" },
    {
      name: "Sales Operations",
      url: "https://so.tigo.com.hn",
    },
  ],
  //viewport:
  //  "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/> 
        {children}
      </body>
    </html>
  );
}
