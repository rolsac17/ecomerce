import React, { FC } from 'react';
import Head from 'next/head';
interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

const AuhtLayout: FC<Props> = ({
  children,
  pageDescription,
  title,
  imageFullUrl,
}) => {
  return (
    <div className="AuthLayout">
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header className="h-20 w-full flex items-center">
        <img
          className="mx-auto h-12 w-auto"
          src="https://i.postimg.cc/Cx2wTrNb/TCWexa.png"
          alt="Logo Weexa"
        />
      </header>
      <main className="h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default AuhtLayout;
