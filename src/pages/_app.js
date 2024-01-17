import 'bootstrap/dist/css/bootstrap.css';
import "@/styles/globals.css";
import { Roboto } from "next/font/google";
import { UserProvider } from '@/UserContext';

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

<UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    </>
  );
}