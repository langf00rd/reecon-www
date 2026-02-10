import Providers from "@/components/providers";
import { APP_NAME } from "@/lib/content";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: APP_NAME,
};

// const sans = Inter({
//   variable: "--font-sans",
//   subsets: ["latin"],
// });

// const sansAlt = Geist({
//   variable: "--font-sans-alt",
//   subsets: ["latin"],
// });

// const mono = Geist_Mono({
//   variable: "--font-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
        // className={`antialiased ${mono.variable} ${sansAlt.variable} ${sans.variable}`}
      >
        <Providers>
          <Toaster position="bottom-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
