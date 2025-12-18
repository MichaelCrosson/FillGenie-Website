# FillGenie AWS User Resources Guide

## Overview

FillGenie uses a **multi-tenant architecture** where each user gets isolated AWS resources. When users register on the website, they'll work seamlessly with both the extension and dashboard because they all share the same backend authentication and resource provisioning system.

---

## AWS Resources Per User

When a user is created, the system automatically provisions **3 isolated resources**:

### 1. **S3 Bucket Prefix** (Document Storage)
- **Format**: `users/{user_id}/`
- **Example**: `users/f90812cf-88b9-42f7-950a-06846beccf8b/`
- **Purpose**: Store user's uploaded documents (PDFs, images, etc.)
- **Bucket**: Shared bucket (`fillgenie-documents`) with per-user prefixes
- **Encryption**: AES-256 server-side encryption
- **Access**: User can only access their own prefix

### 2. **Pinecone Namespace** (Vector Database)
- **Format**: `user_{user_id_no_dashes}`
- **Example**: `user_f90812cf88b942f7950a06846beccf8b`
- **Purpose**: Store vector embeddings of document chunks for semantic search
- **Index**: Shared index (`fillgenie-chunks-v2`) with per-user namespaces
- **Isolation**: Complete namespace isolation - users can't access each other's vectors
- **Dimensions**: 3072 (OpenAI text-embedding-3-large)

### 3. **PostgreSQL Schema** (Database Tables)
- **Format**: `user_{user_id_no_dashes}`
- **Example**: `user_f90812cf88b942f7950a06846beccf8b`
- **Purpose**: Store user's documents, chunks, entities, forms, and sessions
- **Database**: Shared RDS PostgreSQL instance with per-user schemas
- **Tables per schema**: documents, chunks, entities, form_sessions, forms, etc.
- **Isolation**: PostgreSQL schema-level isolation

---

## User Registration Flow

### Current Registration Process (`UserService.create_user`)

Located in: `fillgenie-api/src/services/user_service.py`

```python
@staticmethod
async def create_user(
    db: Session,
    email: str,
    password: str,
    full_name: Optional[str] = None
) -> User:
```

**Steps performed automatically**:

1. **Generate User ID**: `UUID4` format
2. **Hash Password**: bcrypt with 72-byte truncation
3. **Generate S3 Prefix**: `users/{user_id}`
4. **Generate Pinecone Namespace**: `user_{user_id_no_dashes}`
5. **Generate DB Schema**: `user_{user_id_no_dashes}`
6. **Create User Record**: Insert into `users` table (main public schema)
7. **Initialize DB Schema**: Create PostgreSQL schema + tables
8. **Log Resources**: Record all generated resource identifiers

### User Table Structure (`src/models/user.py`)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    
    -- AWS Resources
    s3_bucket_prefix VARCHAR(255) UNIQUE NOT NULL,
    pinecone_namespace VARCHAR(255) UNIQUE NOT NULL,
    db_schema VARCHAR(255) UNIQUE,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    
    -- Usage Stats
    total_documents INTEGER DEFAULT 0,
    total_storage_bytes INTEGER DEFAULT 0,
    total_vectors INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Important Considerations for Website Integration

### ✅ **What Works Out of the Box**

1. **Shared Authentication System**
   - Website, extension, and dashboard all use the same JWT auth
   - API endpoint: `POST /api/v1/auth/register`
   - Token-based authentication with `localStorage` storage
   - Users created on website can immediately use extension/dashboard

2. **Automatic Resource Provisioning**
   - All AWS resources created during registration
   - No manual setup required
   - Resources ready for immediate use

3. **Same API Backend**
   - Website calls the same FastAPI backend
   - Endpoint: `http://localhost:8000/api/v1` (dev) or `https://api.fillgenie.com/api/v1` (prod)
   - All services (upload, form filling, etc.) work identically

### ⚠️ **What You Need to Know**

#### 1. **S3 Bucket Must Exist**

**Current Configuration** (`src/config.py`):
```python
s3_bucket: str = Field(..., description="S3 bucket for document storage")
```

**Required Environment Variable**:
```bash
S3_BUCKET=fillgenie-documents  # Must be created in AWS
```

