export const scrollbar = {
  getWidth: () => window.innerWidth - document.body.clientWidth,
  toggleAccess(isScrollable) {
    const { body } = document;
    const scrollbarWidth = this.getWidth();
    const timeout = isScrollable ? 200 : 0;

    setTimeout(() => {
      body.style.overflowY = isScrollable ? "auto" : "hidden";
      body.style.marginRight = isScrollable && scrollbarWidth > 0 ? "0" : `${scrollbarWidth}px`;
    }, timeout);
  },
};
