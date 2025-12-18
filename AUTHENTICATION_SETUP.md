# FillGenie Website Authentication Setup

## Overview

The FillGenie website now has a complete authentication system that connects to the same AWS backend used by the Chrome extension and dashboard. Users can register on the website and immediately use their account across all three platforms.

## What's Been Implemented

### 1. Authentication Context (`src/contexts/AuthContext.tsx`)

A React context that manages authentication state across the entire application:

- **State Management**: Tracks user data, JWT token, and authentication status
- **Persistence**: Stores auth data in `localStorage` to persist across page reloads
- **Auto-restoration**: Automatically restores user session on app mount
- **Functions**:
  - `login(email, password)` - Authenticates user and stores token
  - `register(email, password, fullName?)` - Creates new user account
  - `logout()` - Clears auth data and logs out user

### 2. Login/Register Page (`src/pages/Login.tsx`)

A modern, responsive login/register form:

- **Toggle Mode**: Switch between login and registration
- **Form Validation**: Email and password requirements
- **Error Handling**: Displays backend error messages
- **Loading States**: Shows loading indicator during API calls
- **Auto-redirect**: Redirects to previous page after successful login
- **Mobile Responsive**: Works perfectly on all screen sizes

**Features for New Users**:
- Optional full name field
- Password strength hint
- Information about free tier benefits
- Links to Terms of Service and Privacy Policy

### 3. Protected Routes (`src/components/auth/ProtectedRoute.tsx`)

A route wrapper that requires authentication:

- **Auto-redirect**: Sends unauthenticated users to login page
- **Return URL**: Remembers where user was going and redirects back after login
- **Loading State**: Shows spinner while checking authentication
- **Usage**: Wraps any page that requires login (e.g., Dashboard)

### 4. Updated Header (`src/components/layout/Header.tsx`)

Dynamic navigation based on authentication state:

**When Not Logged In**:
- Login button → `/login`
- Try for Free button → `/coming-soon`

**When Logged In**:
- My Dashboard button → `/dashboard`
- Logout icon button (with confirmation)

**Mobile Menu**: Includes same functionality for mobile users

### 5. Dashboard Page (`src/pages/Dashboard.tsx`)

A placeholder dashboard showing user information:

- **Welcome Message**: Personalized greeting with user's name
- **Account Info**: Displays email, user ID, S3 prefix, and Pinecone namespace
- **Coming Soon Features**: Preview of upcoming functionality
- **Getting Started Guide**: Steps to start using FillGenie

## How It Works

### User Registration Flow

1. User visits `/login` and clicks "Sign up"
2. User fills in email, password, and optional full name
3. Frontend calls `POST /api/v1/auth/register` with credentials
4. **Backend automatically provisions**:
   - S3 bucket prefix: `users/{user_id}/`
   - Pinecone namespace: `user_{user_id}`
   - PostgreSQL schema: `user_{user_id}` with tables
5. Backend returns JWT token and user data
6. Frontend stores token in `localStorage`
7. User is redirected to home page (or previous page)
8. Header now shows "My Dashboard" button

### Login Flow

1. User visits `/login`
2. User enters email and password
3. Frontend calls `POST /api/v1/auth/login`
4. Backend validates credentials and returns JWT token
5. Frontend stores token and user data
6. User is redirected to previous page or home
7. Auth state persists across page reloads

### Logout Flow

1. User clicks logout icon in header
2. Frontend calls `logout()` function
3. Token and user data removed from `localStorage`
4. User state cleared from context
5. Header reverts to showing Login button
6. Accessing protected routes redirects to login

## API Integration

### Backend Endpoints

The frontend connects to these API endpoints:

```typescript
// Base URL (configurable via environment variable)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Register
POST /api/v1/auth/register
Body: { email, password, full_name? }
Returns: { access_token, token_type, expires_in, user }

// Login
POST /api/v1/auth/login
Body: { email, password }
Returns: { access_token, token_type, expires_in, user }
```

### User Object Structure

```typescript
interface User {
  id: string;                    // UUID
  email: string;
  full_name?: string;
  s3_bucket_prefix?: string;     // users/{uuid}/
  pinecone_namespace?: string;   // user_{uuid}
  is_active?: boolean;
}
```

### JWT Token

- **Storage**: `localStorage.getItem('authToken')`
- **Header**: `Authorization: Bearer {token}`
- **Expiration**: 15 minutes (configurable on backend)
- **Usage**: Include in all authenticated API requests

## Environment Configuration

### Development Setup

1. Create `.env` file in `fillgenie-site/` directory:

```bash
# API Base URL
VITE_API_URL=http://localhost:8000
```

2. Make sure backend is running on `http://localhost:8000`

### Production Setup

For Vercel deployment, set environment variable:

```bash
VITE_API_URL=https://api.fillgenie.com
```

**Important**: The API URL must include the protocol (`http://` or `https://`) but should NOT include a trailing slash.

## Testing the Authentication

### Test User Registration

1. Start the development server:
```bash
cd fillgenie-site
npm run dev
```

2. Navigate to `http://localhost:5173/login`

3. Click "Sign up" and fill in:
   - Email: `test@example.com`
   - Password: `TestPass123!`
   - Full Name: `Test User` (optional)

4. Click "Create Account"

5. Check browser console for successful registration

6. Verify you're redirected and header shows "My Dashboard"

### Verify Backend Connection

Open browser DevTools Network tab:

1. Look for POST request to `/api/v1/auth/register`
2. Check Response tab for user data and token
3. Check Application → Local Storage for `authToken` and `authUser`

