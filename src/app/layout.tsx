import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shyammangaramfoundation.org"),
  title: "Shyam Mangaram Foundation | सेवा ही हमारा धर्म है",
  description:
    "Shyam Mangaram Foundation — Dedicated to Sunday Langad in Chembur, Mumbai served free of cost to the needy, sacred Pavitra Gaushala Seva, the divine Hanuman Mandir, and sacred sanctuaries in Goa and Mumbai.",
  keywords: [
    "Shyam Mangaram Foundation",
    "Sunday Langad Chembur",
    "Free Food Needy Mumbai",
    "Gaushala Seva",
    "Gau Mata Seva",
    "Hanuman Mandir",
    "Chembur Mandir Mumbai",
    "Goa Mandir",
    "Anna Daan Seva",
    "Trust Donation",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Shyam Mangaram Foundation | सेवा ही हमारा धर्म है",
    description:
      "Sunday Langad in Chembur served free of cost to the needy, daily Pavitra Gaushala Seva, the divine Hanuman Mandir, and holy sanctuaries in Goa and Mumbai.",
    type: "website",
    locale: "en_IN",
    images: ["/logo-original.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Lato:wght@300;400;700&family=Noto+Serif+Devanagari:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#18120E" />
      </head>
      <body
        className="min-h-screen bg-[#18120E] text-[#FCF8F2] antialiased selection:bg-amber-400 selection:text-[#18120E] overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
