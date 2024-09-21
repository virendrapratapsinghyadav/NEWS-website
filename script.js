const API_KEY = "0bff0470a4a44a18b542719426688593";
const url = "https://newsapi.org/v2/everything?q=";

//adding event listener and performing function fetchNews
window.addEventListener("load", () => {
  fetchNews("India");
});


function reload(){
  window.location.reload();
}

//creating the function fetchNews
async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

// to bind the data
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  //to clear the previous cardcontainer so that not more than 100 articles are formed
  cardsContainer.innerHTML = "";

  //applying loop
  articles.forEach((article) => {
    //agar kisi main image nhi hogi to use load nhi krega uske liye condition
    if (!article.urlToImage) return;

    //to clone the cards
    const cardClone = newsCardTemplate.content.cloneNode(true);
    //to fill data
    fillDataInCard(cardClone, article);
    //to append the cards into container
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  //before writing here match all the things from news api ki kya-kya  de rha hai jaise image,title,author,description etc.
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  //converting time zone date into human redable form
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} &#128507 ${date}`;

  //to open the link by clicking
  cardClone.firstElementChild.addEventListener("click", ()=>{
    window.open(article.url,"_blank");
  });
}


let curSelectedNav = null;
function onNavItemClick(id){
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav =navItem;
  curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
  //value is the property of DOM to get the value 
  const query = searchText.value;
  if(!query)return;
  fetchNews(query);
  curSelectedNav?.classList.remove('active');
  curSelectedNav = null;
})