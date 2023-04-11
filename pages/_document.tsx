import Document, { Html, Head, Main, NextScript } from 'next/document';

/**
 * 서버에서만 랜더링되고, onClick같은 이벤트 핸들러는 작동하지 않음.
 * (css도 이 파일에서는 사용하지 않음)
 */

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-50 dark:bg-zinc-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
