export function queryPlugin() {
  return {
    /**
     * Formats a URL with the given path and parameters.
     *
     * @param {string} path - The path of the URL.
     * @param {object} params - The parameters to be added to the URL.
     * @return {Object} A new instance of URL.
     */
    query(params) {
      const query = new URLSearchParams([
        ...Array.from(this.url.searchParams.entries()),
        ...Object.entries(params),
      ]).toString();

      return { ...this, url: `${this.url.origin}?${query}` };
    },
  };
}
