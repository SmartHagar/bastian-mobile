/** @format */

// terima params untuk membuat prefix baru
// terima params cek prefix
// potong karakter dengan simbol - untuk cek prefix lama
// jika prefix lama === prefix baru maka ditambahkan jika beda maka buat no utut 1

const kodefikasi = ({ old_prefix, new_prefix }) => {
  old_prefix.sort(({ id: a }, { id: b }) => b - a);
  const filterKode = old_prefix.filter((item) => item.kode === new_prefix);
  let no_urut = 0;
  if (filterKode.length > 0) {
    no_urut = filterKode.map((row) => row.no_urut);
  }
  return parseInt(no_urut) + 1;
};

export default kodefikasi;
