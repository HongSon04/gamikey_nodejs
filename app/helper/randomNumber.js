const randomNumber = (number) => {
    let char = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let random = '';
    for (let i = 0; i < number; i++) {
        random += char[Math.floor(Math.random() * char.length)];
    }
    return random;
}

module.exports = randomNumber;