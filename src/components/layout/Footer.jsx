
export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>HerbaNusantara 🌿</h3>
        <p>
          Mengenal tanaman herbal Nusantara melalui
          informasi tradisional, penelitian, dan keamanan.
        </p>
      </div>

      <p>
        © {new Date().getFullYear()} HerbaNusantara
      </p>

      <p className="disclaimer">
        Informasi bukan pengganti diagnosis atau pengobatan
        dari tenaga kesehatan.
      </p>
    </footer>
  );
}
