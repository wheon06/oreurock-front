const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function fetcher(
  url: string,
  method: string,
  body?: unknown,
) {
  const defaultHeader = {
    'Content-Type': 'application/json',
  };

  try {
    let response = await fetch(BASE_URL + url, {
      method: method,
      headers: {
        ...defaultHeader,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      const refreshRes = await fetch(BASE_URL + '/auth/refreshAccessToken', {
        headers: { ...defaultHeader, Authorization: 'Bearer ' + refreshToken },
      });
      if (refreshRes.status === 401) window.location.href = 'signin';
      response = await fetch(BASE_URL + url, {
        method: method,
        headers: {
          ...defaultHeader,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
    }

    return response;
  } catch (e) {
    console.error('Fetch Error:' + e);
    throw new Error();
  }
}
