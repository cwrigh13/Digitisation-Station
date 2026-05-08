# Upload to GitHub - Simplified Guide (Recommended Method)

## The Easiest Way: Use GitHub Desktop

This is the **fastest and easiest** way to upload all your files at once without using terminal commands.

---

## Step 1: Download GitHub Desktop

1. Go to: **https://desktop.github.com/**
2. Click "Download for Windows"
3. Run the installer
4. Sign in with your GitHub account (username: **cwrigh13**)

---

## Step 2: Clone Your Repository

1. In GitHub Desktop, click **"File"** → **"Clone repository"**
2. Click the **"GitHub.com"** tab
3. Find **"cwrigh13/Digitisation-Station"** in the list
4. Choose where to save it (e.g., `C:\Users\YourName\Documents\GitHub\`)
5. Click **"Clone"**

A folder will be created on your PC with the repository.

---

## Step 3: Copy Your Files

1. **Open File Explorer**
2. Navigate to where you downloaded the Digitisation-Station folder (from Claude)
3. **Select ALL files and folders** inside it
4. **Copy** (Ctrl+C)
5. Navigate to the cloned repository folder (from Step 2)
6. **Paste** (Ctrl+V)
7. Say **"Yes"** to overwrite if asked

---

## Step 4: Commit and Push

1. Go back to **GitHub Desktop**
2. You'll see a list of all changed files on the left
3. At the bottom left, add a commit message:
   ```
   Initial commit: Complete Digitisation Station Dashboard
   ```
4. Click the blue **"Commit to main"** button
5. Click **"Push origin"** (button at the top)

**Done!** Your files are now on GitHub! 🎉

---

## Step 5: Enable GitHub Pages

1. Open your browser
2. Go to: **https://github.com/cwrigh13/Digitisation-Station**
3. Click **"Settings"** (tab at the top)
4. Click **"Pages"** (left sidebar)
5. Under **"Source"**, select: **"GitHub Actions"**
6. Click **"Actions"** tab (top of page)
7. Watch the deployment workflow run (takes 2-5 minutes)

---

## Step 6: View Your Live Site

Once the workflow shows a green checkmark:

**Your dashboard is live at:**
**https://cwrigh13.github.io/Digitisation-Station**

---

## Future Updates (Super Easy!)

### Update Photos or Content:

1. Open the repository folder on your PC (where you cloned it)
2. Edit files or replace images
3. Open GitHub Desktop
4. It will show your changes
5. Add commit message
6. Click "Commit to main"
7. Click "Push origin"
8. GitHub automatically rebuilds and redeploys! ✨

---

## Troubleshooting

### Can't find the repository in GitHub Desktop?
- Make sure you're signed in to the correct GitHub account
- Try clicking "File" → "Clone repository" → "URL" tab
- Enter: `https://github.com/cwrigh13/Digitisation-Station`

### Push button is grayed out?
- Make sure you've clicked "Commit to main" first
- Check that you have internet connection

### Deployment failing?
- Go to the Actions tab on GitHub
- Click on the failed workflow
- Read the error message (usually a missing file or typo)

---

## That's It!

This method is:
- ✅ **No terminal required**
- ✅ **No command line knowledge needed**
- ✅ **Visual interface** for everything
- ✅ **Easy updates** in the future
- ✅ **Automatic deployment** to GitHub Pages

**Next:** Read `GITHUB_PAGES_GUIDE.md` for full details on GitHub Pages deployment and customization.
