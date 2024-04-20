function formatURL(url) {
  if (!url) return "error";
  return url.replace(/\s+/g, "-").toLowerCase();
}

export default formatURL;
