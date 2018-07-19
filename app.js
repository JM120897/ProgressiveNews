const main = document.querySelector('main');
const source = document.querySelector('#source');
const defaultSource = 'bbc-news';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources(); 
    source.value = defaultSource;

    source.addEventListener('change', e => {
        updateNews(e.target.value);
    });

    if('serviceWorker' in navigator){
        try{
            navigator.serviceWorker.register('sw.js');
            console.log('SW Registered');
        }catch(error){
            console.log('Registration failed');
        }
    }
});



async function updateNews(source = defaultSource){
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=96d3fcf7333d425a8729c979c9d054ff`;
    const res = await fetch(url);
    const json = await res.json();

    try{
        main.innerHTML = json.articles.map(createArticle).join('\n');
    }catch(error){

    }

}

async function updateSources(){
    const url = 'https://newsapi.org/v2/sources?apiKey=96d3fcf7333d425a8729c979c9d054ff';
    const res = await fetch(url);
    const json = await res.json();

    source.innerHTML = json.sources.map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}

function createArticle(article){
    return `<div class="article"
                <a href="${article.url}">
                    <h2>${article.title}</h2>
                    <img src="${article.urlToImage}">
                    <p>${article.description}</p>
                </a>
            </div>`
}