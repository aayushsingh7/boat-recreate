const textFormatter = (text) => {
    if (!text) return;

    const words = text.split("-");
    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const formattedText = formattedWords.join(" ");
    return formattedText;
}

export default textFormatter;
