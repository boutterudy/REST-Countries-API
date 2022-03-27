import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin=""
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap"
                        rel="stylesheet"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                      (function() {
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
                      })();
                    `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
