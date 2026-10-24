import { Leaf } from "lucide-react";

export default function Brand({ onClick }) {
  return (
    <button className="brand" onClick={onClick} aria-label="HerbaNusantara, kembali ke beranda">
      <span className="logo"><Leaf /></span>
      <span>Herba<span>Nusantara</span><small>KENALI KEKAYAAN HERBAL</small></span>
    </button>
  );
}
