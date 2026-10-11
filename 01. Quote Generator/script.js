const quoteContainer = document.querySelector("#quote-container");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuote = document.querySelector("#new-quote");

const loader = document.querySelector(".loader");

function showLoadingSpinner() {
    loader.classList.remove("hidden");
    quoteContainer.classList.add("hidden");
}

function removeLoadingSpinner() {
    loader.classList.add("hidden");
    quoteContainer.classList.remove("hidden");
}

async function getQuote() {
    showLoadingSpinner();

    try {
        const response = await fetch(
            "https://api.api-ninjas.com/v2/randomquotes?categories=success,wisdom",
            {
                headers: {
                    "X-Api-Key": "lTnNAGoujZbONvtNOiMh6Xx0FgngPigdqHik630W",
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const [data] = await response.json();

        console.log(data);

        if (data.author === "") {
            author.innerText = "Unknown";
        } else {
            author.innerText = data.author;
        }

        if (data.quote.length > 120) {
            quote.classList.add("long-quote");
        } else {
            quote.classList.remove("long-quote");
        }

        quote.innerText = data.quote;

        removeLoadingSpinner();
    } catch (error) {
        console.log(error);
        getQuote();
    }
}
getQuote();
newQuote.addEventListener("click", getQuote);
