const BASE_URL = process.env.BASE_URL;

export default async function fetcher(
  url: string,
  method: string,
  body?: unknown,
) {
  const defaultHeader = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(BASE_URL + url, {
      method: method,
      headers: {
        ...defaultHeader,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      // refreshToken 재 인증
    }
  } catch (e) {
    console.error('Fetch Error:' + e);
    throw new Error();
  }
}
