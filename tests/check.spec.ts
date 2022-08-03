import { expect, test } from '@playwright/test'

const URL = process.env.RDV_FORM_URL || 'https://eservices.marseille.fr/allombmdp'
const USER_EMAIL = process.env.USER_EMAIL || ''
const USER_LAST_NAME = process.env.USER_LAST_NAME || ''
const USER_FIRST_NAME = process.env.USER_FIRST_NAME || ''
const USER_CIVILITY = process.env.USER_CIVILITY || 'Monsieur'
const USER_PHONE = process.env.USER_PHONE || ''
const PERSONS_NUMBER = process.env.PERSONS_NUMBER || '1'

test('Check RDV Form is available', async ({ page }) => {
  await page.goto(URL)
  await page.locator('#edit-civilite').selectOption(USER_CIVILITY === 'Monsieur' ? '2' : '1')
  await page.locator('#edit-nom').type(USER_LAST_NAME)
  await page.locator('#edit-prenom').type(USER_FIRST_NAME)
  await page.locator('#edit-email').type(USER_EMAIL)
  await page.locator('#edit-conf-email').type(USER_EMAIL)
  await page.locator('#edit-telport').type(USER_PHONE)
  await page.locator('#edit-nbpersonnes').selectOption(PERSONS_NUMBER)

  await page.locator('#edit-suivant').click()
  await page.waitForTimeout(1000)

  const pageContent = await page.locator('.corps-form').innerText()
  expect(pageContent).toContain("Aucun créneau n'est disponible sur les 3 prochains mois")
})
