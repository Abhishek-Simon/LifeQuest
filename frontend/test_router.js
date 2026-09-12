const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Clear local storage first
  await page.goto('http://localhost:5173/');
  await page.evaluate(() => localStorage.clear());

  // CASE 1: Unauthenticated
  console.log("CASE 1: Visit /onboarding/ambition while logged out");
  await page.goto('http://localhost:5173/onboarding/ambition');
  await page.waitForTimeout(500);
  console.log("Result URL:", page.url());

  // Set mock auth state for incomplete onboarding
  await page.evaluate(() => {
    localStorage.setItem('lq_mock_auth', JSON.stringify({
      isAuthenticated: true,
      user: { name: "Test", email: "test@test.com", hasCompletedOnboarding: false }
    }));
  });

  // CASE 3: Authenticated + incomplete
  console.log("CASE 3: Visit /onboarding/ambition while authenticated + incomplete");
  await page.goto('http://localhost:5173/onboarding/ambition');
  await page.waitForTimeout(500);
  console.log("Result URL:", page.url());

  // CASE 4: Visit /onboarding/goal
  console.log("CASE 4: Visit /onboarding/goal while authenticated + incomplete");
  await page.goto('http://localhost:5173/onboarding/goal');
  await page.waitForTimeout(500);
  console.log("Result URL:", page.url());

  // CASE 6: Authenticated + complete
  await page.evaluate(() => {
    localStorage.setItem('lq_mock_auth', JSON.stringify({
      isAuthenticated: true,
      user: { name: "Test", email: "test@test.com", hasCompletedOnboarding: true }
    }));
  });
  console.log("CASE 6: Visit /onboarding/ambition while authenticated + complete");
  await page.goto('http://localhost:5173/onboarding/ambition');
  await page.waitForTimeout(500);
  console.log("Result URL:", page.url());

  await browser.close();
})();
