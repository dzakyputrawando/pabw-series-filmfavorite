import { saring } from "./data.js";
const daftar = document.querySelector("#daftar");
const pesanKosong = document.querySelector("#pesan-kosong");
const elemenMuat = document.querySelector("#muat");

export function render(state) {
    daftar.replaceChildren();

   const hasil = saring(
    state.daftarProyek,
    state.kategoriAktif
);

    if (hasil.length === 0) {
        pesanKosong.textContent =
            "Tidak ada series pada kategori ini.";
        pesanKosong.hidden = false;
        return;
    }

    pesanKosong.hidden = true;

    hasil.forEach((series) => {
        const item = document.createElement("li");
        const judul = document.createElement("h3");
        const detail = document.createElement("p");
        const tombolFavorit = document.createElement("button");

        judul.textContent = series.judul;
        detail.textContent =
            `${series.kategori} | Tahun ${series.tahun}`;

        tombolFavorit.type = "button";
        tombolFavorit.dataset.favoritId = String(series.id);

        const favorit = state.favorit.includes(series.id);
        tombolFavorit.textContent = favorit
            ? "★ Hapus dari favorit"
            : "☆ Tambah ke favorit";

        item.append(judul, detail, tombolFavorit);
        daftar.append(item);
    });
}

export function aturMemuat(aktif) {
    elemenMuat.hidden = !aktif;
}

export function tampilkanGalat(pesan) {
    daftar.replaceChildren();
    pesanKosong.textContent = pesan;
    pesanKosong.hidden = false;
}
