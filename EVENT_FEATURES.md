# Event Features Documentation

## Overview
This document describes the event hosting features implemented for bobigos, including event upload, benefit tags, sample plotline sheets, and Google Chat integration.

## Features Implemented

### 1. Custom Event Upload Form (`upload-event.html`)
A comprehensive form for users to upload their custom events with the following fields:
- **Organization / Business Name** (required)
- **Your Name** (required)
- **Your Email** (required)
- **Event Type** (required): 
  - Hosting a Conference
  - Hackathon / Competition
  - Fundraiser
  - Workshop / Webinar
  - Program
  - Member Recruitment
- **Category** (required): Selected from the category filtering list
- **Event Description** (required, 70 word limit)

The form validates word count and submits to Formspree endpoint.

### 2. Benefit Tags
Event tiles now display benefit tags showing what attendees will get:
- ✨ **Gain Experience** - For events that provide hands-on learning
- 📜 **Earn Certificate** - For events that provide certificates
- ⏰ **Earn Community Service Hours** - For events that count toward community service

These tags are displayed on event cards to help potential attendees understand the value proposition.

### 3. Sample Plotline Sheets
Each event bento tile can include a sample event plan with:
- Full event timeline/schedule
- Logistics information
- Calendar details
- Resources needed
- Checklist items

This helps event hosts see a complete example of how to plan their event.

### 4. Event Data Structure
Events in JSON files can now include:
```json
{
  "tag": "Event",
  "title": "Event Title",
  "description": "Event description...",
  "benefits": ["gain-experience", "earn-certificate", "earn-community-service"],
  "plotlineSheet": "HTML content with event plan details...",
  "resumeDescription": "Resume-ready description for attendees..."
}
```

### 5. Google Chat Integration (To Be Implemented)
**Note:** Google Chat link functionality should be implemented server-side.

#### Requirements:
- When a user signs up for an event OR uploads their own event, they receive a Google Chat link via email
- The link expires after 60 days
- Users can request a new link by contacting builtwithctrl@gmail.com

#### Implementation Notes:
1. **Email Service**: Set up email sending (e.g., using SendGrid, Mailgun, or similar)
2. **Google Chat Link Generation**: 
   - Create Google Chat spaces/rooms for each event
   - Generate shareable links
   - Track expiration dates (60 days from creation)
3. **Email Template**: Include:
   - Welcome message
   - Google Chat link
   - Expiration date notice
   - Instructions for requesting a new link
4. **Database Tracking**: Store:
   - User email
   - Event ID
   - Chat link
   - Creation date
   - Expiration date
   - Link status (active/expired)

#### Example Email Template:
```
Subject: Your Google Chat Link for [Event Name]

Hi [Name],

Thank you for [signing up for/uploading] [Event Name]!

Here's your Google Chat link to discuss the event with our team and potential co-hosts:
[Google Chat Link]

This link expires on [Date - 60 days from now]. If you need a new link, please contact builtwithctrl@gmail.com.

Looking forward to connecting!

- The bobigos team
```

## Updated Files

### New Files:
- `upload-event.html` - Event upload form
- `categories/event-example.json` - Example event with new structure
- `EVENT_FEATURES.md` - This documentation

### Modified Files:
- `network.html` - Added "Upload Your Event" tile
- `host-a-conference.html` - Added benefit tags and plotline sheets
- `workshops-webinars.html` - Added benefit tags and plotline sheets
- `hackathons-competitions.html` - Added benefit tags and plotline sheets
- `fundraising-and-goods.html` - Added benefit tags and plotline sheets
- `mentored-programs.html` - Added benefit tags and plotline sheets
- `recruit-members.html` - Added benefit tags and plotline sheets

## Next Steps

1. **Backend Integration**: 
   - Set up email service
   - Implement Google Chat link generation
   - Create database schema for tracking links

2. **Form Submission Handler**:
   - Update Formspree webhook or create custom endpoint
   - Trigger email with Google Chat link on form submission

3. **Event Signup Handler**:
   - Add signup functionality to event cards
   - Trigger email with Google Chat link on signup

4. **Link Management**:
   - Create admin interface for managing expired links
   - Set up automated expiration checking
   - Create endpoint for link renewal requests

## Testing

To test the features:
1. Navigate to `upload-event.html` and submit a test event
2. Check that benefit tags appear on event cards when `benefits` array is present
3. Verify plotline sheets display when `plotlineSheet` field is present
4. Test word count validation (should limit to 70 words)

