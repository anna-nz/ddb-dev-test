import '../styles/app.scss'
import type { AppProps } from 'next/app'
import { NotificationProvider } from "../context/NotificationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}
