export const useImagesStore = defineStore("images", () => {
  const images = import.meta.glob("~/assets/images/**/*", {
    eager: true,
    import: "default",
  });

  return { images };
});
