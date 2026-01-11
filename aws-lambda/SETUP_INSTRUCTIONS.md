# FillFlow Waitlist - AWS Setup Instructions

**Last Updated:** January 11, 2026

This guide will help you set up the serverless waitlist system using AWS Lambda, API Gateway, and DynamoDB.

---

## Prerequisites

- AWS CLI configured with credentials
- AWS account with permissions to create Lambda, API Gateway, and DynamoDB resources

---

## Step 1: Create DynamoDB Table

### Using AWS CLI

```powershell
aws dynamodb create-table `
  --table-name fillflow-waitlist `
  --attribute-definitions AttributeName=email,AttributeType=S AttributeName=timestamp,AttributeType=S `
  --key-schema AttributeName=email,KeyType=HASH AttributeName=timestamp,KeyType=RANGE `
  --billing-mode PAY_PER_REQUEST `
  --region us-east-1
```

### Using AWS Console

1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Click **Create table**
3. Configure:
   - **Table name**: `fillflow-waitlist`
   - **Partition key**: `email` (String)
   - **Sort key**: `timestamp` (String)
   - **Table settings**: Default settings or On-demand
4. Click **Create table**

---

## Step 2: Create IAM Role for Lambda

### Using AWS CLI

```powershell
# Create trust policy file
@"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
"@ | Out-File -Encoding utf8 trust-policy.json

# Create IAM role
aws iam create-role `
  --role-name fillflow-waitlist-lambda-role `
  --assume-role-policy-document file://trust-policy.json

# Attach basic Lambda execution policy
aws iam attach-role-policy `
  --role-name fillflow-waitlist-lambda-role `
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Create DynamoDB policy
@"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:*:table/fillflow-waitlist"
    }
  ]
}
"@ | Out-File -Encoding utf8 dynamodb-policy.json

# Create and attach DynamoDB policy
aws iam create-policy `
  --policy-name fillflow-waitlist-dynamodb-policy `
  --policy-document file://dynamodb-policy.json

# Get your AWS account ID
$accountId = (aws sts get-caller-identity --query Account --output text)

# Attach DynamoDB policy to role
aws iam attach-role-policy `
  --role-name fillflow-waitlist-lambda-role `
  --policy-arn "arn:aws:iam::${accountId}:policy/fillflow-waitlist-dynamodb-policy"
```

### Using AWS Console

1. Go to [IAM Console](https://console.aws.amazon.com/iam)
2. Click **Roles** → **Create role**
3. Select **Lambda** as trusted entity
4. Attach policies:
   - `AWSLambdaBasicExecutionRole`
   - Create custom policy for DynamoDB access:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "dynamodb:PutItem",
             "dynamodb:GetItem"
           ],
           "Resource": "arn:aws:dynamodb:us-east-1:*:table/fillflow-waitlist"
         }
       ]
     }
     ```
5. Name the role: `fillflow-waitlist-lambda-role`

---

## Step 3: Create Lambda Function

### Using AWS CLI

```powershell
# Navigate to lambda function directory
cd "c:\Users\nosso\OneDrive\Desktop\FillGenie Website\aws-lambda\waitlist-function"

# Create deployment package
Compress-Archive -Path lambda_function.py -DestinationPath function.zip -Force

# Get the IAM role ARN
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

### Using AWS Console

1. Go to [Lambda Console](https://console.aws.amazon.com/lambda)
2. Click **Create function**
3. Configure:
   - **Function name**: `fillflow-waitlist`
   - **Runtime**: Python 3.12
   - **Architecture**: x86_64
   - **Permissions**: Use existing role `fillflow-waitlist-lambda-role`
4. Click **Create function**
5. In the code editor, paste the content from `lambda_function.py`
6. Click **Deploy**
7. Go to **Configuration** → **Environment variables**
8. Add variable:
   - Key: `DYNAMODB_TABLE`
   - Value: `fillflow-waitlist`

---

## Step 4: Create API Gateway

### Using AWS CLI

```powershell
# Create REST API
$apiId = (aws apigateway create-rest-api `
  --name "FillFlow Waitlist API" `
  --description "API for FillFlow waitlist submissions" `
  --endpoint-configuration types=REGIONAL `
  --query 'id' `
  --output text)

# Get root resource ID
$rootId = (aws apigateway get-resources `
  --rest-api-id $apiId `
  --query 'items[0].id' `
  --output text)

# Create /waitlist resource
$resourceId = (aws apigateway create-resource `
  --rest-api-id $apiId `
  --parent-id $rootId `
  --path-part waitlist `
  --query 'id' `
  --output text)

# Create POST method
aws apigateway put-method `
  --rest-api-id $apiId `
  --resource-id $resourceId `
  --http-method POST `
  --authorization-type NONE

# Create OPTIONS method for CORS
aws apigateway put-method `
  --rest-api-id $apiId `
  --resource-id $resourceId `
  --http-method OPTIONS `
  --authorization-type NONE

# Get Lambda function ARN
$accountId = (aws sts get-caller-identity --query Account --output text)
$lambdaArn = "arn:aws:lambda:us-east-1:${accountId}:function:fillflow-waitlist"

# Set up Lambda integration for POST
aws apigateway put-integration `
  --rest-api-id $apiId `
  --resource-id $resourceId `
  --http-method POST `
  --type AWS_PROXY `
  --integration-http-method POST `
  --uri "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/${lambdaArn}/invocations"

# Set up mock integration for OPTIONS (CORS preflight)
aws apigateway put-integration `
  --rest-api-id $apiId `
  --resource-id $resourceId `
  --http-method OPTIONS `
  --type MOCK `
  --request-templates '{"application/json":"{\"statusCode\": 200}"}'

# Set up integration response for OPTIONS
aws apigateway put-integration-response `
  --rest-api-id $apiId `
  --resource-id $resourceId `
  --http-method OPTIONS `
  --status-code 200 `
  --response-parameters '{
    "method.response.header.Access-Control-Allow-Headers": "'"'"'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"'"'",
    "method.response.header.Access-Control-Allow-Methods": "'"'"'POST,OPTIONS'"'"'",
    "method.response.header.Access-Control-Allow-Origin": "'"'"'*'"'"'"
  }'

# Add method response for OPTIONS
aws apigateway put-method-response `
  --rest-api-id $apiId `
  --resource-id $resourceId `
  --http-method OPTIONS `
  --status-code 200 `
  --response-parameters '{
    "method.response.header.Access-Control-Allow-Headers": true,
    "method.response.header.Access-Control-Allow-Methods": true,
    "method.response.header.Access-Control-Allow-Origin": true
  }'

