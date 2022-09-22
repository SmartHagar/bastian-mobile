/** @format */

const showRupiah = (value) => {
  const angka = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp. ${angka}`;
};

export default showRupiah;
