import "./globals.css";
import "animate.css";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auto food planer",
  description:
    "Healthy recipes, that updates every week! Perfect for meal prep and Notion integration for the shopping list",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="customTheme">
      <body className={inter.className + " flex flex-col min-h-screen"}>
        <Provider>
          <Nav />
          <div className="flex-grow">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
