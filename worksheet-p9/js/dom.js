
import { daftarSeries } from "./app.js";

// Mengambil elemen HTML.
const daftar = document.querySelector("#daftar");
const filter = document.querySelector("#filter");
const pesanKosong = document.querySelector("#pesan-kosong");
const form = document.querySelector("#form-series");

const inputJudul = document.querySelector("#judul-series");
const inputGenre = document.querySelector("#genre");
const inputRating = document.querySelector("#rating");

const pesanJudul = document.querySelector("#pesan-judul");
const pesanGenre = document.querySelector("#pesan-genre");
const pesanRating = document.querySelector("#pesan-rating");

// Memastikan semua elemen tersedia.
if (
    !daftar ||
    !filter ||
    !pesanKosong ||
    !form ||
    !inputJudul ||
    !inputGenre ||
    !inputRating ||
    !pesanJudul ||
    !pesanGenre ||
    !pesanRating
) {
    console.error("Ada elemen HTML yang tidak ditemukan. Periksa ID di profil.html.");
} else {
    let series = [...daftarSeries];
    let kategoriAktif = "semua";

    // Membuat satu kartu series.
    function buatKartu(proyek) {
        const kartu = document.createElement("article");
        kartu.className = "kartu";

        const judul = document.createElement("h3");
        judul.textContent = proyek.judul;

        const genre = document.createElement("p");
        genre.textContent = `Genre: ${proyek.genre}`;

        const tahun = document.createElement("p");
        tahun.textContent = `Tahun rilis: ${proyek.tahun}`;

        const rating = document.createElement("p");
        rating.textContent = `Rating: ${proyek.rating}`;

        kartu.append(judul, genre, tahun, rating);

        return kartu;
    }

    // Menampilkan series ke halaman.
    function render(data) {
        daftar.replaceChildren();

        pesanKosong.hidden = data.length !== 0;

        data.forEach((proyek) => {
            daftar.append(buatKartu(proyek));
        });
    }

    // Menyaring series berdasarkan kategori.
    function terapkanFilter() {
        const hasil = kategoriAktif === "semua"
            ? series
            : series.filter(
                (proyek) =>
                    proyek.genre.toLowerCase() === kategoriAktif.toLowerCase()
            );

        render(hasil);
    }

    // Event delegation untuk tombol filter.
    filter.addEventListener("click", (event) => {
        const tombol = event.target.closest("button");

        if (!tombol || !filter.contains(tombol)) {
            return;
        }

        kategoriAktif = tombol.dataset.kategori;

        filter.querySelectorAll("button").forEach((item) => {
            item.classList.toggle("aktif", item === tombol);
        });

        terapkanFilter();
    });

    // Memeriksa input dan menampilkan pesan validasi.
    function validasiInput(input, pesan, keterangan) {
        const nilai = input.value.trim();
        let kesalahan = "";

        if (nilai === "") {
            kesalahan = `${keterangan} wajib diisi.`;
        } else if (input === inputRating) {
            const angka = Number(nilai);

            if (!Number.isFinite(angka) || angka < 0 || angka > 10) {
                kesalahan = "Rating harus antara 0 sampai 10.";
            }
        }

        pesan.textContent = kesalahan;
        input.setAttribute("aria-invalid", String(kesalahan !== ""));

        return kesalahan === "";
    }

    // Memperbarui validasi ketika pengguna mengetik.
    inputJudul.addEventListener("input", () => {
        validasiInput(inputJudul, pesanJudul, "Judul");
    });

    inputGenre.addEventListener("input", () => {
        validasiInput(inputGenre, pesanGenre, "Genre");
    });

    inputRating.addEventListener("input", () => {
        validasiInput(inputRating, pesanRating, "Rating");
    });

    // Menangani pengiriman formulir.
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const judulSah = validasiInput(
            inputJudul,
            pesanJudul,
            "Judul"
        );

        const genreSah = validasiInput(
            inputGenre,
            pesanGenre,
            "Genre"
        );

        const ratingSah = validasiInput(
            inputRating,
            pesanRating,
            "Rating"
        );

        if (!judulSah || !genreSah || !ratingSah) {
            if (!judulSah) {
                inputJudul.focus();
            } else if (!genreSah) {
                inputGenre.focus();
            } else {
                inputRating.focus();
            }

            return;
        }

        const seriesBaru = {
            id: Date.now(),
            judul: inputJudul.value.trim(),
            genre: inputGenre.value.trim(),
            tahun: new Date().getFullYear(),
            rating: Number(inputRating.value),
        };

        series.push(seriesBaru);

        form.reset();

        [inputJudul, inputGenre, inputRating].forEach((input) => {
            input.removeAttribute("aria-invalid");
        });

        pesanJudul.textContent = "";
        pesanGenre.textContent = "";
        pesanRating.textContent = "";

        kategoriAktif = "semua";

        filter.querySelectorAll("button").forEach((tombol) => {
            tombol.classList.toggle(
                "aktif",
                tombol.dataset.kategori === "semua"
            );
        });

        terapkanFilter();

        console.log("Series berhasil ditambahkan:", seriesBaru);
    });

    // Tampilan awal.
    render(series);

    console.log("DOM P9 berhasil dijalankan.");
}
