import type { Metadata } from "next";
import "./globals.css";
import Header from "./header";

export const metadata: Metadata = {
  title: "Hypermode Commerce",
  description: "An e-commerce app built with Hypermode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-6xl mx-auto bg-stone-900 text-white my-8 space-y-8">
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
