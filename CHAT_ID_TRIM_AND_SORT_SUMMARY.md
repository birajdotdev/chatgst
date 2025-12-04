# Chat ID Trimming and Sidebar Sorting Improvements

## Changes Implemented

### 1. ✅ Chat ID Trimming for All Chats

**Problem**: The chat ID was being displayed at the beginning of the AI's response for existing chats, similar to how it was for new chats before the previous fix.

**Solution**: Updated the API route to _always_ attempt to extract and remove the chat ID from the first chunk of the streaming response.

**File Modified**: `/src/app/(protected)/chat/api/route.ts`

**Changes**:

```typescript
// Before
if (isFirstChunk && !chatId) { ... }

// After
if (isFirstChunk) { ... }
```

Now, regardless of whether a `chatId` was provided in the request (existing chat) or not (new chat), the code checks for the ID prefix in the response and removes it.

### 2. ✅ Sidebar History Sorting

**Problem**: The chat history in the sidebar was not sorted by the most recent time.

**Solution**: Sorted the chats array by `created_at` in descending order before grouping them by date.

**File Modified**: `/src/modules/chat/components/nav-chats.tsx`

**Changes**:

```typescript
// Sort chats by date descending
const sortedChats = [...chats].sort((a, b) =>
  new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
);

const sidebarItems = sortedChats.reduce(...)
```

**Result**:

- The most recently created chats now appear at the top of the list.
- Within each date group (e.g., "Today"), chats are also sorted by time.

## Verification

### Chat ID Trimming

1. Open an existing chat.
2. Send a message.
3. Verify that the AI's response does _not_ start with the chat ID (e.g., "6931395...").

### Sidebar Sorting

1. Create a new chat.
2. Verify it appears at the top of the "Today" section in the sidebar.
3. Check older chats to ensure they are ordered correctly by date.
