import { useEffect } from "react";

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div>{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-3">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function DialogFooter({ children }) {
  return <div className="mt-5 flex justify-end gap-3">{children}</div>;
}