**What to Check**:
- Does the S3 bucket `fillgenie-documents` exist in your AWS account?
- Does your IAM user/role have permissions for:
  - `s3:PutObject` (upload files)
  - `s3:GetObject` (download files)
  - `s3:DeleteObject` (delete files)
  - `s3:ListBucket` (list user files)

**S3 Bucket Policy Example**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT:user/fillgenie-api"
      },
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::fillgenie-documents/users/*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::YOUR_ACCOUNT:user/fillgenie-api"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::fillgenie-documents",
      "Condition": {
        "StringLike": {
          "s3:prefix": "users/*"
        }
      }
    }
  ]
}
```

#### 2. **Pinecone Index Must Exist**

**Current Configuration**:
```python
pinecone_index_name: str = Field(default="fillgenie-chunks-v2")
pinecone_dimension: int = Field(default=3072)
pinecone_metric: str = Field(default="cosine")
```

**Required Environment Variables**:
```bash
PINECONE_API_KEY=your-api-key
PINECONE_ENVIRONMENT=us-west1-gcp
PINECONE_INDEX_NAME=fillgenie-chunks-v2
```

**What to Check**:
- Does the Pinecone index `fillgenie-chunks-v2` exist?
- Is it configured with **3072 dimensions**? (for OpenAI text-embedding-3-large)
- Is it using **cosine** similarity metric?

**Create Pinecone Index** (if not exists):
```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="your-api-key")

pc.create_index(
    name="fillgenie-chunks-v2",
    dimension=3072,
    metric="cosine",
    spec=ServerlessSpec(
        cloud="aws",
        region="us-east-1"
    )
)
```

#### 3. **PostgreSQL Database Schema Permissions**

**Current Configuration**:
```python
database_url: str = Field(default="sqlite:///./fillgenie_test.db")
db_use_user_schemas: bool = Field(default=True)
db_schema_prefix: str = Field(default="user_")
```

**Required Environment Variables**:
```bash
DATABASE_URL=postgresql://fillgenie_admin:password@fillgenie-db.xxx.rds.amazonaws.com:5432/fillgenie
DATABASE_HOST=fillgenie-db.xxx.rds.amazonaws.com
DATABASE_USER=fillgenie_admin
DATABASE_PASSWORD=your-secure-password
```

**What to Check**:
- Does the PostgreSQL user have `CREATE SCHEMA` permission?
- Can the user create tables in custom schemas?
- Is the RDS instance accessible from your backend server?

**Grant Schema Creation Permission**:
```sql
-- Run as RDS master user
GRANT CREATE ON DATABASE fillgenie TO fillgenie_admin;

-- Or for specific schemas:
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA user_* TO fillgenie_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA user_* TO fillgenie_admin;
```

#### 4. **AWS Lambda for Document Processing** (Optional but Recommended)

**Current Setup**: `lambda_document_processor/`

**Purpose**: Automatically process documents when uploaded to S3
- Extracts text from PDFs, images, docs
- Chunks text for vector storage
- Generates embeddings
- Updates document status

**What to Check**:
- Is the Lambda function deployed?
- Is it triggered by S3 uploads to `users/` prefix?
- Does it have permissions to:
  - Read from S3
  - Write to DynamoDB (optional)
  - Call OpenAI API
  - Update Pinecone

**Lambda S3 Trigger Configuration**:
```json
{
  "LambdaFunctionConfigurations": [
    {
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {
        "Key": {
          "FilterRules": [
            {
              "Name": "prefix",
              "Value": "users/"
            }
          ]
        }
      }
    }
  ]
}
```

---

## Environment Variables Checklist

### Required for User Registration + AWS Integration

```bash
# Database (PostgreSQL RDS)
DATABASE_URL=postgresql://user:pass@host:5432/fillgenie
DATABASE_HOST=fillgenie-db.xxx.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_NAME=fillgenie
DATABASE_USER=fillgenie_admin
DATABASE_PASSWORD=your-password

# AWS Credentials
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# S3 Document Storage
S3_BUCKET=fillgenie-documents

# Pinecone Vector Database
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=us-west1-gcp
PINECONE_INDEX_NAME=fillgenie-chunks-v2

# OpenAI for Embeddings
OPENAI_API_KEY=your-openai-api-key
OPENAI_EMBEDDING_MODEL=text-embedding-3-large

# JWT Authentication
JWT_SECRET_KEY=your-secret-key-min-32-chars
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=15

# CORS (add your website domain)
CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173", "https://fillgenie.com"]
```

---

## User Lifecycle & Resource Management

### Registration → First Use Flow

1. **User signs up on website**
   ```
   POST /api/v1/auth/register
   {
     "email": "user@example.com",
     "password": "SecurePass123!",
     "full_name": "John Doe"
   }
   ```

2. **Backend creates resources**
   - User record in `public.users` table
   - S3 prefix: `users/{uuid}/`
   - Pinecone namespace: `user_{uuid}`
   - PostgreSQL schema: `user_{uuid}` (with tables)

3. **User logs in** (website, extension, or dashboard)
   ```
   POST /api/v1/auth/login
   {
     "email": "user@example.com",
     "password": "SecurePass123!"
   }
   ```
   Returns JWT token stored in `localStorage`

4. **User uploads first document**
   ```
   POST /api/v1/documents/upload
   Headers: Authorization: Bearer {token}
   Body: FormData with file
   ```
   - File stored to `s3://fillgenie-documents/users/{uuid}/document.pdf`
   - Record created in `user_{uuid}.documents` table
   - Lambda processes document (if enabled)
   - Text chunks stored in `user_{uuid}.chunks` table
   - Vector embeddings stored in Pinecone `user_{uuid}` namespace

5. **User fills form via extension**
   - Extension sends form fields + context
   - Backend queries Pinecone namespace `user_{uuid}`
   - Retrieves relevant chunks from user's documents
   - Fills form with extracted information
   - Stores form session in `user_{uuid}.form_sessions` table

### Storage Limits & Quotas

**Current Tracking** (in `users` table):
- `total_documents`: Count of uploaded documents
- `total_storage_bytes`: Total S3 storage used
- `total_vectors`: Total vectors in Pinecone

**Free Tier Limits** (from your pricing plan):
- 50 forms/month
- 10 documents
- Basic support

**Premium Tier**:
- Unlimited forms
- 100+ documents
- Priority processing

**How to Implement Limits**:
```python
# Check before allowing upload
if user.total_documents >= 10 and not user.is_premium:
    raise HTTPException(
        status_code=403,
        detail="Free tier limit reached. Upgrade to upload more documents."
    )
```

### User Deletion & Cleanup

**Soft Delete** (Current Implementation):
```python
await UserService.deactivate_user(db, user_id)
# Sets is_active = False
# User can no longer log in
# Data still exists
```

**Hard Delete** (Requires Manual Cleanup):
```python
# 1. Delete S3 files
s3_service.delete_user_files(user.s3_bucket_prefix)

# 2. Delete Pinecone vectors
pinecone_service.delete_namespace(user.pinecone_namespace)

# 3. Delete PostgreSQL schema
DatabaseService.delete_user_schema(user.id)

# 4. Delete user record
db.delete(user)
db.commit()
```

**⚠️ Warning**: No cascade delete implemented yet. Hard deletion requires manual cleanup of all resources.

---

## Testing User Registration

### 1. **Test Registration Endpoint**

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@fillgenie.com",
    "password": "TestPass123!",
    "full_name": "Test User"
  }'
```

**Expected Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 900,
  "user": {
    "id": "f90812cf-88b9-42f7-950a-06846beccf8b",
    "email": "test@fillgenie.com",
    "full_name": "Test User",
    "s3_bucket_prefix": "users/f90812cf-88b9-42f7-950a-06846beccf8b",
    "pinecone_namespace": "user_f90812cf88b942f7950a06846beccf8b"
  }
}
```

### 2. **Verify S3 Prefix Created**

```bash
aws s3 ls s3://fillgenie-documents/users/
```

Should show: `users/f90812cf-88b9-42f7-950a-06846beccf8b/` (empty initially)

### 3. **Verify PostgreSQL Schema Created**

```sql
-- Connect to your RDS instance
psql -h fillgenie-db.xxx.rds.amazonaws.com -U fillgenie_admin -d fillgenie

-- List all schemas
\dn

-- Should show:
-- user_f90812cf88b942f7950a06846beccf8b

-- Check tables in schema
\dt user_f90812cf88b942f7950a06846beccf8b.*

-- Should show: documents, chunks, entities, form_sessions, etc.
```

### 4. **Verify Pinecone Namespace Ready**

```python
from pinecone import Pinecone

pc = Pinecone(api_key="your-key")
index = pc.Index("fillgenie-chunks-v2")

# Check namespace stats
stats = index.describe_index_stats()
print(stats['namespaces'])
# Initially empty, but namespace is ready for vectors
```

### 5. **Test Document Upload**

```bash
curl -X POST http://localhost:8000/api/v1/documents/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@test.pdf"
```

**Expected Response**:
```json
{
  "document_id": "abc-123-def",
  "filename": "test.pdf",
  "status": "pending",
  "s3_key": "users/f90812cf.../abc-123-def.pdf",
  "message": "Document uploaded successfully"
}
```

**Verify in S3**:
```bash
aws s3 ls s3://fillgenie-documents/users/f90812cf.../
# Should show: abc-123-def.pdf
```

---

## Common Issues & Troubleshooting

### Issue 1: "S3 bucket does not exist"

**Error**: `NoSuchBucket: The specified bucket does not exist`

**Solution**:
```bash
# Create the bucket
aws s3 mb s3://fillgenie-documents --region us-east-1

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket fillgenie-documents \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

### Issue 2: "Pinecone index not found"

**Error**: `PineconeException: Index 'fillgenie-chunks-v2' not found`

**Solution**:
```python
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key=os.getenv('PINECONE_API_KEY'))
pc.create_index(
    name="fillgenie-chunks-v2",
    dimension=3072,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)
```

### Issue 3: "Permission denied to create schema"

**Error**: `permission denied to create extension "uuid-ossp"`

**Solution**:
```sql
-- Connect as RDS master user
GRANT CREATE ON DATABASE fillgenie TO fillgenie_admin;
GRANT ALL PRIVILEGES ON SCHEMA public TO fillgenie_admin;

-- Or disable user schemas (not recommended)
# In .env:
DB_USE_USER_SCHEMAS=false
```

### Issue 4: "User already exists"

**Error**: `User with email test@fillgenie.com already exists`

**Solution**: This is expected behavior. Either:
- Use a different email
- Delete the existing user first (requires manual cleanup)
- Implement a "reset password" flow

### Issue 5: "JWT token expired"

**Error**: `401 Unauthorized - Token has expired`

**Solution**: Tokens expire after 15 minutes (default). User needs to:
- Log in again to get new token
- Implement token refresh flow (see `JWT_REFRESH_TOKEN_EXPIRE_DAYS`)

---

## Security Considerations

### 1. **S3 Access Control**

✅ **Current Implementation**:
- Each user has unique S3 prefix
- Users can only access their own prefix via backend
- No direct S3 access from frontend

⚠️ **Recommendations**:
- Enable S3 bucket versioning (for accidental deletes)
- Enable CloudTrail logging (audit access)
- Use S3 lifecycle policies (archive old docs to Glacier)

### 2. **Pinecone Isolation**

✅ **Current Implementation**:
- Complete namespace isolation per user
- Backend enforces namespace restrictions
- No cross-user queries possible

✅ **Already Secure**: Pinecone namespaces are cryptographically isolated

### 3. **Database Schema Isolation**

✅ **Current Implementation**:
- PostgreSQL schema-level isolation
- Backend sets `search_path` per request
- No cross-schema access

⚠️ **Recommendations**:
- Implement row-level security (RLS) as additional layer
- Regular audit of schema permissions
- Monitor for SQL injection vulnerabilities

### 4. **Password Security**

✅ **Current Implementation**:
- bcrypt hashing with salt
- 72-byte truncation (bcrypt limit)
- Password never stored in plaintext

⚠️ **Recommendations**:
- Implement password strength requirements
- Add rate limiting on login attempts
- Implement account lockout after failed attempts
- Add email verification before allowing uploads

---

## Website Integration Checklist

### Backend Requirements

- [ ] **AWS S3 bucket exists** (`fillgenie-documents`)
- [ ] **IAM permissions configured** (PutObject, GetObject, DeleteObject, ListBucket)
- [ ] **Pinecone index exists** (`fillgenie-chunks-v2` with 3072 dimensions)
- [ ] **PostgreSQL database accessible** with CREATE SCHEMA permission
- [ ] **Environment variables set** (see checklist above)
- [ ] **Lambda function deployed** (optional but recommended)
- [ ] **CORS origins include website domain**

### Frontend Requirements

- [ ] **Registration form** calls `POST /api/v1/auth/register`
- [ ] **Login form** calls `POST /api/v1/auth/login`
- [ ] **JWT token stored** in `localStorage` as `authToken`
- [ ] **Auth header sent** with all requests: `Authorization: Bearer {token}`
- [ ] **Token expiration handling** (redirect to login after 15 min)
- [ ] **File upload component** calls `POST /api/v1/documents/upload`
- [ ] **Same API base URL** as dashboard/extension

### Testing Checklist

- [ ] **User can register** on website
- [ ] **User receives JWT token** after registration
- [ ] **User can log in** with same credentials on dashboard
- [ ] **User can log in** with same credentials on extension
- [ ] **User can upload document** on website
- [ ] **Uploaded document appears** in dashboard
- [ ] **Extension can access** uploaded documents for form filling
- [ ] **All three interfaces** share same data (website, dashboard, extension)

---

## Cost Estimation

### AWS Services (per 1000 users/month)

**S3 Storage**:
- Average 100MB per user = 100GB total
- Cost: ~$2.30/month ($0.023 per GB)

**S3 Requests**:
- 10 uploads per user = 10,000 PUT requests
- Cost: ~$0.05/month

**RDS PostgreSQL** (db.t3.micro):
- Cost: ~$15/month (fixed, not per-user)
- Scales to ~10,000 users before needing upgrade

**Pinecone** (Serverless):
- 100 vectors per user = 100,000 vectors
- Cost: ~$70/month (depends on query volume)

**OpenAI API**:
- Embeddings: 50,000 tokens per user = 50M tokens
- Cost: ~$6.50/month ($0.00013 per 1K tokens)

**Total**: ~$93.85/month for 1000 users = **$0.09 per user/month**

### Scaling Considerations

- **S3**: Scales infinitely, pay per GB
- **Pinecone**: Scales automatically, pay per vector + queries
- **RDS**: Needs vertical scaling at ~10K users (upgrade instance)
- **Lambda**: Pay per execution, scales automatically

---

## Next Steps

1. **Verify AWS Resources**:
   - [ ] Check S3 bucket exists and is accessible
   - [ ] Check Pinecone index exists with correct dimensions
   - [ ] Check RDS database permissions
   - [ ] Test Lambda deployment (if using)

2. **Test Registration Flow**:
   - [ ] Create test user via API
   - [ ] Verify S3 prefix created
   - [ ] Verify PostgreSQL schema created
   - [ ] Upload test document
   - [ ] Verify document processing

3. **Integrate with Website**:
   - [ ] Build registration form
   - [ ] Implement JWT authentication
   - [ ] Build document upload interface
   - [ ] Test cross-platform usage (website → extension → dashboard)

4. **Monitor and Optimize**:
   - [ ] Set up CloudWatch alarms
   - [ ] Monitor S3 storage costs
   - [ ] Monitor Pinecone query costs
   - [ ] Set up error logging (Sentry)

---

## Questions to Consider

1. **Do you want email verification before allowing document uploads?**
   - Current: Users can upload immediately after registration
   - Recommended: Require email verification to prevent spam

2. **What are your storage limits per tier?**
   - Free: 10 documents, 50 forms/month
   - Premium: 100+ documents, unlimited forms
   - Need to implement quota checks

3. **How will you handle user deletion?**
   - Soft delete (disable account)?
   - Hard delete (cleanup all AWS resources)?
   - GDPR compliance requirement

4. **Do you need billing integration?**
   - Stripe for premium subscriptions?
   - Usage-based billing for enterprise?

5. **What's your backup strategy?**
   - S3 versioning enabled?
   - RDS automated backups?
   - Pinecone data export?

---

## Conclusion

Your FillGenie backend is **already set up** to handle website registrations seamlessly. The key AWS resources (S3, Pinecone, PostgreSQL) are automatically provisioned during user registration, and users can immediately use the extension and dashboard after signing up on the website.

**The main things you need to verify**:
1. S3 bucket exists
2. Pinecone index exists with correct dimensions
3. PostgreSQL user has CREATE SCHEMA permission
4. Environment variables are correctly set
5. CORS allows your website domain

Once these are confirmed, users can register on the website and instantly start using all three interfaces (website, extension, dashboard) with the same account.
