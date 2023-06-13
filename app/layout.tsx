import "./globals.css";
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
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </body>
    </html>
  );
}
