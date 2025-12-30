import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm" : "npm";

function stop(child) {
  if (!child) return;

  try {
    if (isWindows) {
      spawn("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
        stdio: "ignore",
      });
      return;
    }

    child.kill("SIGINT");
  } catch {
  }
}

function runPowershell(command) {
  return new Promise((resolve) => {
    const child = spawn("powershell.exe", ["-NoProfile", "-Command", command], {
      stdio: "ignore",
    });
    child.on("exit", () => resolve());
    child.on("error", () => resolve());
  });
}

async function preflightCleanup() {
  if (!isWindows) return;

  const projectPath = process.cwd();
  const lockPath = path.join(projectPath, ".next", "dev", "lock");

  await rm(lockPath, { force: true }).catch(() => undefined);

  const escaped = projectPath.replaceAll("'", "''");

  await runPowershell(`
    $project='${escaped}';
    Get-CimInstance Win32_Process |
      Where-Object { $_.CommandLine -and ($_.CommandLine -like "*$project*") -and (($_.CommandLine -match "next") -or ($_.CommandLine -match "tsx")) } |
      ForEach-Object { try { Stop-Process -Id $_.ProcessId -Force -ErrorAction Stop } catch {} }
  `);

  await runPowershell(`
    $project='${escaped}';
    $ports = @(3000, 3001, 4000);
    foreach ($p in $ports) {
      try {
        $pids = @(Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique);
        foreach ($pid in $pids) {
          try {
            $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$pid";
            if ($proc.CommandLine -and ($proc.CommandLine -like "*$project*")) {
              Stop-Process -Id $pid -Force -ErrorAction Stop;
            }
          } catch {}
        }
      } catch {}
    }
  `);

  await rm(lockPath, { force: true }).catch(() => undefined);
}

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

await preflightCleanup();

const frontend = run("frontend", ["run", "dev"], process.cwd());
const backendCwd = fileURLToPath(new URL("../backend", import.meta.url));
const backend = run("backend", ["run", "dev"], backendCwd);

function shutdown(code = 0) {
  stop(frontend);
  stop(backend);

  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

frontend.on("exit", (code) => shutdown(code ?? 0));
backend.on("exit", (code) => shutdown(code ?? 0));
