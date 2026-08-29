export const shortAddress = (address: string) => {
  if (address) {
    if (address.length > 6) {
      return `${address.substr(0, 6)}...${address.substr(address.length - 4, 4)}`;
    }
    return address;
  }

  return '';
};
