
export async function getNews(country) {
  let url = country?`https://newsapi.org/v2/top-headlines?language=en&country=${country}&apiKey=b84166fa08d94634a8f0b29d5314afba`:
  `https://newsapi.org/v2/top-headlines?language=en&apiKey=b84166fa08d94634a8f0b29d5314afba`;

  let result = await fetch(url).then(response => response.json());
  return result.articles;
}

