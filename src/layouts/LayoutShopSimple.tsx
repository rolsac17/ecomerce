import { Header } from '@components/ecommerce';
import { Footer } from '@components/footer';
import Head from 'next/head';
import React, { FC } from 'react';

export interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const LayoutShopSimple: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <div className="LayoutShopBase">
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
