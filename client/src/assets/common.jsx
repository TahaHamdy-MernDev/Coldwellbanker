import i18next from 'i18next';

export const formatNumber = (num) => {
  const locale = i18next.language.startsWith('ar') ? 'ar' : 'en';
  const formatter = new Intl.NumberFormat(locale, {
    style: 'decimal',
    useGrouping: true
  });
  return formatter.format(num);
};