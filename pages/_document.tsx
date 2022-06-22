import { Html, Head, Main, NextScript } from 'next/document';

const Portfolio = () => {
  return (
    <Html lang='ja' className='font-gothic'>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Portfolio;
