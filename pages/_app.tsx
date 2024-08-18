"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "@/store";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { User } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.ElementType;
  pageProps: { session: SessionProvider["session"]; [key: string]: any };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useSupabaseClient();
  const { setSupabaseUrl } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: user } = await supabase.auth.user();
        if (user) {
          setSupabaseUrl(supabase.supabaseUrl);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [supabase]);

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Header />
            <main className="container mx-auto mt-10">
              <Component {...pageProps} />
            </main>
            <Footer />
          </>
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}