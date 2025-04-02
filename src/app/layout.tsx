import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tu Empresa - Soluciones Digitales",
  description: "Creamos soluciones digitales innovadoras que impulsan el éxito de tu negocio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <div 
              className="min-h-screen bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `var(--theme-background-image)`,
                backgroundColor: `hsl(var(--background))`,
              }}
            >
              <div className="min-h-screen flex flex-col relative z-10">
                <Header />
                <main className="flex-1 flex flex-col min-h-0">
                  {children}
                </main>
                <Footer />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
