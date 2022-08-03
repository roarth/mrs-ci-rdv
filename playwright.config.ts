import { PlaywrightTestConfig } from '@playwright/test'
require('dotenv').config()

const config: PlaywrightTestConfig = {
  reporter: [['list'], ['html', { open: 'never' }]],
}
export default config
