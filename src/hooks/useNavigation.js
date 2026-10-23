
import { useState } from "react";

export default function useNavigation(initialPage = "Beranda") {
  const [page, setPage] = useState(initialPage);

  function navigate(nextPage) {
    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return {
    page,
    navigate,
  };
}
