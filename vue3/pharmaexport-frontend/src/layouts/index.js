const layoutsFiles = import.meta.globEager("./**/*.vue");

export default {
  install(app) {
    for (const path in layoutsFiles) {
      if (Object.prototype.hasOwnProperty.call(layoutsFiles, path)) {
        const name = path.replace(/(.*\/)?(.vue)?/gu, "");

        app.component(name, layoutsFiles[path].default);
      }
    }
  },
};
