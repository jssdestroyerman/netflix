import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={inter.className}>
            <RecoilRoot>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </RecoilRoot>
        </div>
    );
}
