import path from "path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(path.resolve(process.cwd(), ".."));
loadEnvConfig(process.cwd());
