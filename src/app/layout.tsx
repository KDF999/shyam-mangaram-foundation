import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shyammangaramfoundation.org"),
  title: "Shyam Mangaram Foundation | सेवा ही हमारा धर्म है",
  description:
    "Shyam Mangaram Foundation — Feeding thousands of devotees every Sunday through Langad in Chembur, Mumbai, and dedicated to daily Pashu-Pakshi (Animal) Seva. Home to sacred temples in Goa and the rare Black Hanuman Ji in Sindhudurg.",
  keywords: [
    "Shyam Mangaram Foundation",
    "Sunday Langad Chembur",
    "Chembur Mandir Mumbai",
    "Black Hanuman Ji Sindhudurg",
    "Goa Temple",
    "Animal Seva Mumbai",
    "Street dog feeding Mumbai",
    "Gau Seva",
    "Anna Daan Donation",
    "Hanuman Mandir Seva",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Shyam Mangaram Foundation | सेवा ही हमारा धर्म है",
    description:
      "Feeding thousands every Sunday in Chembur and daily feeding & caring for street dogs, cows, and birds as manifestations of God. Donate to support sacred Seva.",
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Noto+Serif+Devanagari:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-[#19130F] text-[#FCF8F2] antialiased selection:bg-amber-400 selection:text-[#19130F]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
