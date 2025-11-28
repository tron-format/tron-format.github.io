import type { JsonValue } from "@toon-format/toon";

export type Dataset = {
  name: string;
  label: string;
  description: string;
  analysis?: string;
  source?: string;
  dateRetrieved?: string;
  data: JsonValue;
}