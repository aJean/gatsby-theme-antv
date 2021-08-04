import React from 'react';
declare type Props = {
  message: React.ReactNode;
  localStorageId: string;
  bannerId: string;
  style?: React.CSSProperties;
};
/**
 * @description 通用公告组件，根据 bannerId 来更新 lcoalStorage
 */
declare const Announcement: React.FC<Props>;
export default Announcement;
