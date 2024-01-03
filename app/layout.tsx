// Import necessary modules and components
import Head from "next/head";
import "./globals.css";
import "animate.css";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prepify",
  description:
    "Healthy recipes, that updates every week! Perfect for meal prep and Notion integration for the shopping list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <html lang="en" data-theme="customTheme">
        <body className={inter.className + " flex flex-col min-h-screen"}>
          <Provider>
            <Nav />
            <div className="flex-grow">{children}</div>
            <Footer />
          </Provider>
        </body>
      </html>
    </>
  );
}
