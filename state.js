// Inisialisasi data dengan mengambil dari storage
let transactions = loadData();

/**
 * Mengambil seluruh data transaksi
 */
function getTransactions() {
  return transactions;
}

/**
 * Menambahkan transaksi baru ke dalam array dan menyimpannya
 */
function addTransaction(transaction) {
  transactions.push(transaction);
  saveData(transactions);
}

/**
 * Menghapus transaksi berdasarkan ID
 */
function deleteTransaction(id) {
  // Filter/saring data untuk membuang transaksi dengan ID yang dipilih
  transactions = transactions.filter(transaction => transaction.id !== id);
  saveData(transactions);
}

/**
 * Menghitung total pemasukan, pengeluaran, dan saldo akhir
 * @returns {Object} { income, expense, balance }
 */
function calculateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach(transaction => {
    if (transaction.type === "in") {
      income += transaction.amount;
    } else if (transaction.type === "out") {
      expense += transaction.amount;
    }
  });

  const balance = income - expense;

  return { income, expense, balance };
}
