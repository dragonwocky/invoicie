import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";

const metadata: Metadata = { title: "Invoicie" },
  viewport: Viewport = { width: "device-width", initialScale: 1 };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body className={`${geistSans.variable} antialiased md:overflow-hidden`}>
      <div className="min-h-screen h-full flex items-center md:flex-row flex-col-reverse">
        {children}
      </div>
    </body>
  </html>
);

export { metadata, viewport };
