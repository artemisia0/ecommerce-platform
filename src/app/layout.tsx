import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from '@/components/Provider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainDrawer from '@/components/MainDrawer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eCommerce Platform",
  description: "Website built by artemisia0. This is just an example eCommerce Platform that I can build on my own.",
};

const bodyStyle = {
	backgroundImage: "url('/bg.jpg')",
	backgroundRepeat: "repeat",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
			<Provider>
				<body className={inter.className} style={bodyStyle}>
					<MainDrawer></MainDrawer>
					<Header></Header>
					{ children }
					<Footer></Footer>
				</body>
			</Provider>
    </html>
  );
}

