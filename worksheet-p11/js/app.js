
import { ambilProyek } from "./api.js";
import {
    render,
    aturMemuat,
    tampilkanGalat
} from "./dom.js";
import { pasangEvents } from "./events.js";
import {
    state,
    aturDaftarProyek,
    aturKategoriAktif,
    aturFavorit
} from "./state.js";
import {
    ambilState,
    simpanState
} from "./storage.js";

async function mulaiAplikasi() {
    aturMemuat(true);

    try {
        // Ambil state yang pernah disimpan.
        const tersimpan = ambilState();

        if (tersimpan) {
            aturKategoriAktif(tersimpan.kategoriAktif);
            aturFavorit(tersimpan.favorit);
        }

        // Ambil data series dari JSON.
        const daftar = await ambilProyek();
        aturDaftarProyek(daftar);

        // Pertahankan hanya favorit yang ID-nya masih tersedia.
        const idValid = new Set(daftar.map((item) => item.id));
        const favoritValid = state.favorit.filter(
            (id) => idValid.has(id)
        );
        aturFavorit(favoritValid);

        render(state);
        pasangEvents();

        // Simpan state awal yang valid.
        simpanState(state);
    } catch (galat) {
        tampilkanGalat(
            "Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman."
        );
        console.error("Gagal memuat data:", galat);
    } finally {
        aturMemuat(false);
    }
}

mulaiAplikasi();
