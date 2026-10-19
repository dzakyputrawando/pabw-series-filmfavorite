
export const state = {
    daftarProyek: [],
    kategoriAktif: "semua",
    favorit: []
};

export function aturDaftarProyek(daftar) {
    state.daftarProyek = daftar;
}

export function aturKategoriAktif(kategori) {
    state.kategoriAktif = kategori;
}

export function tambahFavorit(id) {
    if (!state.favorit.includes(id)) {
        state.favorit.push(id);
    }
}

export function hapusFavorit(id) {
    state.favorit = state.favorit.filter(
        (idFavorit) => idFavorit !== id
    );
}

export function aturFavorit(daftarFavorit) {
    state.favorit = daftarFavorit;
}

export function resetState() {
    state.kategoriAktif = "semua";
    state.favorit = [];
}
