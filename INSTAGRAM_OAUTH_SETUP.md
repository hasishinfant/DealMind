# Instagram OAuth Setup Guide

## Overview
DealMind uses Instagram OAuth for authentication. Follow these steps to set up Instagram OAuth for your app.

## Demo Mode
By default, the app runs in **demo mode** with mock authentication. You can click "Continue with Instagram" and it will automatically log you in without real OAuth.

## Production Setup

### Step 1: Create a Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Select "Consumer" as the app type
4. Fill in your app details

### Step 2: Add Instagram Basic Display
1. In your Facebook App dashboard, go to "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Click "Create New App" in the Instagram Basic Display section
4. Fill in the required fields:
   - **Display Name**: DealMind
   - **Privacy Policy URL**: Your privacy policy URL
   - **User Data Deletion URL**: Your data deletion callback URL

### Step 3: Configure OAuth Settings
1. In Instagram Basic Display settings, add:
   - **Valid OAuth Redirect URIs**: 
     - `http://localhost:3001/api/auth/callback` (for development)
     - `https://yourdomain.com/api/auth/callback` (for production)
   - **Deauthorize Callback URL**: `https://yourdomain.com/api/auth/deauthorize`
   - **Data Deletion Request URL**: `https://yourdomain.com/api/auth/delete`

### Step 4: Get Your Credentials
1. In the "Basic Display" section, you'll find:
   - **Instagram App ID** (Client ID)
   - **Instagram App Secret** (Client Secret)
2. Copy these values

### Step 5: Update Environment Variables
Update your `.env.local` file:

```bash
# Instagram OAuth
INSTAGRAM_CLIENT_ID=your_actual_instagram_app_id
INSTAGRAM_CLIENT_SECRET=your_actual_instagram_app_secret
NEXT_PUBLIC_INSTAGRAM_CLIENT_ID=your_actual_instagram_app_id
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Step 6: Add Test Users (Development)
1. In Instagram Basic Display settings, go to "User Token Generator"
2. Add Instagram test users
3. These users can log in during development

### Step 7: Submit for Review (Production)
Before going live, you need to submit your app for Instagram review:
1. Complete the App Review process
2. Request permissions: `user_profile`, `user_media`
3. Provide screencast and detailed use case

## Testing

### Demo Mode (Default)
- No setup required
- Click "Continue with Instagram" on login page
- Automatically logs in with demo credentials

### Development Mode
- Set up Instagram OAuth as described above
- Use test users added in Step 6
- Test the full OAuth flow

### Production Mode
- Complete App Review
- Use real Instagram accounts
- Monitor OAuth errors in logs

## Troubleshooting

### "Invalid OAuth Redirect URI"
- Ensure the redirect URI in your Facebook App matches exactly: `http://localhost:3001/api/auth/callback`
- Check for trailing slashes

### "App Not Set Up"
- Make sure Instagram Basic Display is added to your Facebook App
- Verify all required fields are filled

### "User Not Authorized"
- In development, only test users can log in
- Add users in the "User Token Generator" section

### Demo Mode Not Working
- Clear browser cookies
- Check browser console for errors
- Verify `.env.local` has placeholder values

## Security Notes

1. **Never commit** `.env.local` to version control
2. **Use HTTPS** in production
3. **Rotate secrets** regularly
4. **Monitor** OAuth callback logs for suspicious activity
5. **Implement rate limiting** on auth endpoints

## Resources

- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook App Review Process](https://developers.facebook.com/docs/app-review)
- [OAuth 2.0 Best Practices](https://oauth.net/2/)
