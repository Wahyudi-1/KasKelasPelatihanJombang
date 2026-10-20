// Nama kunci untuk menyimpan data di localStorage browser
const STORAGE_KEY = "KASKELAS_DATA_V1";

/**
 * Mengambil data dari localStorage
 * @returns {Array} Array berisi daftar transaksi, atau array kosong jika belum ada
 */
function loadData() {
  const dataString = localStorage.getItem(STORAGE_KEY);
  if (dataString) {
    return JSON.parse(dataString);
  }
  return [];
}

/**
 * Menyimpan data ke localStorage
 * @param {Array} data - Array daftar transaksi yang akan disimpan
 */
function saveData(data) {
  const dataString = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, dataString);
}
