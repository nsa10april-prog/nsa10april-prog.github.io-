let quoteID = document.getElementById('quoteID')
let autorID = document.getElementById('autorID')

console.log(quoteID);
console.log(autorID);

async function getQuote() {

    try {
        quoteID.innerHTML = "Loading...";
        autorID.innerHTML = "Loading...";

        let result = await fetch('https://dummyjson.com/quotes/random');

        let data = await result.json();

        console.log(data);
        console.log(data.quote);

        quoteID.innerHTML = data.quote;
        autorID.innerHTML = data.author;

    } catch (error) {
        console.log("Error : " + error);
    }

}


getQuote();
