import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Tulsi Ayurveda",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
