const daftar = document.querySelector("#daftar");
const filter = document.querySelector("#filter");
const pesanKosong = document.querySelector("#pesan-kosong");
const form = document.querySelector("#form-series");
const inputJudul = document.querySelector("#judul-series");
const inputGenre = document.querySelector("#genre");
const inputRating = document.querySelector("#rating");
const elemenMuat = document.querySelector("#muat");

let dataSeries = [];

export function render(data) {
    daftar.replaceChildren();

    if (data.length === 0) {
        pesanKosong.textContent = "Tidak ada series pada kategori ini.";
        pesanKosong.hidden = false;
        return;
    }

    pesanKosong.hidden = true;

    data.forEach((series) => {
        const item = document.createElement("li");
        const judul = document.createElement("h3");
        const detail = document.createElement("p");

        judul.textContent = series.judul;
        detail.textContent =
            `${series.kategori} | Tahun ${series.tahun}`;

        item.append(judul, detail);
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

export function pasangFilter(data) {
    dataSeries = data;

    filter.addEventListener("click", (event) => {
        const tombol = event.target.closest("button");

        if (!tombol || !filter.contains(tombol)) {
            return;
        }

        const kategori = tombol.dataset.kategori;

        filter.querySelectorAll("button").forEach((button) => {
            button.classList.toggle("aktif", button === tombol);
        });

        const hasil = kategori === "semua"
            ? dataSeries
            : dataSeries.filter((series) =>
                series.kategori === kategori
            );

        render(hasil);
    });
}

const kolom = [
    {
        input: inputJudul,
        pesan: document.querySelector("#error-judul"),
        nama: "Judul series"
    },
    {
        input: inputGenre,
        pesan: document.querySelector("#error-genre"),
        nama: "Genre"
    },
    {
        input: inputRating,
        pesan: document.querySelector("#error-rating"),
        nama: "Rating"
    }
];

function periksaInput(kolomInput) {
    const { input, pesan, nama } = kolomInput;
    const nilai = input.value.trim();
    let kesalahan = "";

    if (nilai === "") {
        kesalahan = `${nama} wajib diisi.`;
    } else if (
        input === inputRating &&
        (Number(nilai) < 0 || Number(nilai) > 10)
    ) {
        kesalahan = "Rating harus antara 0 sampai 10.";
    }

    input.setAttribute("aria-invalid", String(Boolean(kesalahan)));

    if (pesan) {
        pesan.textContent = kesalahan;
    }

    return kesalahan === "";
}

function periksaSemuaInput() {
    return kolom.every(periksaInput);
}

function perbaruiTombol() {
    const tombolSimpan = form.querySelector('[type="submit"]');

    if (tombolSimpan) {
        tombolSimpan.disabled = !periksaSemuaInput();
    }
}

kolom.forEach(({ input }) => {
    input.addEventListener("input", perbaruiTombol);
    input.addEventListener("blur", () => {
        periksaInput(kolom.find((item) => item.input === input));
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const valid = periksaSemuaInput();

    if (!valid) {
        const pertamaTidakValid = kolom.find(
            (item) => !periksaInput(item)
        );

        pertamaTidakValid?.input.focus();
        return;
    }

    const seriesBaru = {
        id: Date.now(),
        judul: inputJudul.value.trim(),
        kategori: inputGenre.value.trim(),
        tahun: new Date().getFullYear(),
        rating: Number(inputRating.value)
    };

    dataSeries.push(seriesBaru);
    render(dataSeries);

    form.reset();
    perbaruiTombol();

    console.log("Series berhasil ditambahkan:", seriesBaru);
});

perbaruiTombol();