# Grant API Gateway permission to invoke Lambda
aws lambda add-permission `
  --function-name fillflow-waitlist `
  --statement-id apigateway-invoke `
  --action lambda:InvokeFunction `
  --principal apigateway.amazonaws.com `
  --source-arn "arn:aws:execute-api:us-east-1:${accountId}:${apiId}/*/*"

# Deploy API
aws apigateway create-deployment `
  --rest-api-id $apiId `
  --stage-name prod

# Get the API endpoint
$apiEndpoint = "https://${apiId}.execute-api.us-east-1.amazonaws.com/prod/waitlist"
Write-Host "API Endpoint: $apiEndpoint"
```

### Using AWS Console

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Click **Create API** → **REST API** → **Build**
3. Configure:
   - **API name**: `FillFlow Waitlist API`
   - **Endpoint Type**: Regional
4. Click **Create API**

5. **Create Resource**:
   - Click **Actions** → **Create Resource**
   - **Resource Name**: `waitlist`
   - **Resource Path**: `/waitlist`
   - Enable **CORS**
   - Click **Create Resource**

6. **Create POST Method**:
   - Select the `/waitlist` resource
   - Click **Actions** → **Create Method** → Select **POST**
   - Integration type: **Lambda Function**
   - **Lambda Function**: `fillflow-waitlist`
   - Click **Save** and **OK** to give API Gateway permission

7. **Enable CORS**:
   - Select `/waitlist` resource
   - Click **Actions** → **Enable CORS**
   - Keep defaults
   - Click **Enable CORS and replace existing CORS headers**

8. **Deploy API**:
   - Click **Actions** → **Deploy API**
   - **Deployment stage**: [New Stage] `prod`
   - Click **Deploy**

9. **Get Endpoint URL**:
   - Copy the **Invoke URL** (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com/prod`)
   - Your endpoint will be: `https://abc123.execute-api.us-east-1.amazonaws.com/prod/waitlist`

---

## Step 5: Update Frontend Configuration

Add the API endpoint to your `.env` file:

```env
# Waitlist API
VITE_WAITLIST_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/waitlist
```

Replace `YOUR_API_ID` with your actual API Gateway ID.

---

## Step 6: Test the API

### Test with cURL

```powershell
# Replace with your actual API endpoint
$apiUrl = "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/waitlist"

# Test POST request
curl -X POST $apiUrl `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist!"
}
```

### Test with PowerShell

```powershell
$apiUrl = "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/waitlist"

$body = @{
    email = "test@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri $apiUrl -Method Post -Body $body -ContentType "application/json"
```

---

## Step 7: Verify Data in DynamoDB

### Using AWS Console

1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Click **Tables** → **fillflow-waitlist**
3. Click **Explore table items**
4. You should see the test email with timestamp

### Using AWS CLI

```powershell
aws dynamodb scan --table-name fillflow-waitlist
```

---

## Accessing Waitlist Data

### View All Emails (AWS Console)

1. Go to DynamoDB Console
2. Select `fillflow-waitlist` table
3. Click **Explore table items**
4. Click **Scan** → **Run**

### Export to CSV

1. In DynamoDB Console, view table items
2. Click **Actions** → **Export to CSV**
3. Download the file

### Using AWS CLI

```powershell
# Get all emails
aws dynamodb scan --table-name fillflow-waitlist --output json > waitlist.json

# Get just emails (requires jq)
aws dynamodb scan --table-name fillflow-waitlist --query 'Items[*].email.S' --output text
```

---

## Costs

**Expected Monthly Costs** (for 1,000 signups):

- **DynamoDB**: ~$0.25/month (On-Demand pricing)
- **Lambda**: Free Tier (1M requests/month)
- **API Gateway**: ~$3.50/month (1M requests = $3.50)
- **Total**: ~$4/month for 1,000 signups

---

## Troubleshooting

### Issue: CORS errors in browser

**Solution**: Ensure OPTIONS method is configured in API Gateway with proper CORS headers

### Issue: Lambda timeout

**Solution**: Increase timeout in Lambda Configuration → General configuration → Timeout

### Issue: Permission denied

**Solution**: Verify IAM role has DynamoDB permissions and API Gateway has Lambda invoke permission

### Issue: Can't see data in DynamoDB

**Solution**: 
1. Check Lambda logs in CloudWatch
2. Verify table name matches environment variable
3. Test Lambda directly in AWS Console

---

## Security Notes

- API is currently **public** (no authentication)
- Consider adding:
  - API Key requirement
  - Rate limiting
  - reCAPTCHA verification
- For production, restrict CORS to your domain only

---

## Next Steps

After setup is complete:

1. Test the API endpoint
2. Update frontend `.env` with API URL
3. Deploy website and test waitlist form
4. Monitor submissions in DynamoDB Console

---

**Setup Complete!** 🎉

Your waitlist API is now ready to collect emails.
