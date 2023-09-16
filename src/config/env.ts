export default () => ({
  PORT: process.env.PORT || 8080,
  HOTEL_URL:
    process.env.HOTEL_URL ||
    'https://pratagy.letsbook.com.br/D/Reserva?checkin={CHECKIN_DATE}&checkout={CHECKOUT_DATE}&cidade=&hotel=12&adultos=2&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=9%2F1%2F2023&_ga=&_gl=&_gcl=',
});
