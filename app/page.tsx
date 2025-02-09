import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import { App } from "@/app/App.tsx";
import "@/app/globals.css";

const metadata: Metadata = { title: "Invoicie" },
  viewport: Viewport = { width: "device-width", initialScale: 1 };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default () => (
  <html lang="en">
    <body className={`${geistSans.variable} antialiased md:overflow-hidden`}>
      <div className="min-h-screen overflow-y-auto h-full flex items-center md:flex-row flex-col-reverse">
        <App />
      </div>
    </body>
  </html>
);

export { metadata, viewport };
