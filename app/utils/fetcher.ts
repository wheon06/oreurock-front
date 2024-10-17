const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function fetcher(url: string, method: string, body?: any) {
  try {
    const headers: HeadersInit = {};
    if (body instanceof FormData) {
    } else if (body) {
      headers['Content-Type'] = 'application/json';
    }

    let response = await fetch(BASE_URL + url, {
      method: method,
      headers: headers,
      body:
        body instanceof FormData
          ? body
          : body
            ? JSON.stringify(body)
            : undefined,
    });

    // 401 Unauthorized 응답 확인
    if (response.status === 401) {
      if (url !== '/auth/signin') {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshRes = await fetch(BASE_URL + '/auth/refreshAccessToken', {
          headers: {
            Authorization: 'Bearer ' + refreshToken,
          },
        });
        if (refreshRes.status === 401) window.location.href = 'signin';

        // 토큰을 새로고침한 후 원래 요청을 다시 시도
        response = await fetch(BASE_URL + url, {
          method: method,
          headers: headers,
          body:
            body instanceof FormData
              ? body
              : body
                ? JSON.stringify(body)
                : undefined,
        });
      }
    }

    return response;
  } catch (e) {
    console.error('Fetch Error:' + e);
    throw new Error();
  }
}
