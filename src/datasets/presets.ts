import type { Dataset } from "./types";
import githubMcpTools from "./githubMcpTools";
import weatherApiResponse from "./weatherApiResponse";
import bakingRecipes from "./bakingRecipes";
import webServlets from "./webServlets";
import people100 from "./people100";

const presets: Dataset[] = [
  githubMcpTools,
  weatherApiResponse,
  bakingRecipes,
  people100,
  webServlets,
];

export default presets;
