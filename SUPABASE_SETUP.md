# Supabase Setup Guide for CTRL

This guide will help you set up Supabase authentication for your CTRL website.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up for an account
2. Click "New Project"
3. Choose your organization (or create one)
4. Enter project details:
   - **Name**: `ctrl-website`
   - **Database Password**: Choose a strong password
   - **Region**: Choose the closest to your users
5. Click "Create new project"

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## Step 3: Update Your Code

1. Open `/Users/amandaramirez/ctrl/js/auth.js`
2. Replace the placeholder values:

```javascript
// Replace these lines in auth.js
this.supabase = supabase.createClient(
  'YOUR_SUPABASE_URL', // Replace with your Project URL
  'YOUR_SUPABASE_ANON_KEY' // Replace with your Anon public key
);
```

With your actual values:

```javascript
this.supabase = supabase.createClient(
  'https://your-project-id.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
);
```

## Step 4: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Site URL**, add your website URL (e.g., `https://yourdomain.com`)
3. Under **Redirect URLs**, add:
   - `https://yourdomain.com`
   - `https://yourdomain.com/dashboard.html`
   - `http://localhost:3000` (for local development)

## Step 5: Enable Google OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Enable **Google** provider
3. You'll need to:
   - Create a Google Cloud Console project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your Supabase redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`

## Step 6: Set Up Database Tables (Optional)

If you want to store additional user profile data, you can create a `profiles` table:

1. Go to **Table Editor** in your Supabase dashboard
2. Click "New Table"
3. Create a table with these columns:
   - `id` (uuid, primary key, default: `gen_random_uuid()`)
   - `user_id` (uuid, foreign key to auth.users)
   - `full_name` (text)
   - `venture_name` (text)
   - `bio` (text)
   - `website` (text)
   - `category` (text)
   - `created_at` (timestamp, default: `now()`)
   - `updated_at` (timestamp, default: `now()`)

## Step 7: Test Your Setup

1. Open your website in a browser
2. Click "Sign In" in the navigation
3. Try creating a new account
4. Check if you can sign in and access the dashboard

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Double-check your Project URL and Anon key
   - Make sure there are no extra spaces or characters

2. **"Invalid redirect URL" error**
   - Add your website URL to the Redirect URLs in Supabase settings
   - Make sure the URL matches exactly (including http vs https)

3. **Google OAuth not working**
   - Verify your Google Cloud Console setup
   - Check that the redirect URL in Google matches your Supabase callback URL

4. **Dashboard not loading**
   - Make sure the user is authenticated
   - Check browser console for JavaScript errors

### Getting Help:

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)

## Security Notes

- Never commit your Supabase credentials to version control
- Use environment variables in production
- Consider using Row Level Security (RLS) for database tables
- Regularly rotate your API keys

## Next Steps

Once authentication is working, you can:

1. Add user profile management
2. Implement role-based access control
3. Add real-time features
4. Set up email templates
5. Add social login providers
6. Implement user analytics

Your CTRL website now has a complete authentication system! 🎉

