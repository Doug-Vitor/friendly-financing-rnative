export const keepNumbers = (value?: unknown) => +(value || 0).toString().replace(/[^0-9]/g, '');

export const formatPrice = (priceInCents: number) =>
  new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(priceInCents / 100);
