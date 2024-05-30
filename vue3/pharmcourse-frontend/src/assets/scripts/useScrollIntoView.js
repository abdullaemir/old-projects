const useScrollIntoView = (targetElement, {
  behavior = "smooth", block = "start", inline = "start",
}) => {
  const id = targetElement?.target?.getAttribute("href")?.replace("#", "") ?? targetElement;

  const targetDOMElement = document.getElementById(id);

  if (targetDOMElement) {
    targetDOMElement.scrollIntoView({
      behavior,
      block,
      inline,
    });
  }
};

export default useScrollIntoView;
