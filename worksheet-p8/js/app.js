
const profil = {
  nama: "Muhammad Dzaky Putra Wando",
  peran: "Mahasiswa Informatika",
  keahlian: ["HTML", "CSS", "JavaScript"],
  jumlahProyek: 3,
};

const kalimat = `Nama saya ${profil.nama}, saya seorang ${profil.peran}, dan saya mempelajari ${profil.keahlian.length} keahlian.`;

console.log(kalimat);
console.log("Jumlah proyek:", profil.jumlahProyek);
console.table(profil.keahlian);


function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => {
  return daftar.join(" · ");
};

console.log("Perkenalan:", buatPerkenalan(profil));
console.log("Keahlian:", formatKeahlian(profil.keahlian));


const daftarProyek = [
  {
    judul: "Website Series Film Favorite",
    tahun: 2026,
    selesai: true,
  },
  {
    judul: "Halaman Profil",
    tahun: 2026,
    selesai: true,
  },
  {
    judul: "Website Katalog Film",
    tahun: 2026,
    selesai: false,
  },
];

console.table(daftarProyek);


const judulProyek = daftarProyek.map((proyek) => proyek.judul);
console.log("Judul semua proyek:", judulProyek);

const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);
console.log("Proyek yang selesai:", proyekSelesai);

const proyekPilihan = daftarProyek.find(
  (proyek) => proyek.judul === "Website Series Film Favorite"
);
console.log("Proyek yang ditemukan:", proyekPilihan);


const urutanProyek = [...daftarProyek].sort((a, b) =>
  a.judul.localeCompare(b.judul)
);

console.log("Urutan proyek berdasarkan judul:");
console.table(urutanProyek);

console.log("Array asli tetap:");
console.table(daftarProyek);


const elemenProfil = document.querySelector("#profil");

if (elemenProfil !== null) {
  console.log("Elemen profil ditemukan.");
} else {
  console.log("Elemen #profil tidak ditemukan di HTML.");
}
