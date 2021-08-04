import React from 'react';
declare const Categories: ['basic', 'extension', 'ecology'];
export interface ProductItem {
  title: string;
  icon?: React.ReactNode;
  slogan?: string;
  description: string;
  category: typeof Categories[number];
  links?: Array<{
    icon?: React.ReactNode;
    title: React.ReactNode;
    url?: string;
    openExternal?: boolean;
  }>;
}
export declare type ValuesOf<T extends any[]> = T[number];
export declare const getProducts: ({
  t,
  language,
  isChinaMirrorHost,
}: {
  t: (key: string) => string;
  language: string;
  rootDomain?: string | undefined;
  isChinaMirrorHost?: boolean | undefined;
}) => ProductItem[];
export {};
