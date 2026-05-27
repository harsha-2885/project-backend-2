VideoTube – Full Stack Video Sharing Platform (YouTube Clone Backend)

1. Product Overview

  VideoTube is a scalable video-sharing platform that allows users to upload, manage, and interact with video content. The system supports authentication, video publishing, subscriptions, comments, likes, playlists, tweets, and channel analytics. The backend is built using Node.js, Express.js, MongoDB, and Cloudinary.

2. Problem Statement

  Content creators need a platform where they can:

  Upload videos
  Build an audience
  Engage through comments and likes
  Organize content into playlists
  Track channel performance
  
  Traditional social media platforms do not provide complete creator-focused video management and analytics.
  
  VideoTube solves this by providing a complete backend ecosystem for video content management.

3. Objectives
  Primary Objectives
  Secure user authentication
  Video upload and management
  User engagement through likes and comments
  Subscription system
  Playlist management
  Channel analytics dashboard
  Secondary Objectives
  Social interaction through tweets/posts
  Scalable API architecture
  Cloud-based media storage
4. User Roles
  Guest User
  Browse videos
  View public channels
  Registered User
  Upload videos
  Like videos
  Comment on videos
  Subscribe to channels
  Create playlists
  Create tweets
  Content Creator
  Manage uploaded videos
  Track analytics
  Build subscriber base
  5. Core Features
  User Management
  Registration

    Users can:
    
    Create account
    Upload avatar
    Upload cover image
    Authentication
    Login
    Logout
    JWT Authentication
    Refresh Tokens
    Profile Management
    Update profile
    Change password
    Update avatar
    Update cover image
    Video Management
    Upload Video

    User can:
    
    Upload video file
    Upload thumbnail
    Add title
    Add description
    Video Operations
    View videos
    Update videos
    Delete videos
    Toggle publish status
    Subscription System
    
    Users can:
    
    Subscribe to channels
    Unsubscribe from channels
    View subscriber count
    View subscribed channels
    Comment System

    Users can:
    
    Add comments
    Edit comments
    Delete comments
    View comments
    Like System
    
    Users can:
    
    Like Videos
    Like
    Unlike
    Like Comments
    Like
    Unlike
    Like Tweets
    Like
    Unlike
    Playlist Management
    
    Users can:
    
    Create playlist
    Delete playlist
    Update playlist
    Add videos
    Remove videos
    View playlists
    Tweet System
    
    Users can:
    
    Create tweets
    Update tweets
    Delete tweets
    View tweets
    Dashboard Analytics
    
    Creators can view:
    
    Channel Statistics
    Total Views
    Total Subscribers
    Total Videos
    Total Likes
    Video Statistics
    Uploaded Videos
    Performance Metrics


6. Functional Requirements
    Authentication APIs
    POST /users/register
    POST /users/login
    POST /users/logout
    POST /users/refresh-token
    POST /users/change-password
    User APIs
    GET  /users/current-user
    PATCH /users/avatar
    PATCH /users/cover-image
    PATCH /users/update-account
    Video APIs
    POST   /videos
    GET    /videos
    GET    /videos/:id
    PATCH  /videos/:id
    DELETE /videos/:id
    PATCH  /videos/toggle/publish/:id
    Comment APIs
    POST   /comments/:videoId
    GET    /comments/:videoId
    PATCH  /comments/:commentId
    DELETE /comments/:commentId
    Like APIs
    POST /likes/toggle/v/:videoId
    POST /likes/toggle/c/:commentId
    POST /likes/toggle/t/:tweetId
    GET  /likes/videos
    Subscription APIs
    POST /subscriptions/:channelId
    GET  /subscriptions/channel/:channelId
    GET  /subscriptions
    Playlist APIs
    POST   /playlists
    GET    /playlists/:id
    PATCH  /playlists/:id
    DELETE /playlists/:id
    POST   /playlists/:playlistId/:videoId
    DELETE /playlists/:playlistId/:videoId
    Tweet APIs
    POST   /tweets
    GET    /tweets/:userId
    PATCH  /tweets/:tweetId
    DELETE /tweets/:tweetId
    Dashboard APIs
    GET /dashboard/stats
    GET /dashboard/videos


7. Non-Functional Requirements
    Security
    JWT Authentication
    Access Token
    Refresh Token
    Password Hashing using bcrypt
    Protected Routes
    Scalability
    Modular Architecture
    MVC Pattern
    Reusable Middleware
    Cloud Storage
    Performance
    Indexed MongoDB Collections
    Pagination Support
    Aggregation Pipelines
    Reliability
    Error Handling Middleware
    Validation Middleware
    Consistent API Responses


8. Technology Stack
    Backend
    Node.js
    Express.js
    Database
    MongoDB
    Mongoose
    Authentication
    JWT
    bcrypt
    Media Storage
    Cloudinary
    File Upload
    Multer
    Development Tools
    Postman
    Git
    GitHub

   
10. Database Collections
    Users
    username
    email
    password
    avatar
    coverImage
    watchHistory
    Videos
    title
    description
    videoFile
    thumbnail
    views
    owner
    isPublished
    Comments
    content
    video
    owner
    Likes
    likedBy
    video
    comment
    tweet
    Subscriptions
    subscriber
    channel
    Playlists
    name
    description
    videos
    owner
    Tweets
    content
    owner


11. Success Metrics
    User Growth
    Number of registered users
    Number of active users
    Content Metrics
    Videos uploaded
    Comments posted
    Likes generated
    Engagement Metrics
    Subscriber growth
    Playlist creation
    Tweet interactions


12. Future Enhancements
    Video recommendations
    AI-powered search
    Real-time notifications
    Live streaming
    Video monetization
    Watch later feature
    Premium subscriptions
    Real-time chat
    Content moderation using AI