### Test Login Persistence

1. After logging in, refresh the page
2. Header should still show "My Dashboard"
3. Navigate to `/dashboard` - should work without redirect
4. Open new tab → Header should show logged in state

### Test Protected Routes

1. Log out (click logout icon)
2. Try to access `/dashboard` directly
3. Should redirect to `/login`
4. After logging in, should redirect back to `/dashboard`

## AWS Resources Provisioned

When a user registers, the backend automatically creates:

### 1. S3 Bucket Prefix
```
s3://fillgenie-documents/users/{user_id}/
```
- Used for storing uploaded documents
- Isolated per user
- Encrypted with AES-256

### 2. Pinecone Namespace
```
user_{user_id_without_dashes}
```
- Used for storing vector embeddings
- Complete isolation between users
- 3072 dimensions (OpenAI text-embedding-3-large)

### 3. PostgreSQL Schema
```
user_{user_id_without_dashes}
```
- Contains tables: documents, chunks, entities, form_sessions, forms
- Schema-level isolation
- Automatic table creation

**No additional AWS setup needed** - these are logical namespaces within shared resources.

## Cross-Platform Compatibility

### Same Account, Three Platforms

Users can register on the website and immediately use:

1. **Website** (`fillgenie.com`)
   - Register/login
   - View dashboard
   - Manage account

2. **Chrome Extension**
   - Login with same credentials
   - Access same documents
   - Fill forms using stored data

3. **Dashboard App** (separate React app)
   - Login with same credentials
   - Manage documents
   - View analytics

All three use the same JWT authentication and AWS resources.

## Security Features

### Password Security
- Passwords hashed with bcrypt on backend
- Never stored in plaintext
- Min 8 characters recommended (enforced on backend)

### Token Security
- JWT tokens expire after 15 minutes
- Stored in localStorage (XSS risk mitigated by CSP)
- Sent via Authorization header only
- HTTPS required in production

### CORS Protection
- Backend validates origin
- Only allowed domains can make requests
- Configure `CORS_ORIGINS` environment variable on backend

### Data Isolation
- Each user has separate AWS resources
- No cross-user data access possible
- Backend enforces user_id validation on all requests

## Common Issues & Solutions

### Issue: "Failed to fetch" or Network Error

**Cause**: Backend not running or wrong API URL

**Solution**:
1. Check backend is running: `curl http://localhost:8000/health`
2. Verify `.env` has correct `VITE_API_URL`
3. Check browser console for CORS errors
4. Ensure backend CORS allows your frontend origin

### Issue: "401 Unauthorized" on Protected Routes

**Cause**: Token expired or invalid

**Solution**:
1. Check localStorage has `authToken`
2. Decode JWT to check expiration (jwt.io)
3. Log out and log back in
4. Clear localStorage if corrupted

### Issue: User Can't Log In After Registration

**Cause**: Backend database not accessible or user creation failed

**Solution**:
1. Check backend logs for errors
2. Verify PostgreSQL is running
3. Ensure backend environment variables are set
4. Test registration endpoint directly with curl

### Issue: Header Doesn't Update After Login

**Cause**: AuthContext not wrapping app or state not updating

**Solution**:
1. Verify `<AuthProvider>` wraps `<Router>` in App.tsx
2. Check React DevTools for AuthContext state
3. Ensure Header imports `useAuth()` hook
4. Clear browser cache and reload

### Issue: Login Persists Across Browser Restarts

**Cause**: localStorage persists data indefinitely

**Solution**: This is expected behavior. To implement auto-logout:
1. Add token expiration check in AuthContext
2. Set timeout to clear auth when token expires
3. Implement refresh token flow (optional)

## Next Steps

### Immediate Tasks

1. **Set Up Backend API**:
   - [ ] Verify backend is running
   - [ ] Check S3 bucket exists
   - [ ] Check Pinecone index exists
   - [ ] Test registration endpoint

2. **Configure Environment**:
   - [ ] Create `.env` with `VITE_API_URL`
   - [ ] Update CORS origins on backend
   - [ ] Test cross-origin requests

3. **Test Authentication**:
   - [ ] Register test user
   - [ ] Verify AWS resources created
   - [ ] Test login/logout
   - [ ] Test session persistence

### Future Enhancements

- [ ] Email verification before allowing document uploads
- [ ] Password reset flow (forgot password)
- [ ] Refresh token implementation for longer sessions
- [ ] Remember me checkbox (30-day session)
- [ ] OAuth/SSO (Google, Microsoft, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Account deletion with AWS cleanup
- [ ] Usage quota tracking and enforcement
- [ ] User profile editing
- [ ] Subscription management (Stripe integration)

## File Structure

```
fillgenie-site/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx          # Auth state management
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx   # Protected route wrapper
│   │   └── layout/
│   │       └── Header.tsx           # Updated with auth UI
│   ├── pages/
│   │   ├── Login.tsx                # Login/Register page
│   │   └── Dashboard.tsx            # User dashboard
│   └── App.tsx                      # Updated with AuthProvider
├── .env                             # Environment variables
└── .env.example                     # Environment template
```

## Support

For issues or questions:
- Email: fillgenie@gmail.com
- GitHub: [MichaelCrosson/FillGenie-Website](https://github.com/MichaelCrosson/FillGenie-Website)
- Documentation: See `AWS_USER_RESOURCES_GUIDE.md` for backend details

---

**Status**: ✅ Authentication system complete and ready for backend integration
