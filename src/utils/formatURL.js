function formatURL(url) {
    // Replace spaces with dashes and convert to lowercase
    return url.replace(/\s+/g, '-').toLowerCase();
}

export default formatURL