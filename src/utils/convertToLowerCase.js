const convertToLowerCase = (input) => {
  if (!input) return "error";
  return input.includes(" ")
    ? input.toLowerCase().replace(/\s/g, "")
    : input.toLowerCase().replace(/-/g, "");
};

export default convertToLowerCase;
