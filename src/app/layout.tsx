import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import Script from "next/script";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://arthhwise.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google News Reader Revenue Manager */}
        <Script
          async
          src="https://news.google.com/swg/js/v1/swg-basic.js"
          strategy="beforeInteractive"
        />
        <Script
          id="google-swg-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
                basicSubscriptions.init({
                  type: "NewsArticle",
                  isPartOfType: ["Product"],
                  isPartOfProductId: "CAow65_GDA:openaccess",
                  clientOptions: { theme: "light", lang: "en" },
                });
              });
            `,
          }}
        />
      </head>
      <body className={`${dmsans.className}`}>
        <AuthProvider>
          <AuthDialogProvider>
            <SessionProviderComp>
              <ThemeProvider
                attribute="class"
                enableSystem={false}
                defaultTheme="light"
              >
                <Toaster position="top-center" reverseOrder={false} />
                <Header />
                {children}
                <Footer />
                <ScrollToTop />
              </ThemeProvider>
            </SessionProviderComp>
          </AuthDialogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
