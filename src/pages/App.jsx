
import React, { useState } from "react";

import {
  Leaf,
  Search,
  ArrowRight,
  Bookmark,
  BookOpen,
  ShieldCheck,
  Globe,
  ChevronRight,
} from "lucide-react";

// IMPORT DATA HERBAL
import { herbs } from "../data/herbs";

export default function App() {
  const [page, setPage] = useState("Beranda");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([]);

  const nav = [
    "Beranda",
    "Katalog Herbal",
    "Herbal Finder",
    "Artikel",
    "Dashboard",
  ];

  // FILTER HERBAL BERDASARKAN PENCARIAN
  const filtered = herbs.filter((herb) =>
    (
      herb.name +
      " " +
      herb.latin +
      " " +
      herb.category
    )
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // PINDAH HALAMAN
  function go(pageName) {
    setPage(pageName);
    setSelected(null);
    setQuery("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // SIMPAN ATAU HAPUS HERBAL FAVORIT
  function toggleSave(herbId) {
    setSaved((previous) =>
      previous.includes(herbId)
        ? previous.filter((id) => id !== herbId)
        : [...previous, herbId]
    );
  }

  // BUKA DETAIL HERBAL
  function openHerb(herb) {
    setSelected(herb);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {/* ================= HEADER ================= */}

      <header>
        <div className="nav wrap">
          <button
            className="brand"
            onClick={() => go("Beranda")}
          >
            <span className="logo">
              <Leaf />
            </span>

            <span>
              Herba<span>Nusantara</span>

              <small>KENALI KEKAYAAN HERBAL</small>
            </span>
          </button>

          <nav>
            {nav.map((item) => (
              <button
                key={item}
                className={page === item ? "active" : ""}
                onClick={() => go(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          <button className="lang">
            <Globe size={16} />
            ID
            <ChevronRight size={14} />
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="wrap">
        {/* ================= DETAIL HERBAL ================= */}

        {selected ? (
          <section className="detail">
            <button
              className="back"
              onClick={() => setSelected(null)}
            >
              ← Kembali ke katalog
            </button>

            <div className="detailgrid">
              <div
                className="plantpic"
                style={{
                  background: selected.color,
                }}
              >
                <span>{selected.emoji}</span>

                <small>{selected.category}</small>
              </div>

              <div>
                <p className="eyebrow">
                  ENSIKLOPEDIA HERBAL
                </p>

                <h1>{selected.name}</h1>

                <i>{selected.latin}</i>

                <p>{selected.desc}</p>

                <button
                  className="save"
                  onClick={() => toggleSave(selected.id)}
                >
                  <Bookmark size={16} />

                  {saved.includes(selected.id)
                    ? "Tersimpan"
                    : "Simpan herbal"}
                </button>

                <div className="info">
                  <h3>Penggunaan tradisional</h3>

                  <p>{selected.traditional}</p>

                  <h3>Informasi ilmiah</h3>

                  <p>{selected.evidence}</p>

                  <h3>Keamanan</h3>

                  <p>{selected.safety}</p>
                </div>
              </div>
            </div>

            <p className="disclaimer">
              Informasi edukasi, bukan diagnosis atau pengganti
              saran tenaga kesehatan.
            </p>
          </section>
        ) : page === "Beranda" ? (
          <>
            {/* ================= HERO ================= */}

            <section className="hero">
              <div className="heroText">
                <span className="pill">
                  <Leaf size={15} />
                  ENSIKLOPEDIA HERBAL INDONESIA
                </span>

                <h1>
                  Kenali alam,
                  <br />
                  <em>rawat keseimbangan.</em>
                </h1>

                <p>
                  Jelajahi tanaman herbal Nusantara, kenali
                  penggunaan tradisional, bukti ilmiah, dan
                  informasi keamanannya.
                </p>

                <div className="actions">
                  <button
                    className="primary"
                    onClick={() => go("Katalog Herbal")}
                  >
                    Jelajahi herbal
                    <ArrowRight size={17} />
                  </button>

                  <button
                    className="secondary"
                    onClick={() => go("Herbal Finder")}
                  >
                    Cari berdasarkan keluhan
                  </button>
                </div>

                <div className="stats">
                  <span>
                    <b>{herbs.length}</b>
                    <small>Herbal pilihan</small>
                  </span>

                  <span>
                    <b>06</b>
                    <small>Kategori tanaman</small>
                  </span>

                  <span>
                    <b>01</b>
                    <small>Tujuan: edukasi</small>
                  </span>
                </div>
              </div>

              <div className="heroArt">
                <div className="sun"></div>

                <div className="leafart">🌿</div>

                <div className="artnote">
                  <span>✦</span>

                  <b>Herbal Nusantara</b>

                  <small>
                    Tradisi • Pengetahuan • Alam
                  </small>
                </div>
              </div>
            </section>

            {/* ================= HERBAL PILIHAN ================= */}

            <section className="section">
              <div className="sectionhead">
                <div>
                  <p className="eyebrow">JELAJAHI</p>

                  <h2>Temukan herbal pilihan</h2>

                  <p>
                    Kenali tanaman dari berbagai kategori dan
                    manfaat tradisionalnya.
                  </p>
                </div>

                <button
                  className="textlink"
                  onClick={() => go("Katalog Herbal")}
                >
                  Lihat semua
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="cards">
                {herbs.slice(0, 3).map((herb) => (
                  <HerbCard
                    key={herb.id}
                    h={herb}
                    onClick={() => openHerb(herb)}
                  />
                ))}
              </div>
            </section>

            {/* ================= FINDER BANNER ================= */}

            <section className="finderbanner">
              <div>
                <p className="eyebrow">HERBAL FINDER</p>

                <h2>
                  Mulai dari apa yang ingin kamu ketahui.
                </h2>

                <p>
                  Temukan informasi herbal berdasarkan topik
                  keluhan secara edukatif, bukan untuk diagnosis.
                </p>
              </div>

              <button
                className="primary"
                onClick={() => go("Herbal Finder")}
              >
                Mulai pencarian
                <ArrowRight size={16} />
              </button>
            </section>

            {/* ================= KATEGORI ================= */}

            <section className="section categories">
              <div className="sectionhead">
                <div>
                  <p className="eyebrow">KATEGORI</p>

                  <h2>Beragam bentuk, satu kekayaan</h2>
                </div>
              </div>

              <div className="categorygrid">
                {[
                  ["🌱", "Rimpang", "Jahe, temulawak"],
                  ["🍃", "Daun", "Kemangi, pegagan"],
                  ["🌼", "Bunga", "Chamomile, rosella"],
                  ["🫐", "Biji & buah", "Pala, kapulaga"],
                  ["🌳", "Kulit & resin", "Kayu manis"],
                  ["🍄", "Jamur", "Jamur tradisional"],
                ].map((category) => (
                  <button
                    onClick={() => {
                      go("Katalog Herbal");
                      setQuery(category[1]);
                    }}
                    className="cat"
                    key={category[1]}
                  >
                    <span>{category[0]}</span>

                    <b>{category[1]}</b>

                    <small>{category[2]}</small>
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : page === "Katalog Herbal" ? (
          /* ================= KATALOG ================= */

          <section className="section catalog">
            <p className="eyebrow">KATALOG</p>

            <h1>Jelajahi tanaman herbal</h1>

            <p>
              Temukan profil tanaman, penggunaan tradisional,
              bukti ilmiah, dan keamanan.
            </p>

            <div className="search">
              <Search />

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Cari nama, kategori, atau nama ilmiah..."
              />
            </div>

            <div className="cards">
              {filtered.map((herb) => (
                <HerbCard
                  key={herb.id}
                  h={herb}
                  onClick={() => openHerb(herb)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <p>Herbal tidak ditemukan.</p>
            )}
          </section>
        ) : page === "Herbal Finder" ? (
          /* ================= HERBAL FINDER ================= */

          <section className="section catalog">
            <p className="eyebrow">HERBAL FINDER</p>

            <h1>Informasi berdasarkan keluhan</h1>

            <p>
              Pilih topik untuk membaca informasi edukatif.
              Hasil bukan diagnosis dan tidak menentukan
              pengobatan.
            </p>

            <div className="findergrid">
              {[
                "Mual ringan",
                "Kualitas tidur",
                "Pencernaan",
                "Relaksasi",
              ].map((topic, index) => (
                <button
                  className="topic"
                  key={topic}
                  onClick={() => {
                    setQuery(
                      index === 0
                        ? "jahe"
                        : index === 1
                        ? "chamomile"
                        : ""
                    );

                    setPage("Katalog Herbal");

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  <span>
                    {["🌿", "🌼", "🍃", "☘️"][index]}
                  </span>

                  <b>{topic}</b>

                  <small>
                    Lihat informasi herbal terkait
                    <ArrowRight size={13} />
                  </small>
                </button>
              ))}
            </div>

            <div className="notice">
              <ShieldCheck />

              <div>
                <b>Perhatian</b>

                <p>
                  Jika keluhan berat, berlangsung lama,
                  atau memburuk, hubungi tenaga kesehatan.
                  Jangan menghentikan obat yang diresepkan.
                </p>
              </div>
            </div>
          </section>
        ) : page === "Artikel" ? (
          /* ================= ARTIKEL ================= */

          <section className="section catalog">
            <p className="eyebrow">PENGETAHUAN</p>

            <h1>Artikel herbal</h1>

            <div className="articlebox">
              <BookOpen />

              <div>
                <b>
                  Memahami penggunaan herbal secara bijak
                </b>

                <p>
                  Kenali perbedaan penggunaan tradisional,
                  bukti penelitian, dan keamanan sebelum
                  menggunakan tanaman herbal.
                </p>
              </div>
            </div>

            <div className="articlebox">
              <BookOpen />

              <div>
                <b>
                  Herbal sebagai bagian dari budaya Nusantara
                </b>

                <p>
                  Tanaman, tradisi, dan pengetahuan lokal
                  yang diwariskan dari generasi ke generasi.
                </p>
              </div>
            </div>
          </section>
        ) : page === "Dashboard" ? (
          /* ================= DASHBOARD ================= */

          <section className="section catalog">
            <p className="eyebrow">DASHBOARD</p>

            <h1>Ruang herbal saya</h1>

            <p>
              Herbal yang kamu simpan di perangkat ini.
            </p>

            <div className="cards">
              {herbs
                .filter((herb) => saved.includes(herb.id))
                .map((herb) => (
                  <HerbCard
                    h={herb}
                    key={herb.id}
                    onClick={() => openHerb(herb)}
                  />
                ))}
            </div>

            {saved.length === 0 && (
              <div className="notice">
                <Bookmark />

                <div>
                  <b>Belum ada herbal tersimpan</b>

                  <p>
                    Buka katalog dan tekan “Simpan herbal”
                    untuk menambah favorit.
                  </p>

                  <button
                    className="textlink"
                    onClick={() => go("Katalog Herbal")}
                  >
                    Buka katalog
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          /* ================= KONTRIBUSI ================= */

          <section className="section catalog">
            <p className="eyebrow">KONTRIBUSI</p>

            <h1>Tambah herbal</h1>

            <p>
              Fitur kontribusi akan dikembangkan pada
              versi berikutnya.
            </p>
          </section>
        )}
      </main>

      {/* ================= FOOTER ================= */}

      <footer>
        <div className="wrap foot">
          <div className="brand">
            <span className="logo">
              <Leaf />
            </span>

            <span>
              Herba<span>Nusantara</span>

              <small>KENALI KEKAYAAN HERBAL</small>
            </span>
          </div>

          <p>
            Pengetahuan herbal untuk edukasi yang lebih bijak.
          </p>

          <small>
            © 2026 HerbaNusantara · Informasi bukan pengganti
            konsultasi medis.
          </small>
        </div>
      </footer>
    </>
  );
}

// ================= KOMPONEN KARTU HERBAL =================

function HerbCard({ h, onClick }) {
  return (
    <button className="herbcard" onClick={onClick}>
      <div
        className="cardpic"
        style={{
          background: h.color,
        }}
      >
        <span>{h.emoji}</span>

        <small>{h.tag}</small>
      </div>

      <div className="cardbody">
        <div className="cardtitle">
          <h3>{h.name}</h3>

          <ArrowRight size={17} />
        </div>

        <i>{h.latin}</i>

        <p>{h.desc}</p>

        <span className="read">
          Lihat profil
          <ChevronRight size={14} />
        </span>
      </div>
    </button>
  );
}
