import Document, { Head, Html, Main, NextScript } from "next/document";

class TheDocument extends Document {
  render() {
    // NOTE: the structure of this component is very important
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default TheDocument;
