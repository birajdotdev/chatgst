import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as Suggestion, b as Tooltip, c as TooltipTrigger, d as TooltipContent } from "./tooltip-DRYX_Imi.js";
import { useRef, useEffect, useState, useCallback, useMemo, useLayoutEffect, Fragment as Fragment$1, useContext, createContext, Children, Activity } from "react";
import { PaperclipIcon, XIcon, SendIcon, Loader2Icon, SquareIcon, PlusCircle } from "lucide-react";
import { nanoid } from "nanoid";
import { c as cn, B as Button } from "./button-D5vTpyVN.js";
import { I as InputGroup, a as InputGroupAddon, c as InputGroupTextarea, e as InputGroupButton } from "./input-group-HiwdIxtQ.js";
const ErrorCodes = {
  QUOTA_EXCEEDED: "QUOTA_EXCEEDED",
  BACKEND_ERROR: "BACKEND_ERROR",
  NO_RESPONSE_BODY: "NO_RESPONSE_BODY"
};
function sanitizeError(error) {
  if (error == null) {
    return {
      code: ErrorCodes.BACKEND_ERROR,
      message: "An unknown error occurred",
      status: 500
    };
  }
  if (typeof error === "string") {
    return {
      code: ErrorCodes.BACKEND_ERROR,
      message: error,
      status: 500
    };
  }
  if (error instanceof Error) {
    if (error.message.includes("quota")) {
      return {
        code: ErrorCodes.QUOTA_EXCEEDED,
        message: "You have reached your free quota. Please login to continue.",
        status: 403
      };
    }
    if (error.message.includes("No response body")) {
      return {
        code: ErrorCodes.NO_RESPONSE_BODY,
        message: "Failed to receive response from server",
        status: 500
      };
    }
    return {
      code: ErrorCodes.BACKEND_ERROR,
      message: "An error occurred while processing your request",
      status: 500
    };
  }
  if (typeof error === "object" && "code" in error && "message" in error) {
    return error;
  }
  return {
    code: ErrorCodes.BACKEND_ERROR,
    message: "An unknown error occurred",
    status: 500
  };
}
function parseClientError(error) {
  try {
    const parsed = JSON.parse(error.message);
    if (parsed && typeof parsed === "object" && "code" in parsed) {
      return parsed;
    }
  } catch {
  }
  return sanitizeError(error);
}
const CHAT_SUGGESTIONS = [
  "How can I file a GST appeal?",
  "What documents do I need for GST compliance?",
  "How does AI help in drafting appeals?",
  "What are the common GST penalty reasons?",
  "How to calculate interest on delayed GST payments?"
];
function ChatSuggestions({ onClick }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-3 text-base font-medium sm:text-lg md:mb-0", children: "Here are some sample questions you can start with:" }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-2 md:mt-4 md:gap-4", children: CHAT_SUGGESTIONS.map((suggestion) => /* @__PURE__ */ jsx(
      Suggestion,
      {
        suggestion,
        onClick,
        className: "text-xs tracking-tight sm:text-sm"
      },
      suggestion
    )) })
  ] });
}
const PromptInputController = createContext(
  null
);
const ProviderAttachmentsContext = createContext(
  null
);
const useOptionalPromptInputController = () => useContext(PromptInputController);
const useOptionalProviderAttachments = () => useContext(ProviderAttachmentsContext);
const LocalAttachmentsContext = createContext(null);
const usePromptInputAttachments = () => {
  const provider = useOptionalProviderAttachments();
  const local = useContext(LocalAttachmentsContext);
  const context = provider ?? local;
  if (!context) {
    throw new Error(
      "usePromptInputAttachments must be used within a PromptInput or PromptInputProvider"
    );
  }
  return context;
};
function PromptInputAttachment({
  data,
  className,
  ...props
}) {
  const attachments = usePromptInputAttachments();
  const mediaType = data.mediaType?.startsWith("image/") && data.url ? "image" : "file";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "group relative h-14 w-14 rounded-md border",
        className,
        mediaType === "image" ? "h-14 w-14" : "h-8 w-auto max-w-full"
      ),
      ...props,
      children: [
        mediaType === "image" ? /* @__PURE__ */ jsx(
          "img",
          {
            alt: data.filename || "attachment",
            className: "size-full rounded-md object-cover",
            height: 56,
            src: data.url,
            width: 56
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "flex size-full max-w-full cursor-pointer items-center justify-start gap-2 overflow-hidden px-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(PaperclipIcon, { className: "size-4 shrink-0" }),
          /* @__PURE__ */ jsxs(Tooltip, { delayDuration: 400, children: [
            /* @__PURE__ */ jsx(TooltipTrigger, { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsx("h4", { className: "w-full truncate text-left text-sm font-medium", children: data.filename || "Unknown file" }) }),
            /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx("h4", { className: "max-w-[240px] overflow-hidden text-left text-sm font-semibold break-words whitespace-normal", children: data.filename || "Unknown file" }),
              data.mediaType && /* @__PURE__ */ jsx("div", { children: data.mediaType })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            "aria-label": "Remove attachment",
            className: "absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100",
            onClick: () => attachments.remove(data.id),
            size: "icon",
            type: "button",
            variant: "outline",
            children: /* @__PURE__ */ jsx(XIcon, { className: "h-3 w-3" })
          }
        )
      ]
    },
    data.id
  );
}
function PromptInputAttachments({
  className,
  children,
  ...props
}) {
  const attachments = usePromptInputAttachments();
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) {
      return;
    }
    const ro = new ResizeObserver(() => {
      setHeight(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    setHeight(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, []);
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) {
      return;
    }
    setHeight(el.getBoundingClientRect().height);
  }, [attachments.files.length]);
  if (attachments.files.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    InputGroupAddon,
    {
      align: "block-start",
      "aria-live": "polite",
      className: cn(
        "overflow-hidden transition-[height] duration-200 ease-out",
        className
      ),
      style: { height: attachments.files.length ? height : 0 },
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 py-1", ref: contentRef, children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: attachments.files.filter((f) => !(f.mediaType?.startsWith("image/") && f.url)).map((file) => /* @__PURE__ */ jsx(Fragment$1, { children: children(file) }, file.id)) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: attachments.files.filter((f) => f.mediaType?.startsWith("image/") && f.url).map((file) => /* @__PURE__ */ jsx(Fragment$1, { children: children(file) }, file.id)) })
      ] })
    }
  );
}
const PromptInput = ({
  className,
  accept,
  multiple,
  globalDrop,
  syncHiddenInput,
  maxFiles,
  maxFileSize,
  onError,
  onSubmit,
  children,
  ...props
}) => {
  const controller = useOptionalPromptInputController();
  const usingProvider = !!controller;
  const inputRef = useRef(null);
  const anchorRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    const root = anchorRef.current?.closest("form");
    if (root instanceof HTMLFormElement) {
      formRef.current = root;
    }
  }, []);
  const [items, setItems] = useState([]);
  const files = usingProvider ? controller.attachments.files : items;
  const openFileDialogLocal = useCallback(() => {
    inputRef.current?.click();
  }, []);
  const matchesAccept = useCallback(
    (f) => {
      if (!accept || accept.trim() === "") {
        return true;
      }
      if (accept.includes("image/*")) {
        return f.type.startsWith("image/");
      }
      return true;
    },
    [accept]
  );
  const addLocal = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList);
      const accepted = incoming.filter((f) => matchesAccept(f));
      if (incoming.length && accepted.length === 0) {
        onError?.({
          code: "accept",
          message: "No files match the accepted types."
        });
        return;
      }
      const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
      const sized = accepted.filter(withinSize);
      if (accepted.length > 0 && sized.length === 0) {
        onError?.({
          code: "max_file_size",
          message: "All files exceed the maximum size."
        });
        return;
      }
      setItems((prev) => {
        const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - prev.length) : void 0;
        const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
        if (typeof capacity === "number" && sized.length > capacity) {
          onError?.({
            code: "max_files",
            message: "Too many files. Some were not added."
          });
        }
        const next = [];
        for (const file of capped) {
          next.push({
            id: nanoid(),
            type: "file",
            url: URL.createObjectURL(file),
            mediaType: file.type,
            filename: file.name
          });
        }
        return prev.concat(next);
      });
    },
    [matchesAccept, maxFiles, maxFileSize, onError]
  );
  const add = useMemo(
    () => usingProvider ? (files2) => controller.attachments.add(files2) : addLocal,
    [usingProvider, controller, addLocal]
  );
  const remove = useMemo(
    () => usingProvider ? (id) => controller.attachments.remove(id) : (id) => setItems((prev) => {
      const found = prev.find((file) => file.id === id);
      if (found?.url) {
        URL.revokeObjectURL(found.url);
      }
      return prev.filter((file) => file.id !== id);
    }),
    [usingProvider, controller]
  );
  const clear = useMemo(
    () => usingProvider ? () => controller.attachments.clear() : () => setItems((prev) => {
      for (const file of prev) {
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
      }
      return [];
    }),
    [usingProvider, controller]
  );
  const openFileDialog = useMemo(
    () => usingProvider ? () => controller.attachments.openFileDialog() : openFileDialogLocal,
    [usingProvider, controller, openFileDialogLocal]
  );
  useEffect(() => {
    if (!usingProvider) return;
    controller.__registerFileInput(inputRef, () => inputRef.current?.click());
  }, [usingProvider, controller]);
  useEffect(() => {
    if (syncHiddenInput && inputRef.current && files.length === 0) {
      inputRef.current.value = "";
    }
  }, [files, syncHiddenInput]);
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const onDragOver = (e) => {
      if (e.dataTransfer?.types?.includes("Files")) {
        e.preventDefault();
      }
    };
    const onDrop = (e) => {
      if (e.dataTransfer?.types?.includes("Files")) {
        e.preventDefault();
      }
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        add(e.dataTransfer.files);
      }
    };
    form.addEventListener("dragover", onDragOver);
    form.addEventListener("drop", onDrop);
    return () => {
      form.removeEventListener("dragover", onDragOver);
      form.removeEventListener("drop", onDrop);
    };
  }, [add]);
  useEffect(() => {
    if (!globalDrop) return;
    const onDragOver = (e) => {
      if (e.dataTransfer?.types?.includes("Files")) {
        e.preventDefault();
      }
    };
    const onDrop = (e) => {
      if (e.dataTransfer?.types?.includes("Files")) {
        e.preventDefault();
      }
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        add(e.dataTransfer.files);
      }
    };
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);
    return () => {
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("drop", onDrop);
    };
  }, [add, globalDrop]);
  useEffect(
    () => () => {
      if (!usingProvider) {
        for (const f of files) {
          if (f.url) URL.revokeObjectURL(f.url);
        }
      }
    },
    [usingProvider, files]
  );
  const handleChange = (event) => {
    if (event.currentTarget.files) {
      add(event.currentTarget.files);
    }
  };
  const convertBlobUrlToDataUrl = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const ctx = useMemo(
    () => ({
      files: files.map((item) => ({ ...item, id: item.id })),
      add,
      remove,
      clear,
      openFileDialog,
      fileInputRef: inputRef
    }),
    [files, add, remove, clear, openFileDialog]
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = usingProvider ? controller.textInput.value : (() => {
      const formData = new FormData(form);
      return formData.get("message") || "";
    })();
    if (!usingProvider) {
      form.reset();
    }
    Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      files.map(async ({ id: _id, ...item }) => {
        if (item.url && item.url.startsWith("blob:")) {
          return {
            ...item,
            url: await convertBlobUrlToDataUrl(item.url)
          };
        }
        return item;
      })
    ).then((convertedFiles) => {
      try {
        const result = onSubmit({ text, files: convertedFiles }, event);
        if (result instanceof Promise) {
          result.then(() => {
            clear();
            if (usingProvider) {
              controller.textInput.clear();
            }
          }).catch(() => {
          });
        } else {
          clear();
          if (usingProvider) {
            controller.textInput.clear();
          }
        }
      } catch {
      }
    });
  };
  const inner = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "hidden", ref: anchorRef }),
    /* @__PURE__ */ jsx(
      "input",
      {
        accept,
        "aria-label": "Upload files",
        className: "hidden",
        multiple,
        onChange: handleChange,
        ref: inputRef,
        title: "Upload files",
        type: "file"
      }
    ),
    /* @__PURE__ */ jsx(
      "form",
      {
        className: cn("w-full", className),
        onSubmit: handleSubmit,
        ...props,
        children: /* @__PURE__ */ jsx(InputGroup, { className: "rounded-xl", children })
      }
    )
  ] });
  return usingProvider ? inner : /* @__PURE__ */ jsx(LocalAttachmentsContext.Provider, { value: ctx, children: inner });
};
const PromptInputBody = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx("div", { className: cn("contents", className), ...props });
const PromptInputTextarea = ({
  onChange,
  className,
  placeholder = "What would you like to know?",
  ...props
}) => {
  const controller = useOptionalPromptInputController();
  const attachments = usePromptInputAttachments();
  const [isComposing, setIsComposing] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isComposing || e.nativeEvent.isComposing) {
        return;
      }
      if (e.shiftKey) {
        return;
      }
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
    if (e.key === "Backspace" && e.currentTarget.value === "" && attachments.files.length > 0) {
      e.preventDefault();
      const lastAttachment = attachments.files.at(-1);
      if (lastAttachment) {
        attachments.remove(lastAttachment.id);
      }
    }
  };
  const handlePaste = (event) => {
    const items = event.clipboardData?.items;
    if (!items) {
      return;
    }
    const files = [];
    for (const item of items) {
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }
    if (files.length > 0) {
      event.preventDefault();
      attachments.add(files);
    }
  };
  const controlledProps = controller ? {
    value: controller.textInput.value,
    onChange: (e) => {
      controller.textInput.setInput(e.currentTarget.value);
      onChange?.(e);
    }
  } : {
    onChange
  };
  return /* @__PURE__ */ jsx(
    InputGroupTextarea,
    {
      className: cn("field-sizing-content max-h-48 min-h-16", className),
      name: "message",
      onCompositionEnd: () => setIsComposing(false),
      onCompositionStart: () => setIsComposing(true),
      onKeyDown: handleKeyDown,
      onPaste: handlePaste,
      placeholder,
      ...props,
      ...controlledProps
    }
  );
};
const PromptInputFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  InputGroupAddon,
  {
    align: "block-end",
    className: cn("justify-between gap-1", className),
    ...props
  }
);
const PromptInputTools = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx("div", { className: cn("flex items-center gap-1", className), ...props });
const PromptInputButton = ({
  variant = "ghost",
  className,
  size,
  ...props
}) => {
  const newSize = size ?? (Children.count(props.children) > 1 ? "sm" : "icon-sm");
  return /* @__PURE__ */ jsx(
    InputGroupButton,
    {
      className: cn(className),
      size: newSize,
      type: "button",
      variant,
      ...props
    }
  );
};
const PromptInputSubmit = ({
  className,
  variant = "default",
  size = "icon-sm",
  status,
  children,
  ...props
}) => {
  let Icon = /* @__PURE__ */ jsx(SendIcon, { className: "size-4" });
  if (status === "submitted") {
    Icon = /* @__PURE__ */ jsx(Loader2Icon, { className: "size-4 animate-spin" });
  } else if (status === "streaming") {
    Icon = /* @__PURE__ */ jsx(SquareIcon, { className: "size-4" });
  } else if (status === "error") {
    Icon = /* @__PURE__ */ jsx(XIcon, { className: "size-4" });
  }
  return /* @__PURE__ */ jsx(
    InputGroupButton,
    {
      "aria-label": "Submit",
      className: cn(className),
      size,
      type: "submit",
      variant,
      ...props,
      children: children ?? Icon
    }
  );
};
function AIPromptInput({
  ref,
  className,
  value,
  onChange,
  onSubmit,
  status,
  placeholder = "Type any queries related to GST here",
  showUploadButton = false
}) {
  return /* @__PURE__ */ jsxs(
    PromptInput,
    {
      className: cn("rounded-xl bg-background drop-shadow-xl", className),
      onSubmit,
      globalDrop: true,
      multiple: true,
      children: [
        /* @__PURE__ */ jsxs(PromptInputBody, { children: [
          /* @__PURE__ */ jsx(PromptInputAttachments, { children: (attachment) => /* @__PURE__ */ jsx(PromptInputAttachment, { data: attachment }) }),
          /* @__PURE__ */ jsx(
            PromptInputTextarea,
            {
              ref,
              onChange: (e) => onChange?.(e.target.value),
              value,
              placeholder
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(PromptInputFooter, { children: [
          /* @__PURE__ */ jsx(PromptInputTools, { children: /* @__PURE__ */ jsx(Activity, { mode: showUploadButton ? "visible" : "hidden", children: /* @__PURE__ */ jsx(AIPromptInputUploadButton, {}) }) }),
          /* @__PURE__ */ jsx(
            PromptInputSubmit,
            {
              disabled: status === "submitted",
              status,
              className: "rounded-full"
            }
          )
        ] })
      ]
    }
  );
}
function AIPromptInputUploadButton() {
  const attachments = usePromptInputAttachments();
  return /* @__PURE__ */ jsxs(
    PromptInputButton,
    {
      variant: "outline",
      className: "rounded-full",
      onClick: () => attachments.openFileDialog(),
      children: [
        /* @__PURE__ */ jsx(PlusCircle, {}),
        /* @__PURE__ */ jsx("span", { children: "Upload Document" })
      ]
    }
  );
}
export {
  AIPromptInput as A,
  ChatSuggestions as C,
  ErrorCodes as E,
  parseClientError as p
};
