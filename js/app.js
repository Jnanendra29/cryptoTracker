const url =
  "https://coingecko.p.rapidapi.com/coins/markets?page=1&vs_currency=usd&per_page=100&order=market_cap_desc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-rapidapi-key": "a4e7eef2f1msh179f2020ecba7f2p1c0c32jsn8010e4d882ef",
  },
};

let coins = [];

//fetching the data from api

const fetchCoins = async () => {
  try {
    const response = await fetch(url, options);
    const coinsData = await response.json();
    return coinsData;
  } catch (error) {
    console.error("Error while fetching", error);
  }
};

const handleFavClick = (coinId) => {};

//display the data on the page

const displayCoins = (coins) => {
  const tableBody = document.getElementById("crypto-table-body");
  tableBody.innerHTML = "";
  coins.forEach((coin, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>
              <img
                src="${coin.image}"
                alt="${coin.name}"
                width="24"
                height="24"
              />
            </td>
            <td>${coin.name}</td>
            <td>$${coin.current_price}</td>
            <td>$${coin.total_volume}</td>
            <td>$${coin.market_cap}</td>
            <td><i class="fa-solid fa-star favourite-icon" data-id="${
              coin.id
            }"></i></td>
        `;

    row.querySelector(".favourite-icon").addEventListener("click", (event) => {
      event.stopPropagation();
      handleFavClick(coin.id);
    });

    tableBody.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  coins = await fetchCoins();
  console.log(coins);
  displayCoins(coins);
});
