---
title: Hosting a Single Page Application using AWS CloudFront and S3 Bucket
slug: hosting-spa-cloudfront-s3
summary: A short tutorial on how to host your Single Page Application using Amazon Web Services.
date: 05/03/2019
---

# Hosting a Single Page Application using AWS CloudFront and S3 Bucket
Single Page Applications are often just static files. In which case hosting them is as easy as hosting any other static website. 

Amazon Web Services is one of the most popular cloud hosting providers offering a variety of services. In this post I will show you how to use two of them: **CloudFront** and **S3** in order to host and serve a Single Page Application. 

We will use an S3 bucket as a storage for our bundled application and a CloudFront distribution as a CDN (Content Delivery Network) to serve them.

## Prerequisites
Before we can begin we need:

1. An AWS Account
2. Bundle of application to be hosted

## Creating an S3 bucket
Let's start by creating an S3 bucket. We will keep it private, so that our files will not be accessible directly. Instead they will be served by our CloudFront distribution. 

1. After logging in to your AWS account head into the S3 section - press `Services` in the top navigation bar, enter `S3` and click on the first result: `S3 Scalable Storage in the Cloud`. 

![S3 service in AWS navigation bar][1]
[1]: /assets/hosting-spa-cloudfront-s3/1.png

2. Press `Create bucket` button. A pop up will appear asking you for the details of your new bucket.

![Create bucket pop-up][2]
[2]: /assets/hosting-spa-cloudfront-s3/2.png

3. Enter the bucket name and your preferred hosting region. Press `Next`, click through the next 3 steps as we will keep the default bucket settings. 

4. Head into your newly created bucket by clicking it's name in the list. Once you are in press `Upload` button.

5. A pop-up will appear, press `Add files` button and add all the bundle files of your application. Make sure you **add the files, not e.g. a folder that contains them**. The files have to be at the root level of our bucket. 

![Upload files pop-up][3]
[3]: /assets/hosting-spa-cloudfront-s3/3.png

6. Press `Next` and click through the next 3 steps, keeping the default settings. 

We now have our app in our newly bucket. Great! 

## Creating CloudFront distribution
We will now create a CloudFront distribution for our app. It wil be responsible for accessing the files for our app from the S3 bucket and serving them to the client. 

CloudFront employs caching. It means it will not actually have to reach out to our bucket on every user requests. Instead it will do so only when we tell instruct it that our files have changed or it's cache expires. Default cache time for CloudFront is 24 hours. Thanks to that we can achieve improved load times.
Moreover, by default CloudFront is protected by AWS from e.g. DDoS attacks. Less worry for us. 

1. Head into CloudFront service area within your account. You can find it the same way we found S3 bucket area previosuly. 

![CloudFront main service area][4]
[4]: /assets/hosting-spa-cloudfront-s3/4.png 

2. Press the `Create distribution` button. You will be taken to the next page asking for "delivery method for your content". For the purpose of this tutorial we will be creating a Web distribution. Press `Get started`.

![Create CloudFront distribution start page][5]
[5]: /assets/hosting-spa-cloudfront-s3/5.png

3. You will be now taken to the page asking for configuration of distribution to be created.
We will fill in the following fields:
- **Origin Domain Name** Select the name of the bucket we previously created
- **Restrict Bucket Access** - Yes
- **Origin Access Identity** - Create a New Identity
- **Grant Read Permissions on Bucket** - Yes, Update Bucket Policy
- **Viewer Protocol Policy** - Redirect HTTP to HTTPS
- **Compress Objects Automatically** - Yes (this will enable automatic gzip compression)
- **Default Root Object** Your app root file i.e. index.html

![Create CloudFront distribution form part one][6]
[6]: /assets/hosting-spa-cloudfront-s3/6.png

![Create CloudFront distribution form part two][7]
[7]: /assets/hosting-spa-cloudfront-s3/7.png

![Create CloudFront distribution form part three][8]
[8]: /assets/hosting-spa-cloudfront-s3/8.png

![Create CloudFront distribution form part three][9]
[9]: /assets/hosting-spa-cloudfront-s3/9.png

4. Press `Create distribution`. Our distribution will be now created, it might take a second or two!

Once the `Distribution Status` changes to `Deployed` go into the distribution by clicking on it's name and copy the value of `Domain Name`. It is the url to your distribution.

Try and visit the url. You should now see your application.

## Configuring our CloudFront distribution
Our single page application is handled by a single `index.html` file resolved at `/` route. At the moment going to any other route e.g. `/some-route` results in a 403 Forbidden error. This is because we have not reached the `index.html` file and instead tried to get `some-route` from the origin (which in our case is the S3 bucket) that does not exist. The reason for the error being a 403 not a 404 (as we would logically expect) is our bucket being private.

To address this issue we need to create a custom error response for our CloudFront distribution.

1. Click on the newly created distribution on the "CloudFront distributions page". You will be taken to a page with a set of navigation tabs at the top. Go to `Error Pages`.

2. Once in the tab press `Create Custom Error Response` button.

3. Fill in the following fields, and press `Create`.
- **HTTP Error Code** 403: Forbidden
- **Customize Error Response** - Yes
- **Response Page Path** - Your app root file preceded by a `/` i.e. `/index.html`
- **HTTP Response Code** - 200

Try and go to any route within your distribution. You should now reach your application.

## Conclusions
In few easy steps we have hosted and served our Single Page Application. Thanks to CloudFront we have caching functionalities in place and some network attacks prevention. Our new application is now up and running!