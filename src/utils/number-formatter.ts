export default function numberFormatter(value: string, decimalPlaces = true) {
  const values = value.split('.');
  values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (values.length === 1 && decimalPlaces === true) {
    return values[0].concat('.00');
  }
  if (values.length === 2 && values[1].length === 1 && decimalPlaces === true) {
    return values.join('.').concat('0');
  }
  return values.join('.');
}
