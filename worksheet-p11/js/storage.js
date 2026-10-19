
const KUNCI = "pabw-p11";
const VERSI = 2;

export function simpanState(state) {
    const dataSimpan = {
        versi: VERSI,
        kategoriAktif: state.kategoriAktif,
        favorit: state.favorit
    };

    localStorage.setItem(
        KUNCI,
        JSON.stringify(dataSimpan)
    );
}

export function ambilState() {
    try {
        const teks = localStorage.getItem(KUNCI);

        if (teks === null) {
            return null;
        }

        const data = JSON.parse(teks);

        if (
            data === null ||
            typeof data !== "object" ||
            data.versi !== VERSI ||
            typeof data.kategoriAktif !== "string" ||
            !Array.isArray(data.favorit) ||
            !data.favorit.every(
                (id) => Number.isSafeInteger(id)
            )
        ) {
            hapusStateTersimpan();
            return null;
        }

        return {
            kategoriAktif: data.kategoriAktif,
            favorit: data.favorit
        };
    } catch (galat) {
        console.warn(
            "Data penyimpanan rusak; menggunakan state default.",
            galat
        );

        hapusStateTersimpan();
        return null;
    }
}

export function hapusStateTersimpan() {
    try {
        localStorage.removeItem(KUNCI);
    } catch (galat) {
        console.warn("Penyimpanan tidak dapat dihapus.", galat);
    }
}
