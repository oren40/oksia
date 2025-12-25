import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm" : "npm";

function run(label, args, cwd) {
  const env = {
    ...process.env,
    DEV_ALL_LABEL: label,
  };

  const child = isWindows
    ? spawn("cmd.exe", ["/d", "/s", "/c", `${npmCmd} ${args.join(" ")}`], {
        cwd,
        stdio: "inherit",
        env,
      })
    : spawn(npmCmd, args, {
        cwd,
        stdio: "inherit",
        env,
      });

  child.on("exit", (code) => {
    console.log(`[${label}] exited with code ${code ?? 0}`);
  });

  return child;
}

const frontend = run("frontend", ["run", "dev"], process.cwd());
const backendCwd = fileURLToPath(new URL("../backend", import.meta.url));
const backend = run("backend", ["run", "dev"], backendCwd);

function shutdown(code = 0) {
  try {
    frontend.kill("SIGINT");
  } catch {
  }

  try {
    backend.kill("SIGINT");
  } catch {
  }

  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

frontend.on("exit", (code) => shutdown(code ?? 0));
backend.on("exit", (code) => shutdown(code ?? 0));
