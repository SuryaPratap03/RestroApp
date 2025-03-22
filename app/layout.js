import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./_components/Footer";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Restro App - Order Your Favorite Meals",
  description: "Discover and order delicious meals from the best restaurants near you. Enjoy fast delivery and seamless online payments.",
  keywords: "food delivery, restaurant ordering, online food, meal delivery, Restro App",
  author: "Restro App Team",
  openGraph: {
    title: "Restro App - Your Favorite Meals Delivered",
    description: "Enjoy a variety of meals from top restaurants with fast delivery.",
    url: "https://restro-app-ic9q.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkZOIVSe9nrgzU0pjJn1pfro9Esus1q4unw&s",
        width: 1200,
        height: 630,
        alt: "Restro App Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://restro-app-ic9q.vercel.app/",
    title: "Restro App - Your Favorite Meals Delivered",
    description: "Discover and order delicious meals from the best restaurants near you.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkZOIVSe9nrgzU0pjJn1pfro9Esus1q4unw&s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>  
          <Toaster
            toastOptions={{
              style: {
                fontSize: "18px",
                padding: "20px",
                minWidth: "400px",
                minHeight: "100px",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              },
              success: {
                icon: (
                  <span
                    style={{
                      fontSize: "32px",
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    ✔️
                  </span>
                ),
              }
            }}
            position="top-right"
            reverseOrder={true}
          />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
