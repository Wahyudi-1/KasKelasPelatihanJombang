// === Menghubungkan elemen HTML ke dalam variabel JS ===
const form = document.getElementById("transactionForm");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const totalBalanceEl = document.getElementById("totalBalance");
const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const transactionListEl = document.getElementById("transactionList");
const exportBtn = document.getElementById("exportBtn");

// === Fungsi Utilitas ===
// Mengubah angka biasa menjadi format Rupiah (Contoh: 10000 -> Rp 10.000,00)
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", { 
    style: "currency", 
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}

// === Fungsi Tampilan (Render) ===
// Memperbarui angka di panel ringkasan atas
function updateSummaryUI() {
  const summary = calculateSummary();
  
  totalIncomeEl.textContent = formatRupiah(summary.income);
  totalExpenseEl.textContent = formatRupiah(summary.expense);
  totalBalanceEl.textContent = formatRupiah(summary.balance);
}

// Menampilkan data ke dalam tabel HTML
function renderTable() {
  // Kosongkan isi tabel terlebih dahulu
  transactionListEl.innerHTML = "";
  const allData = getTransactions();

  allData.forEach((t) => {
    const row = document.createElement("tr");
    
    // Tentukan warna dan teks label berdasarkan jenis transaksi
    const typeLabel = t.type === "in" ? "Masuk" : "Keluar";
    const typeColor = t.type === "in" ? "var(--success-color)" : "var(--danger-color)";

    row.innerHTML = `
      <td>${t.date}</td>
      <td>${t.desc}</td>
      <td style="color: ${typeColor}; font-weight: 600;">${typeLabel}</td>
      <td>${formatRupiah(t.amount)}</td>
      <td>
        <button class="delete-btn" onclick="handleDelete('${t.id}')">Hapus</button>
      </td>
    `;
    
    transactionListEl.appendChild(row);
  });
}

// Fungsi gabungan untuk menyegarkan seluruh tampilan
function refreshUI() {
  updateSummaryUI();
  renderTable();
}

// === Event Listeners (Aksi Pengguna) ===

// 1. Saat form dikirim (tombol Simpan ditekan)
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Mencegah halaman me-refresh

  // Buat objek transaksi baru
  const newTransaction = {
    id: "TRX-" + Date.now(), // Buat ID unik berdasarkan waktu
    date: new Date().toLocaleDateString("id-ID"),
    desc: descInput.value,
    amount: Number(amountInput.value),
    type: typeInput.value
  };

  addTransaction(newTransaction);
  refreshUI();
  form.reset(); // Kosongkan form kembali
});

// 2. Saat tombol hapus ditekan (dipanggil dari atribut onclick di tabel)
// Perhatikan fungsi ini dibuat global dengan window agar bisa diakses HTML
window.handleDelete = function(id) {
  const confirmDelete = confirm("Apakah Anda yakin ingin menghapus transaksi ini?");
  if (confirmDelete) {
    deleteTransaction(id);
    refreshUI();
  }
}

// 3. Fitur Tambahan: Ekspor data ke CSV
exportBtn.addEventListener("click", function() {
  const data = getTransactions();
  if (data.length === 0) {
    alert("Tidak ada data untuk diekspor!");
    return;
  }

  // Header CSV
  let csvContent = "data:text/csv;charset=utf-8,ID,Tanggal,Keterangan,Jenis,Nominal\n";
  
  // Isi CSV
  data.forEach(t => {
    const row = `${t.id},${t.date},"${t.desc}",${t.type},${t.amount}`;
    csvContent += row + "\n";
  });

  // Proses pengunduhan
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "laporan_kaskelas.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// === Inisialisasi Pertama Kali ===
// Jalankan refreshUI saat halaman web pertama kali dibuka
refreshUI();
