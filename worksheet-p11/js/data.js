
export const profil = {
    nama: "Muhammad Dzaky Putra Wando",
    peran: "Mahasiswa Informatika",
    keahlian: ["HTML", "CSS", "JavaScript"]
};

export function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => {
    return daftar.join(" · ");
};


export function saring(daftar, kategori) {
    if (kategori === "semua") {
        return daftar;
    }

    return daftar.filter(
        (series) => series.kategori === kategori
    );
}
