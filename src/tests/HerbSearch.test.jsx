
import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import HerbSearch from "../components/herbal/HerbSearch";

describe("HerbSearch", () => {
  it("menampilkan input pencarian", () => {
    render(<HerbSearch onSearch={() => {}} />);

    expect(
      screen.getByRole("searchbox", {
        name: "Cari herbal",
      })
    ).toBeInTheDocument();
  });

  it("menampilkan tombol Cari", () => {
    render(<HerbSearch onSearch={() => {}} />);

    expect(
      screen.getByRole("button", {
        name: "Cari",
      })
    ).toBeInTheDocument();
  });

  it("menampilkan error jika pencarian kosong", () => {
    render(<HerbSearch onSearch={() => {}} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cari",
      })
    );

    expect(
      screen.getByRole("alert")
    ).toHaveTextContent(
      "Masukkan nama herbal yang ingin dicari"
    );
  });

  it("memanggil onSearch dengan nama herbal", () => {
    const onSearch = vi.fn();

    render(<HerbSearch onSearch={onSearch} />);

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "Cari herbal",
      }),
      {
        target: {
          value: "Jahe",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cari",
      })
    );

    expect(onSearch).toHaveBeenCalledWith("Jahe");
  });

  it("menghapus spasi di awal dan akhir pencarian", () => {
    const onSearch = vi.fn();

    render(<HerbSearch onSearch={onSearch} />);

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "Cari herbal",
      }),
      {
        target: {
          value: "  Jahe  ",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cari",
      })
    );

    expect(onSearch).toHaveBeenCalledWith("Jahe");
  });

  it("menghapus pesan error ketika input berubah", () => {
    render(<HerbSearch onSearch={() => {}} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cari",
      })
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: "Cari herbal",
      }),
      {
        target: {
          value: "Jahe",
        },
      }
    );

    expect(
      screen.queryByRole("alert")
    ).not.toBeInTheDocument();
  });

  it("tidak memanggil onSearch jika input kosong", () => {
    const onSearch = vi.fn();

    render(<HerbSearch onSearch={onSearch} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cari",
      })
    );

    expect(onSearch).not.toHaveBeenCalled();
  });
});
