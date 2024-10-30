import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function fetcher(
  url: string,
  method: string,
  body?: unknown,
) {
  try {
    const headers: HeadersInit = {};
    if (body instanceof FormData) {
    } else if (body) {
      headers['Content-Type'] = 'application/json';
    }

    let response = await fetch(BASE_URL + url, {
      method: method,
      headers: {
        ...headers,
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
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
        const data = await refreshRes.json();
        localStorage.setItem('accessToken', data.accessToken);

        response = await fetch(BASE_URL + url, {
          method: method,
          headers: {
            ...headers,
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
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
    toast.error('알 수 없는 오류가 발생했습니다.');
    window.location.href = '/signin';
  }
}
