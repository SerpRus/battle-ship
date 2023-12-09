import { TGetCodeParam } from './types';

export const getCodeParam: TGetCodeParam = (location, navigate) => {
  const code = new URLSearchParams(location.search).get('code');
  if (!code) {
    return '';
  }
  const replacedParams = location.search
    .replace(/[?&]code=[^&]+/, '')
    .replace(/^&/, '?');
  navigate(location.pathname + replacedParams);
  return code;
};
