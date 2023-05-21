# app.petitgouter.org

## Overview

The idea of this project is to prepare the squeleton of an Angular application 
that can be deployed in the cloud. It includes:
- A basic application.
- A CICD pipeline using Github actions.
- 3 environment configurations (`dev-app`, `test-app`, `app`).
- A login using Auth0.
- Translations so the web app can be displayed in English or in French 
(here is [the documentation](./docs/ADD_A_NEW_LANGUAGE.md) to add new languages).
- The preference popup when the user accesses the web site for the first time.
- The squeleton for the **privacy policy** and **terms and conditions** pages.

## Prerequisits

To publish this project in the cloud, some cloud configuration will need to be prepared in advance.

Please note all these steps have a linked tutorial. I would assume the amount of work to prepare all this is 2-3 days of work. However, once this is all done, your application will be running 3 environments in the cloud, and the only thing required will be that you implement your
application and start make a difference to the word without worrying about release processes.

| What do I need? | How the *** do I do that? |
|-----------------|---------------------------|
| An AWS account  | [Create your AWS account](https://github.com/rfrad/tutorials/wiki/Create-your-AWS-account) |
| One AWS account for each of the 3 environments (`dev-app`, `test-app`, `app`) (optional) | [Create a (sub)-account in AWS](https://github.com/rfrad/tutorials/wiki/Create-a-(sub)-account-in-AWS) |
| 3 AWS accounts configured for the SPA | [Populate an AWS environment account to prepare for a SPA deployment](https://github.com/rfrad/tutorials/wiki/Populate-an-AWS-environment-account-to-prepare-for-a-SPA-deployment) |
| - An S3 bucket (per environment) to deploy the application | [Create an S3 bucket](https://github.com/rfrad/tutorials/wiki/Populate-an-AWS-environment-account-to-prepare-for-a-SPA-deployment#create-an-s3-bucket) |
| - A ClouFront distribution | [Create a CloudFront distribution](https://github.com/rfrad/tutorials/wiki/Populate-an-AWS-environment-account-to-prepare-for-a-SPA-deployment#create-a-cloudfront-distribution) |
| - An AWS user to deploy the SPA | [Prepare CICD user for your frontend](https://github.com/rfrad/tutorials/wiki/Populate-an-AWS-environment-account-to-prepare-for-a-SPA-deployment#prepare-cicd-user-for-your-frontend) |
| - An Auth0 account (with 3 tenants) | [Configure an Auth0 account](https://github.com/rfrad/tutorials/wiki/Prepare-Auth0-for-a-SPA#create-new-tenant) |
| - An Auth0 application | [Create an application](https://github.com/rfrad/tutorials/wiki/Prepare-Auth0-for-a-SPA#create-an-application) |

