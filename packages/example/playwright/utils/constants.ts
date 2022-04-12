export const baseUrl = 'http://localhost:8080/'

export const headless = !!process.env.CI // use false for debugging/developing

export const slowMo = process.env.CI ? 0 : 200

export const waitUntil = 'load'
