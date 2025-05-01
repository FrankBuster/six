require('dotenv').config();
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const INSTAGRAM_USERNAME = process.env.IG_USERNAME;
const INSTAGRAM_PASSWORD = process.env.IG_PASSWORD;
const COOKIES_PATH = path.join(__dirname, 'cookies.json');

let browser = null;
let page = null;
let isInitializing = false;

async function saveCookies(page) {
  try {
    const cookies = await page.cookies();
    await fs.promises.writeFile(COOKIES_PATH, JSON.stringify(cookies, null, 2));
    console.log('Cookies saved successfully');
  } catch (error) {
    console.error('Error saving cookies:', error);
  }
}

async function loadCookies(page) {
  try {
    if (fs.existsSync(COOKIES_PATH)) {
      const cookiesString = await fs.promises.readFile(COOKIES_PATH);
      const cookies = JSON.parse(cookiesString);
      await page.setCookie(...cookies);
      console.log('Cookies loaded successfully');
      return true;
    }
    console.log('No cookies file found');
    return false;
  } catch (error) {
    console.error('Error loading cookies:', error);
    return false;
  }
}

async function isLoggedIn(page) {
  try {
    await page.goto('https://www.instagram.com/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Check for login button or login form
    const loginButton = await page.$('a[href="/accounts/login/"]');
    const loginForm = await page.$('input[name="username"]');
    
    if (loginButton || loginForm) {
      console.log('Not logged in - login button/form found');
      return false;
    }
    
    // Check for profile button to confirm login
    const profileButton = await page.$('a[href="/' + INSTAGRAM_USERNAME + '/"]');
    if (profileButton) {
      console.log('Logged in - profile button found');
      return true;
    }
    
    console.log('Login status unclear');
    return false;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}

async function performLogin(page) {
  try {
    console.log('Starting login process...');
    await page.goto('https://www.instagram.com/accounts/login/', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for login form
    await page.waitForSelector('input[name="username"]', { timeout: 10000 });
    console.log('Login form found, entering credentials...');
    
    // Clear any existing text in the inputs
    await page.evaluate(() => {
      document.querySelector('input[name="username"]').value = '';
      document.querySelector('input[name="password"]').value = '';
    });
    
    // Enter credentials
    await page.type('input[name="username"]', INSTAGRAM_USERNAME, { delay: 100 });
    await page.type('input[name="password"]', INSTAGRAM_PASSWORD, { delay: 100 });
    
    // Click login button and wait for navigation
    console.log('Submitting login form...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }),
      page.click('button[type="submit"]')
    ]);
    
    // Handle "Save Your Login Info?" popup
    try {
      console.log('Checking for save login info popup...');
      await page.waitForSelector('button._acan._acap._acas._aj1-', { timeout: 5000 });
      await page.click('button._acan._acap._acas._aj1-');
      console.log('Handled save login info popup');
    } catch (e) {
      console.log('No save login info popup found');
    }

    // Handle "Turn on Notifications?" popup
    try {
      console.log('Checking for notifications popup...');
      await page.waitForSelector('button._a9--._a9_1', { timeout: 5000 });
      await page.click('button._a9--._a9_1');
      console.log('Handled notifications popup');
    } catch (e) {
      console.log('No notifications popup found');
    }

    // Verify login success
    const loggedIn = await isLoggedIn(page);
    if (loggedIn) {
      console.log('Login successful, saving cookies...');
      await saveCookies(page);
      return true;
    } else {
      console.log('Login verification failed');
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}

async function initializeBrowser() {
  if (isInitializing) {
    console.log('Browser initialization already in progress...');
    return;
  }

  isInitializing = true;
  
  try {
    if (!browser) {
      console.log('Initializing new browser...');
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox'],
      });
      page = await browser.newPage();
      
      // Set default timeout
      page.setDefaultTimeout(30000);
      
      // Try to load cookies first
      const cookiesLoaded = await loadCookies(page);
      let loggedIn = false;
      
      if (cookiesLoaded) {
        console.log('Checking if cookies are still valid...');
        loggedIn = await isLoggedIn(page);
        
        if (!loggedIn) {
          console.log('Cookies expired or invalid, performing fresh login...');
          // Delete invalid cookies
          if (fs.existsSync(COOKIES_PATH)) {
            fs.unlinkSync(COOKIES_PATH);
            console.log('Deleted invalid cookies');
          }
        }
      }
      
      if (!loggedIn) {
        console.log('Need to perform fresh login...');
        loggedIn = await performLogin(page);
      }
      
      if (!loggedIn) {
        throw new Error('Failed to initialize browser and login');
      }
      
      console.log('Browser initialized and logged in successfully');
    }
  } catch (error) {
    console.error('Error initializing browser:', error);
    if (browser) {
      await browser.close();
      browser = null;
      page = null;
    }
    throw error;
  } finally {
    isInitializing = false;
  }
}

async function followUser(targetUsername) {
  console.log(`Attempting to follow ${targetUsername}...`);
  
  try {
    // Ensure we're logged in before proceeding
    const loggedIn = await isLoggedIn(page);
    if (!loggedIn) {
      console.log('Session expired, re-logging in...');
      await performLogin(page);
    }

    // Go to user's profile
    await page.goto(`https://www.instagram.com/${targetUsername}/`, { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for the profile to load
    await page.waitForSelector('header section', { timeout: 10000 });

    // Check if user exists
    const userNotFound = await page.evaluate(() => {
      const errorText = document.querySelector('h2')?.textContent;
      return errorText?.includes('Sorry, this page isn\'t available');
    });

    if (userNotFound) {
      throw new Error('User not found or account is private');
    }

    // Try multiple selectors for the follow button
    const buttonSelectors = [
      'button._acan._acap._acas._aj1-', // Primary follow button
      'button._acan._acap._acas',       // Alternative follow button
      'button[type="button"]',          // Generic button
      'header section button'           // Fallback to any button in header
    ];

    let followButton = null;
    let buttonText = '';

    for (const selector of buttonSelectors) {
      try {
        const buttons = await page.$$(selector);
        for (const btn of buttons) {
          buttonText = await page.evaluate(el => el.textContent.toLowerCase(), btn);
          if (buttonText.includes('follow')) {
            followButton = btn;
            console.log(`Found follow button with selector: ${selector}`);
            break;
          }
        }
        if (followButton) break;
      } catch (error) {
        console.log(`Selector ${selector} not found`);
      }
    }

    if (!followButton) {
      // Check if already following
      const isFollowing = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(btn => btn.textContent.toLowerCase().includes('following'));
      });

      if (isFollowing) {
        console.log('Already following this user');
        return true;
      }

      throw new Error('Could not find follow button');
    }

    // Click the follow button
    await followButton.click();
    console.log('Clicked follow button');

    // Wait for the button text to change
    await page.waitForFunction(
      () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(btn => btn.textContent.toLowerCase().includes('following'));
      },
      { timeout: 5000 }
    );

    console.log('Successfully followed user');
    return true;

  } catch (error) {
    console.error('Error in followUser:', error);
    throw error;
  }
}

app.post('/api/follow', async (req, res) => {
  const { targetUsername } = req.body;

  if (!targetUsername) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Initialize browser if not already done
    await initializeBrowser();

    // Try to follow the user
    const success = await followUser(targetUsername);

    if (success) {
      res.json({ 
        success: true, 
        message: `Successfully followed ${targetUsername}` 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: `Failed to follow ${targetUsername}` 
      });
    }

  } catch (error) {
    console.error('Error:', error);
    // If there's an error, try to reinitialize the browser
    if (browser) {
      await browser.close();
      browser = null;
      page = null;
    }
    res.status(500).json({ 
      error: error.message || 'An error occurred while processing your request. Please try again.' 
    });
  }
});

// Close browser when server shuts down
process.on('SIGINT', async () => {
  if (browser) {
    await browser.close();
  }
  process.exit();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
