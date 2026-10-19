
import { simpanState, hapusStateTersimpan } from "./storage.js";
import {
    state,
    aturKategoriAktif,
    tambahFavorit,
    hapusFavorit,
    aturDaftarProyek,
    resetState
} from "./state.js";
import { render } from "./dom.js";

export function pasangEvents() {
    const filter = document.querySelector("#filter");
    const daftar = document.querySelector("#daftar");
    const form = document.querySelector("#form-series");
    const inputJudul = document.querySelector("#judul-series");
    const inputGenre = document.querySelector("#genre");
    const inputRating = document.querySelector("#rating");
    const tombolReset = document.querySelector("#reset-state");

    // Filter kategori
    filter.addEventListener("click", (event) => {
        const tombol = event.target.closest("button");

        if (!tombol || !filter.contains(tombol)) return;

        aturKategoriAktif(tombol.dataset.kategori);

        filter.querySelectorAll("button").forEach((button) => {
            button.classList.toggle("aktif", button === tombol);
        });

        render(state);
        simpanState(state);
    });

    // Tambah atau hapus favorit
    daftar.addEventListener("click", (event) => {
        const tombol = event.target.closest("button[data-favorit-id]");

        if (!tombol || !daftar.contains(tombol)) return;

        const id = Number(tombol.dataset.favoritId);

        if (state.favorit.includes(id)) {
            hapusFavorit(id);
        } else {
            tambahFavorit(id);
        }

        render(state);
        simpanState(state);
    });

    // Tambah series
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const judul = inputJudul.value.trim();
        const kategori = inputGenre.value.trim();
        const teksRating = inputRating.value.trim();
        const rating = Number(teksRating);

        if (
            !judul ||
            !kategori ||
            teksRating === "" ||
            !Number.isFinite(rating) ||
            rating < 0 ||
            rating > 10
        ) {
            alert("Periksa kembali isian. Rating harus 0 sampai 10.");
            return;
        }

        const seriesBaru = {
            id: Date.now(),
            judul,
            kategori,
            tahun: new Date().getFullYear(),
            rating
        };

        aturDaftarProyek([...state.daftarProyek, seriesBaru]);
        render(state);
        simpanState(state);
        form.reset();
    });

    // Reset kategori dan favorit
    if (tombolReset) {
        tombolReset.addEventListener("click", () => {
            resetState();
            hapusStateTersimpan();
            simpanState(state);

            filter.querySelectorAll("button").forEach((button) => {
                button.classList.toggle(
                    "aktif",
                    button.dataset.kategori === "semua"
                );
            });

            render(state);
        });
    }
}
