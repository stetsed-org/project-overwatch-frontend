// utils/cookies.ts

export function getCookie(name: string): string | null {
  const cookieStr = document.cookie;
  if (!cookieStr) {
    return null;
  }

  const cookies = cookieStr.split(';');
  const cookie = cookies.find(c => c.trim().startsWith(name + '='));
  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split('=')[1]);
}

