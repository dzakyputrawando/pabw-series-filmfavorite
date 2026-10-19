const profil = {
    nama: "Muhammad Dzaky Putra Wando",
    peran: "Mahasiswa Informatika",
    keahlian: ["HTML", "CSS", "JavaScript"]
};

const jumlahProyek = 3;

const kalimat = `Nama saya ${profil.nama}, dan saya memiliki ${jumlahProyek} proyek.`;

console.log(kalimat);

const alamat = {
    kota: "Yogyakarta"
};

const kota = alamat?.kota ?? "Kota belum diisi";

console.log(`Saya tinggal di ${kota}.`);

function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}
const formatKeahlian = (daftar) => daftar.join(" · ");
console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

const daftarProyek = [
    {
        judul: "Website Series Film Favorite",
        tahun: 2026,
        selesai: true
    },
    {
        judul: "Halaman Profil",
        tahun: 2026,
        selesai: true
    },
    {
        judul: "Website Katalog Film",
        tahun: 2026,
        selesai: false
    }
];
console.table(daftarProyek);

const judulProyek = daftarProyek.map((proyek) => proyek.judul);

console.log(judulProyek);

const proyekSelesai = daftarProyek.filter(
    (proyek) => proyek.selesai
);

console.table(proyekSelesai);

const proyekFilm = daftarProyek.find(
    (proyek) => proyek.judul === "Website Series Film Favorite"
);

console.log(proyekFilm);

import { ambilProyek } from "./api.js";

import {
    render,
    aturMemuat,
    tampilkanGalat,
    pasangFilter
} from "./dom.js";

async function muat() {
    aturMemuat(true);

    try {
        const daftar = await ambilProyek();

        pasangFilter(daftar);
        render(daftar);
    } catch (galat) {
        tampilkanGalat(
            "Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman."
        );

        console.error(galat.message);
    } finally {
        aturMemuat(false);
    }
}

muat();