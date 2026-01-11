# FillFlow Waitlist System - Quick Start

**Status:** Ready to Deploy  
**Last Updated:** January 11, 2026

---

## What Was Created

✅ **AWS Lambda Function** (`aws-lambda/waitlist-function/lambda_function.py`)
- Stores email addresses to DynamoDB
- CORS enabled for frontend
- Basic email validation

✅ **Waitlist Form Component** (`src/components/waitlist/WaitlistForm.tsx`)
- Clean, responsive design
- Loading and success states
- Error handling

✅ **Coming Soon Page Updated** (`src/pages/ComingSoon.tsx`)
- Integrated waitlist form
- Updated free plan limit (30 documents)

✅ **Setup Documentation** (`aws-lambda/SETUP_INSTRUCTIONS.md`)
- Step-by-step AWS configuration
- CLI commands and Console instructions

---

## Quick Deploy Steps

### 1. Create DynamoDB Table (1 minute)

```powershell
aws dynamodb create-table `
  --table-name fillflow-waitlist `
  --attribute-definitions AttributeName=email,AttributeType=S AttributeName=timestamp,AttributeType=S `
  --key-schema AttributeName=email,KeyType=HASH AttributeName=timestamp,KeyType=RANGE `
  --billing-mode PAY_PER_REQUEST `
  --region us-east-1
```

### 2. Create IAM Role (2 minutes)

```powershell
# Create trust policy
@"
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "lambda.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}
"@ | Out-File -Encoding utf8 trust-policy.json

# Create role
aws iam create-role `
  --role-name fillflow-waitlist-lambda-role `
  --assume-role-policy-document file://trust-policy.json

# Attach Lambda execution policy
aws iam attach-role-policy `
  --role-name fillflow-waitlist-lambda-role `
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Create DynamoDB policy
@"
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["dynamodb:PutItem", "dynamodb:GetItem"],
    "Resource": "arn:aws:dynamodb:us-east-1:*:table/fillflow-waitlist"
  }]
}
"@ | Out-File -Encoding utf8 dynamodb-policy.json

# Get account ID and create policy
$accountId = (aws sts get-caller-identity --query Account --output text)
aws iam create-policy `
  --policy-name fillflow-waitlist-dynamodb-policy `
  --policy-document file://dynamodb-policy.json

# Attach DynamoDB policy
aws iam attach-role-policy `
  --role-name fillflow-waitlist-lambda-role `
  --policy-arn "arn:aws:iam::${accountId}:policy/fillflow-waitlist-dynamodb-policy"
```

### 3. Deploy Lambda Function (2 minutes)

```powershell
# Navigate to lambda directory
cd "c:\Users\nosso\OneDrive\Desktop\FillGenie Website\aws-lambda\waitlist-function"

# Create deployment package
Compress-Archive -Path lambda_function.py -DestinationPath function.zip -Force

# Get role ARN
$roleArn = (aws iam get-role --role-name fillflow-waitlist-lambda-role --query 'Role.Arn' --output text)

# Create Lambda function
aws lambda create-function `
  --function-name fillflow-waitlist `
  --runtime python3.12 `
  --role $roleArn `
  --handler lambda_function.lambda_handler `
  --zip-file fileb://function.zip `
  --environment "Variables={DYNAMODB_TABLE=fillflow-waitlist}" `
  --timeout 10 `
  --memory-size 128 `
  --region us-east-1
```

### 4. Create API Gateway (3 minutes)

**Use AWS Console** (easier for first time):

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Create API → REST API → Build
3. Name: `FillFlow Waitlist API`
4. Create Resource: `/waitlist`
5. Create Method: POST → Lambda Function → `fillflow-waitlist`
6. Enable CORS on `/waitlist` resource
7. Deploy API to `prod` stage
8. Copy Invoke URL

### 5. Update Frontend Config (30 seconds)

Edit `.env`:
```env
VITE_WAITLIST_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/waitlist
```

Replace `YOUR_API_ID` with the ID from API Gateway.

### 6. Test (1 minute)

```powershell
# Test API
curl -X POST https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/waitlist `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com"}'

# Check DynamoDB
aws dynamodb scan --table-name fillflow-waitlist
```

---

## View Waitlist Entries

### AWS Console (Easiest)
1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Tables → `fillflow-waitlist` → Explore table items
3. Click "Scan" → "Run"
4. Actions → Export to CSV

### AWS CLI
```powershell
# View all entries
aws dynamodb scan --table-name fillflow-waitlist

# Export to JSON
aws dynamodb scan --table-name fillflow-waitlist --output json > waitlist.json
```

---

## Frontend Usage

The waitlist form is already integrated on the `/coming-soon` page. Users can:

1. Enter their email
2. Click "Join Waitlist"
3. See success message
4. Email is stored in DynamoDB with timestamp

---

## Monthly Costs

For **1,000 signups/month**:
- DynamoDB: ~$0.25
- Lambda: Free (within Free Tier)
- API Gateway: ~$3.50
- **Total: ~$4/month**

---

## Next Steps

After deployment:

1. ✅ Test the waitlist form on `/coming-soon`
2. ✅ Verify emails appear in DynamoDB
3. 📧 Set up email notifications (optional)
4. 🔒 Add rate limiting (optional)
5. 📊 Create export script for marketing campaigns

---

## Full Documentation

See [aws-lambda/SETUP_INSTRUCTIONS.md](aws-lambda/SETUP_INSTRUCTIONS.md) for complete details.

---

**Total Setup Time:** ~10 minutes  
**Difficulty:** Easy  
**AWS Services:** 3 (DynamoDB, Lambda, API Gateway)

Happy collecting emails! 📧
