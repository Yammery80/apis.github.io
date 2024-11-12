const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const coin = Math.random() > 0.5? "Cara": "Cruz";
        if(coin === "Cara")
            return resolve("Ganaste!");
        else    return reject("Perdiste");
    }, 1000);
})

myPromise
    .then(result => console.log(result))
    .catch(error => console.log(error))