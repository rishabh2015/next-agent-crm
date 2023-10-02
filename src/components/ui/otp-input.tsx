import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "../shadcn/ui/input"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  length?: number
  onChange?: (value: string) => void;
}

const DEFAULT_OTP_LENGTH = 4;

const OTPInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, length = DEFAULT_OTP_LENGTH, onChange, ...props }, ref) => {

    let localRef = React.useRef<HTMLDivElement>(null);
    let componentRef = localRef;
    // let componentRef = ref ?? localRef;

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      const inputs = componentRef.current?.querySelectorAll('input');
      if (!inputs) return;
      if (!(event.target instanceof HTMLInputElement)) return;

      const i = Number(event.target.dataset.index);
      const isFirst = i === 0;
      const isLast = i === inputs.length - 1;
      const hasValue = inputs[i].value !== '';

      if (event.key === "Backspace") {
        if (hasValue) {
          // if has value, clear current
          inputs[i].value = '';
        } else if (!isFirst) {
          // if no value, clear previous
          inputs[i - 1].value = '';
          inputs[i - 1].focus();
        }
      } else {
        let key = parseInt(event.key);
        if (isNaN(key)) return;

        inputs[i].value = event.key;
        if (!isLast) inputs[i + 1].focus(); // untill last, focus next

      }
      const value = Array.from(inputs).map(input => input.value).join('');
      onChange && onChange(value);

      event.preventDefault();
    }

    return (
      <div
        className={cn("flex flex-row justify-center text-center px-2 mt-5", className)}
        ref={componentRef}
        {...props}
      >
        {Array.from({ length }).map((_, i) => (
          <Input key={i} type="number" maxLength={1} data-index={i} className="m-2 w-10 text-center" onKeyDown={handleKeyDown} />
        ))}
      </div>
    )
  }
)
OTPInput.displayName = "OTPInput"

export { OTPInput }
