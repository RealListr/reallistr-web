// src/app/page.tsx
export { metadata } from './home-v2/page'; // optional: only if home-v2/page exports metadata
export { default } from './home-v2/page';
export { default, dynamic, revalidate } from './home-v2/page';
