# Chat API Integration Documentation

## Overview

This application now supports loading existing chat history and continuing conversations using the ChatGST API.

## Features Implemented

### 1. Load Chat History (GET)

Fetches previous messages from an existing chat session.

**API Endpoint:**

```
GET /api/chats/{chatId}/
```

**Frontend Route:**

```
GET /chat/api?chatId={chatId}
```

**Example:**

```bash
curl -X 'GET' \
  'https://chatgst.in/api/chats/6931395abe13faa2851c0c28/' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

**Response:**

```json
{
  "message": "Chat Retrieved Successfully",
  "data": [
    {
      "query": "what time is it now ?",
      "response": "I'm unable to provide the current time..."
    },
    {
      "query": "wow",
      "response": "It seems you might have found something interesting..."
    }
  ]
}
```

### 2. Continue Chat (POST)

Sends a new message to an existing chat session.

**API Endpoint:**

```
POST /api/chats/?chat_id={chatId}
```

**Frontend Route:**

```
POST /chat/api?chatId={chatId}
```

**Example:**

```bash
curl -X 'POST' \
  'https://chatgst.in/api/chats/?chat_id=6931395abe13faa2851c0c28' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'query=your message here'
```

## Frontend Implementation

### How It Works

1. **Chat Page with ID** (`/chat/[id]`)
   - When you navigate to `/chat/6931395abe13faa2851c0c28`
   - The page automatically loads the chat history
   - All previous messages are displayed
   - New messages continue the same chat session

2. **Default Chat Page** (`/chat`)
   - Starts a new chat with no history
   - Creates a new chat session when you send the first message

### Components Modified

#### 1. API Route (`/app/(protected)/chat/api/route.ts`)

- **GET handler**: Fetches chat history from backend
- **POST handler**: Sends messages with optional `chatId` parameter

#### 2. Chat Context (`/modules/chat/components/default-chat-context.tsx`)

- Accepts optional `chatId` prop
- Loads chat history automatically on mount
- Displays toast notifications for loading states

#### 3. Chat View (`/modules/chat/views/chat-view.tsx`)

- Shows loading indicator while fetching history
- Renders chat interface after history loads

#### 4. Dynamic Chat Page (`/app/(protected)/chat/[id]/page.tsx`)

- Wraps ChatView with DefaultChatProvider
- Passes chatId to enable history loading

## Usage Examples

### Load an Existing Chat

Visit the URL with your chat ID:

```
http://localhost:3000/chat/6931395abe13faa2851c0c28
```

The application will:

1. Show "Loading chat history..." message
2. Fetch all previous messages
3. Display them in the chat interface
4. Allow you to continue the conversation

### Start a New Chat

Visit the default chat page:

```
http://localhost:3000/chat
```

This starts a fresh conversation with no history.

## API Integration Details

### Authentication

All requests include the `access_token` cookie automatically. The backend API requires:

```
Authorization: Bearer {token}
```

### Response Format

The backend streams responses as text, which the frontend displays in real-time.

### Chat ID Handling

- When continuing a chat, the `chatId` is appended as a query parameter
- The backend tracks the conversation using this ID
- All new messages are associated with the same chat session

## Testing

### Test with cURL

You can test the APIs directly:

```bash
# Get chat history
curl -X 'GET' \
  'http://localhost:3000/chat/api?chatId=6931395abe13faa2851c0c28' \
  -H 'Cookie: access_token=YOUR_TOKEN'

# Send a message to continue chat
curl -X 'POST' \
  'http://localhost:3000/chat/api?chatId=6931395abe13faa2851c0c28' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: access_token=YOUR_TOKEN' \
  -d '{"messages":[{"role":"user","parts":[{"type":"text","text":"Hello"}]}]}'
```

### Test in Browser

1. Login to your application
2. Navigate to `/chat/6931395abe13faa2851c0c28`
3. You should see the previous chat history loaded
4. Type a new message and send it
5. The conversation continues in the same chat session

## Error Handling

The implementation handles various error scenarios:

- **Invalid Chat ID**: Returns 404 Not Found
- **Unauthorized**: Returns 401 if access token is missing
- **Network Errors**: Shows toast notification to user
- **Backend Errors**: Displays error message with details

## Future Enhancements

Potential improvements:

- Implement chat list view to navigate between chats
- Add ability to create new chats from existing ones
- Support for chat metadata (title, timestamp, etc.)
- Implement chat search functionality
- Add pagination for very long chat histories
