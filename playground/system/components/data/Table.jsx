import React from "react";
import { cn } from "../lib/cn.js";

/** Table — data table set. Wrap in the default overflow container. */
export function Table({ className = "", ...props }) {
  return (
    <div className="ds-table-wrap">
      <table className={cn("ds-table", className)} {...props} />
    </div>
  );
}
export function TableHeader({ className = "", ...props }) { return <thead className={className} {...props} />; }
export function TableBody({ className = "", ...props }) { return <tbody className={className} {...props} />; }
export function TableFooter({ className = "", ...props }) { return <tfoot className={className} {...props} />; }
export function TableRow({ className = "", ...props }) { return <tr className={className} {...props} />; }
export function TableHead({ className = "", ...props }) { return <th className={className} {...props} />; }
export function TableCell({ className = "", ...props }) { return <td className={className} {...props} />; }
export function TableCaption({ className = "", ...props }) { return <caption className={className} {...props} />; }
