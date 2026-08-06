const CREDS_KEY = 'fritz-admin-creds-v1'

export type AdminCreds = {
  username: string
  password: string
}

export const defaultAdminCreds: AdminCreds = {
  username: 'Fritz',
  password: 'Pruebas123',
}

export function loadAdminCreds(): AdminCreds {
  try {
    const raw = localStorage.getItem(CREDS_KEY)
    if (!raw) return { ...defaultAdminCreds }
    const parsed = JSON.parse(raw) as Partial<AdminCreds>
    return {
      username: String(parsed.username || defaultAdminCreds.username).trim() || defaultAdminCreds.username,
      password: String(parsed.password || defaultAdminCreds.password),
    }
  } catch {
    return { ...defaultAdminCreds }
  }
}

export function saveAdminCreds(next: AdminCreds) {
  localStorage.setItem(
    CREDS_KEY,
    JSON.stringify({
      username: next.username.trim(),
      password: next.password,
    }),
  )
}

export function verifyAdminLogin(username: string, password: string) {
  const creds = loadAdminCreds()
  return (
    username.trim().toLowerCase() === creds.username.toLowerCase() && password === creds.password
  )
}
