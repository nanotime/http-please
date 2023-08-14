export function formatUrlPlugin() {
  return {
    /**
     * Formats a URL with the given path and parameters.
     *
     * @param {string} path - The path of the URL.
     * @param {object} params - The parameters to be added to the URL.
     * @return {string} The formatted URL.
     */
    formatUrl(path, params) {
      if (!params) {
        return `${this.url.origin}${path}${this.url.searchParams}`;
      }

      const query = new URLSearchParams([
        ...Array.from(this.url.searchParams.entries()),
        ...Object.entries(params),
      ]).toString();

      return `${this.url.origin}${path}?${query}`;
    },
  };
}
