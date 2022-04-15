export const headless = !!process.env.CI // use false for debugging/developing

export const slowMo = process.env.CI ? 0 : 500

export const waitUntil = 'load'
