export const formatBrazilianDate = (isoDate) => {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return 'Data indisponível';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const getDateRangeFromLastWeek = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 7);

  const format = (date) => date.toISOString().split('T')[0];

  return {
    from: format(from),
    to: format(to),
  };
};
