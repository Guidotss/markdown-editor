import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import { Providers } from "@/providers";
import "./globals.css";

const roboto = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Markdown editor",
  description: "Markdown editor in web",
  authors: [
    {
      name: "Guido Olguin",
      url: "https://portfolio-guidoolguin.vercel.app/",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-black w-full overflow-hidden`}>
        <Toaster
          reverseOrder={false}
          position="top-center"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
