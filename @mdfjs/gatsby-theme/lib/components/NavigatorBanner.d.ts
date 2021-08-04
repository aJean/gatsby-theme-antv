import React from 'react';
export interface NavigatorBannerProps {
  post?: {
    slug?: string;
    title?: string;
  };
  type: 'prev' | 'next';
}
declare const NavigatorBanner: React.FC<NavigatorBannerProps>;
export default NavigatorBanner;
