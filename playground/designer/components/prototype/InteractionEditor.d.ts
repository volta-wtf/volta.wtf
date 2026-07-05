/**
 * InteractionEditor — trigger/action/target/transition editor for one
 * prototype interaction. Vocabulary: data/interactions.json.
 */
export interface InteractionValue {
  trigger?: string;
  action?: string;
  target?: string;
  transition?: string;
  easing?: string;
  /** ms */
  duration?: number;
}

export interface InteractionVocab {
  triggers: Array<{ id: string; name: string; icon?: string }>;
  actions: Array<{ id: string; name: string }>;
  transitions: Array<{ id: string; name: string }>;
  easings: Array<{ id: string; name: string; cssVar?: string }>;
  durations: { default: number; min: number; max: number; step: number };
}

export interface InteractionEditorProps {
  vocab: InteractionVocab;
  value?: InteractionValue;
  onChange?: (value: InteractionValue) => void;
  /** Navigable targets (frame names). */
  targets?: Array<string | { value: string; label: string }>;
  className?: string;
  style?: React.CSSProperties;
}
