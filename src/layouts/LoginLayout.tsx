import Head from 'next/head';
import React, { FC } from 'react';

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const LoginLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen h-full flex snap-none">{children}</div>
    </>
  );
};
