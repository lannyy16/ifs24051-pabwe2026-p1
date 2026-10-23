
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application error:", error);

    console.error(
      "Error details:",
      errorInfo.componentStack
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="wrap">
          <section className="section">
            <h1>Terjadi kesalahan</h1>

            <p>
              Maaf, halaman tidak dapat ditampilkan.
              Silakan muat ulang aplikasi.
            </p>

            <button
              className="primary"
              onClick={() => window.location.reload()}
            >
              Muat ulang
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
