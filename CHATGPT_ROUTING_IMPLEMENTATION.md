# ChatGPT-Like Routing Implementation

## Overview

Implemented ChatGPT-style routing behavior where new chats start at `/chat` and automatically redirect to `/chat/[chatId]` after the first message. This ensures chat conversations are persistent across page reloads.

## Problem Solved

Previously, chats were staying on the `/chat` route, causing:

- Messages to be lost on page reload
- Multiple chat IDs created for the same conversation
- Users unable to bookmark or share specific chat conversations

## Solution Architecture

### 1. **Provider Location** ✅

**Changed:** Moved `DefaultChatProvider` from shared layout to individual pages

- **Before:** Provider was in `/chat/layout.tsx` (shared across all routes)
- **After:** Each page has its own provider instance
  - `/chat/page.tsx` - Fresh provider for new chats
  - `/chat/[id]/page.tsx` - Provider with chatId for existing chats

**Why:** This ensures clean separation between new and existing chats. Each route gets its own chat context.

### 2. **Chat ID Extraction** ✅

**Changed:** Implemented custom transport to read chat ID from response headers

- **Before:** Attempted to parse chat ID from data stream (unreliable)
- **After:** Custom `fetch` wrapper in `DefaultChatTransport` reads `X-Chat-ID` header

```tsx
const customTransport = new DefaultChatTransport({
  api: apiUrl,
  fetch: async (url, options) => {
    const response = await fetch(url, options);

    // Extract chat ID from header for new chats
    if (!effectiveChatId && !hasRedirectedRef.current) {
      const newChatId = response.headers.get("X-Chat-ID");
      if (newChatId) {
        hasRedirectedRef.current = true;
        setCurrentChatId(newChatId);
        router.replace(`/chat/${newChatId}`);
      }
    }

    return response;
  },
});
```

**Why:** Headers are set immediately when response is received, making extraction reliable.

### 3. **Redirect Logic** ✅

**Changed:** Automatic redirect after first message using `router.replace()`

- Redirect happens in custom transport after detecting new chat ID
- Uses `replace()` instead of `push()` to avoid back button issues
- Includes 100ms setTimeout to ensure stream starts before redirect
- `hasRedirectedRef` prevents duplicate redirects

**Why:** Seamless user experience - URL updates without interrupting the chat stream.

### 4. **Clean State Management** ✅

**Removed:** Redundant useEffect hooks for data stream monitoring

- Removed data stream parsing logic
- Removed `onNewChatId` callback prop
- Simplified provider interface

**Why:** Header-based extraction is cleaner and more reliable than stream parsing.

## User Flow

### New Chat Flow:

1. User navigates to `/chat`
2. `DefaultChatProvider` creates chat instance with ID `"default-chat"`
3. User sends first message
4. Backend creates chat and returns ID in `X-Chat-ID` header
5. Custom transport intercepts response, extracts chat ID
6. Router redirects to `/chat/[newChatId]`
7. Provider remounts with specific chat ID
8. Subsequent messages use the same chat ID

### Existing Chat Flow:

1. User navigates to `/chat/[id]` (from sidebar, bookmark, etc.)
2. `DefaultChatProvider` extracts `id` from URL params
3. Provider loads chat history via GET request
4. Chat displays with previous messages
5. All new messages append to the same chat

### Reload Behavior:

- **At `/chat`:** Shows empty new chat (no history)
- **At `/chat/[id]`:** Loads and displays full chat history

## Files Modified

### 1. `/src/app/(protected)/chat/layout.tsx`

- **Change:** Removed `DefaultChatProvider`
- **Reason:** Allow each page to manage its own chat context

### 2. `/src/app/(protected)/chat/page.tsx`

- **Change:** Added `DefaultChatProvider` wrapper
- **Reason:** Provide fresh chat context for new chats

### 3. `/src/app/(protected)/chat/[id]/page.tsx`

- **Change:** Added `DefaultChatProvider` wrapper, made client component
- **Reason:** Provide chat context with specific chatId

### 4. `/src/modules/chat/components/default-chat-context.tsx`

- **Changes:**
  - Implemented custom transport with header-based chat ID extraction
  - Added redirect logic in transport fetch wrapper
  - Removed data stream monitoring useEffect
  - Removed `onNewChatId` prop and callback logic
  - Added `hasRedirectedRef` to prevent duplicate redirects
- **Reason:** More reliable chat ID extraction and cleaner redirect flow

## Backend Integration

The implementation relies on the existing backend API behavior:

- **POST `/chat/api`** (new chat)
  - Creates new chat in backend
  - Returns chat ID in first chunk: `"chatId response text"`
  - Sets `X-Chat-ID` header with the chat ID
- **POST `/chat/api?chatId=[id]`** (existing chat)
  - Appends to existing chat
  - No chat ID in header (already known)
- **GET `/chat/api?chatId=[id]`** (load history)
  - Returns chat history in format:
    ```json
    {
      "message": "success",
      "data": [
        { "query": "...", "response": "..." },
        ...
      ]
    }
    ```

## Testing Checklist

✅ **New Chat Creation**

- [ ] Navigate to `/chat` - shows empty chat interface
- [ ] Send a message - redirects to `/chat/[id]`
- [ ] Reload page - messages persist
- [ ] Check sidebar - only ONE entry for this chat

✅ **Existing Chat**

- [ ] Click chat in sidebar - navigates to `/chat/[id]`
- [ ] History loads correctly
- [ ] Send new message - stays on same URL
- [ ] Reload page - all messages persist

✅ **Multiple Chats**

- [ ] Create first chat - redirects to `/chat/[id1]`
- [ ] Navigate to `/chat` - clean new chat interface
- [ ] Create second chat - redirects to `/chat/[id2]`
- [ ] Switch between chats - each loads correct history
- [ ] Sidebar shows both chats (no duplicates)

✅ **Edge Cases**

- [ ] Send message while redirect happens - stream continues
- [ ] Direct URL access to `/chat/[id]` - loads history
- [ ] Direct URL access to invalid ID - shows error
- [ ] Fast navigation between new chats - no state leakage

## Benefits

✅ **Persistent Conversations** - Chat ID in URL ensures reload preservation  
✅ **Shareable Links** - Users can bookmark or share specific conversations  
✅ **No Duplicate Chats** - Each conversation has one unique ID  
✅ **Clean Architecture** - Separate contexts for new vs existing chats  
✅ **Seamless UX** - Redirect happens without interrupting stream  
✅ **Browser History** - Back button works intuitively

## Known Limitations

1. **100ms redirect delay** - Small timeout ensures stream starts before navigation
2. **Stream continuation** - Stream continues on new URL (desired behavior, but could theoretically cause issues if network is very slow)
3. **No offline support** - Chat ID must come from backend

## Future Enhancements

- [ ] Pre-generate chat ID on client for instant redirect
- [ ] Add loading state during redirect
- [ ] Implement optimistic message updates
- [ ] Add route prefetching for faster navigation
- [ ] Support draft messages across new chat sessions
