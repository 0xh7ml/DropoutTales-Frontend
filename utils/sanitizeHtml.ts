import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (dirty: string): string => {
  return DOMPurify.sanitize(dirty);
};