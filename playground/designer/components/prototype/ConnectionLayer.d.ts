/**
 * ConnectionLayer — prototype connections (bezier noodles) in world coords.
 */
export interface Connection {
  id: string;
  /** Source port (usually right-center of the source frame). */
  from: { x: number; y: number };
  /** Target (usually left-center of the target frame). */
  to: { x: number; y: number };
}

export interface ConnectionLayerProps extends React.SVGAttributes<SVGSVGElement> {
  connections: Connection[];
  /** Highlight this connection; others dim to 35%. */
  activeId?: string | null;
}
