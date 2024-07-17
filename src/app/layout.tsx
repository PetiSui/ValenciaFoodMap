import type { Metadata } from "next";

import Navbar from "./components/Navbar";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Footer from "./components/Footer";

// Prevent fontawesome from dynamically adding its css since we are going to include it manually
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Valencia Food Map",
  description: "Encuentra los mejores sitios para comer en Valencia",
  keywords: ["Valencia", "food", "eat in valencia", "comer en Valencia"],
  openGraph: {
    images: 'https://valencia-food-map.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.5f05c792.jpeg&w=1080&q=75'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body suppressHydrationWarning={true} className="flex flex-col relative">
        <Navbar></Navbar>
        <main className="w-full h-full grow bg-texture !bg-blend-difference py-4">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
