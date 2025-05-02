
const url = 'http://localhost:3030/auth/login'
const TOKEN_KEY = '@AUTH_TOKEN'

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function logoff() {
    localStorage.removeItem(TOKEN_KEY)
}

export async function login(username: string, password: string) {

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })

    const data = await response.json()

    if (data && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token)
        return true
    }

    return false
}