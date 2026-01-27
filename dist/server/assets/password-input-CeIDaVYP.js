import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { EyeOff, Eye, Check, X } from "lucide-react";
import { I as InputGroup, d as InputGroupInput, a as InputGroupAddon, e as InputGroupButton } from "./input-group-HiwdIxtQ.js";
import { c as cn } from "./button-D5vTpyVN.js";
function PasswordInput({
  className,
  showStrengthIndicator = false,
  value: controlledValue,
  onChange: controlledOnChange,
  ...props
}) {
  const [visible, setVisible] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const id = React.useId();
  const type = visible ? "text" : "password";
  const password = controlledValue !== void 0 ? controlledValue : internalValue;
  const handleChange = (e) => {
    if (controlledOnChange) {
      controlledOnChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };
  const handleFocus = (e) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };
  const handleBlur = (e) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };
  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      {
        regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        text: "At least 1 special character"
      }
    ];
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text
    }));
  };
  const strength = checkStrength(password);
  const strengthScore = React.useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);
  const getStrengthColor = (score) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };
  const getStrengthText = (score) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full", className), children: [
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(
        InputGroupInput,
        {
          ...props,
          type,
          value: password,
          onChange: handleChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          "aria-label": props["aria-label"] ?? props.placeholder ?? "Password",
          "aria-describedby": showStrengthIndicator ? `${id}-description` : void 0
        }
      ),
      /* @__PURE__ */ jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsx(
        InputGroupButton,
        {
          "aria-pressed": visible,
          "aria-label": visible ? "Hide password" : "Show password",
          onClick: () => setVisible((v) => !v),
          size: "icon-xs",
          className: "bg-transparent!",
          children: visible ? /* @__PURE__ */ jsx(EyeOff, {}) : /* @__PURE__ */ jsx(Eye, {})
        }
      ) })
    ] }),
    showStrengthIndicator && isFocused && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "mt-3 mb-4 h-1.5 w-full overflow-hidden rounded-full bg-border",
          role: "progressbar",
          "aria-valuenow": strengthScore,
          "aria-valuemin": 0,
          "aria-valuemax": 4,
          "aria-label": "Password strength",
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`,
              style: { width: `${strengthScore / 4 * 100}%` }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        "p",
        {
          id: `${id}-description`,
          className: "mb-2 text-sm font-medium text-foreground",
          children: [
            getStrengthText(strengthScore),
            ". Must contain:"
          ]
        }
      ),
      /* @__PURE__ */ jsx("ul", { className: "space-y-1.5", "aria-label": "Password requirements", children: strength.map((req, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
        req.met ? /* @__PURE__ */ jsx(
          Check,
          {
            size: 16,
            className: "text-emerald-500",
            "aria-hidden": "true"
          }
        ) : /* @__PURE__ */ jsx(
          X,
          {
            size: 16,
            className: "text-muted-foreground/80",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: `text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`,
            children: [
              req.text,
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: req.met ? " - Requirement met" : " - Requirement not met" })
            ]
          }
        )
      ] }, index)) })
    ] })
  ] });
}
export {
  PasswordInput as P
};
