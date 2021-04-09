import Document, { Html, Head, Main, NextScript } from 'next/document'

export default function Document(){
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"> </div>
        </body>
      </Html>
    )
}

functionDocument.getInitialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

export default MyDocument