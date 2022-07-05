import { withMetamaskTest } from '@usedapp/example/playwright/with-metamask'
import { withoutMetamaskTest } from '@usedapp/example/playwright/without-metamask'
import { baseUrl } from './constants'

withMetamaskTest(baseUrl)
withoutMetamaskTest(baseUrl)
