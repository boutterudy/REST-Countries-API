import '../styles/globals.scss';
import 'remixicon/fonts/remixicon.css';
import Script from 'next/script';
import { Nunito_Sans } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import { FiltersProvider } from '../context/FiltersContext';
import Header from '../components/Header';
import Head from 'next/head';

const nunitoSans = Nunito_Sans({ subsets: ['latin'] });

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <Head>
      <link rel="preconnect" href="https://restcountries.com" />
      <link rel="preconnect" href="https://upload.wikimedia.org" />
      <link rel="preconnect" href="https://flagcdn.com" />
    </Head>
    <body className={nunitoSans.className}>
    <ThemeProvider>
      <FiltersProvider>
        <Header />
        {children}
      </FiltersProvider>
    </ThemeProvider>
    </body>
    <Script
      id="theme"
      dangerouslySetInnerHTML={{
        __html: `(function() {
                        var storageKey = 'dark';
                        var classNameDark = 'theme--dark';
                        var classNameLight = 'theme--default';
                        var d = document.querySelector('html');
                        d.classList.add('theme');
                        function setClassOnDocumentBody(dark) {
                          d.classList.add(dark ? classNameDark : classNameLight);
                          d.classList.remove(dark ? classNameLight : classNameDark);
                        }
                        var localStorageTheme = null;
                        try {
                          localStorageTheme = localStorage.getItem(storageKey);
                        } catch (err) {}
                        var localStorageExists = localStorageTheme !== null;
                        if (localStorageExists) {
                          localStorageTheme = JSON.parse(localStorageTheme);
                        }
                        if (localStorageExists) {
                          setClassOnDocumentBody(localStorageTheme);
                        } else {
                          var isDarkMode = d.classList.contains(classNameDark);
                          localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
                        }
                        d.classList.add('preload');
                      })();`,
      }}
    />
    </html>
  );
}
