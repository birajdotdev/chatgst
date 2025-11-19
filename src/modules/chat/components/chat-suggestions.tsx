import { Suggestion } from "@/components/ai-elements/suggestion";
import { CHAT_SUGGESTIONS } from "@/modules/chat/constants/chat-suggestions";

interface ChatSuggestionsProps {
  onClick?: (suggestion: string) => void;
}

export function ChatSuggestions({ onClick }: ChatSuggestionsProps) {
  return (
    <div>
      <h2 className="mb-3 text-base font-medium sm:text-lg md:mb-0">
        Here are some sample questions you can start with:
      </h2>
      <div className="mt-3 flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-2 md:mt-4 md:gap-4">
        {CHAT_SUGGESTIONS.map((suggestion) => (
          <Suggestion
            key={suggestion}
            suggestion={suggestion}
            onClick={onClick}
            className="text-xs tracking-tight sm:text-sm"
          />
        ))}
      </div>
    </div>
  );
}
