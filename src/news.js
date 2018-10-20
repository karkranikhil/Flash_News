
export async function getNews(country) {
  let url = country?`https://newsapi.org/v2/top-headlines?language=en&country=${country}&apiKey=<YOUR_API_KEY>`:
  `https://newsapi.org/v2/top-headlines?language=en&apiKey=<YOUR_API_KEY>`;

  let result = await fetch(url).then(response => response.json());
  return result.articles;
}

