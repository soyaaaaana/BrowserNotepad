document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    document.dispatchEvent(new Event("loaded"));
  }
});