/* @flow */

const hasProtocol = (domain: ?string): boolean => {
  if (!domain) return false;
  return domain.indexOf('http') === 0;
};

export const getLinkPrefix = (path: string): string => {
  const protocol = process.env.DOMAIN ? 'https://' : 'http://';
  const domain = process.env.DOMAIN || 'localhost:5000';
  return hasProtocol(process.env.DOMAIN)
    ? `${domain}${path}`
    : `${protocol}${domain}${path}`;
};

// 例如 https://bot-apt.yoctol.com/public/bnext-fc/webviews/companies
const getProjectWebviewLink = (project: string) => (
  path: string
): string => `${getLinkPrefix('')}/public/${project}/webviews/${path}`;

export default getProjectWebviewLink;
