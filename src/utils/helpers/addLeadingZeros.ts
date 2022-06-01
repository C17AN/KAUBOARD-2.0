const addLeadingZeros = (value: any) => {
  value = String(value);
  while (value.length < 2) {
    value = "0" + value;
  }
  return value;
};

export default addLeadingZeros;
