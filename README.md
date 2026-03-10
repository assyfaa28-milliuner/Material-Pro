# Material Pro
## Flowchart Transaksi POS

```mermaid
graph TD
A[Barang Dipilih] --> B{Cek Stok di Supabase}
B -- Ada --> C[Hitung Total & AI Audit]
B -- Habis --> D[Notifikasi Stok Kosong]
C --> E[Simpan ke Tabel Sales Supabase]
