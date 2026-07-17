import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { FormatTabProvider } from "@/context/FormatTabContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KING KOHLI: The Journey | Fan Tribute",
  description:
    "An unofficial fan tribute celebrating Virat Kohli's legendary cricket career — from childhood in Delhi to becoming one of the greatest batsmen in the world. 85 international centuries, 54 ODI centuries, and counting.",
  keywords: [
    "Virat Kohli",
    "King Kohli",
    "cricket",
    "India cricket",
    "fan tribute",
    "RCB",
    "IPL",
  ],
  openGraph: {
    title: "KING KOHLI: The Journey",
    description:
      "An unofficial fan tribute celebrating Virat Kohli's legendary cricket career.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable}`}
    >
      <body className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] antialiased">
        <FormatTabProvider>{children}</FormatTabProvider>
      </body>
    </html>
  );
}
