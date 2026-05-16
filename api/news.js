// api/news.js — News API endpoint
// Set NEWS_API_KEY in your Vercel environment variables

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      return res.status(response.status).json({ error: data.message || 'News API error' });
    }

    return res.status(200).json({ articles: data.articles || [] });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
