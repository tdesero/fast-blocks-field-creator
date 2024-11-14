import React from 'react';
import {
  classic,
  image,
  typography,
  check,
  atSymbol,
  file,
  link,
  postDate,
  formatListBullets,
  settings,
  page,
  queryPaginationNumbers,
  title,
  postList,
} from "@wordpress/icons";

const toggleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="feather feather-toggle-right"
  >
    <rect width={22} height={14} x={1} y={5} rx={7} ry={7} />
    <circle cx={16} cy={12} r={3} fill="currentColor" />
  </svg>
);

export const iconMap = {
  text: typography,
  classicEditor: classic,
  richText: classic,
  image: image,
  checkbox: check,
  toggle: toggleIcon,
  email: atSymbol,
  file: file,
  url: link,
  date: postDate,
  repeater: postList,
  select: formatListBullets,
  range: settings,
  postTypeEntry: page,
  number: queryPaginationNumbers,
  textarea: title,
};
