function generateRandomID(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomID = '';
    for (let i = 0; i < length; i++) {
      randomID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomID;
  }

  export default generateRandomID