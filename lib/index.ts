import path from 'path';
import child_process from "child_process";

const platform = require("os").platform();
const useWine = platform != "win32";

/**
 * Checks if Wine is installed
 * 
 * @returns boolean
 */
function checkWineInstall(): boolean {
    try {
        child_process.execSync("wine --version", {
            stdio: 'ignore'
        });
    } catch (e) {
        return false;
    }
    return true;
}

const isWindowsOrWine: boolean = (() => {
    switch (platform) {
        case "win32":
            return true; // Windows doesn't need Wine
        case "linux":
        case "darwin":
            return checkWineInstall();
        default:
            return false;
    }
})();

/**
 * Returns `true` if the system is running Windows or if Wine is installed in Linux or macOS. Otherwise, returns `false`.
 * This is useful when checking if the rest of the child process functions can be safely used without running the child process functions.
 * 
 * @returns `true` if running on Windows or if Wine is installed in Linux or macOS, or `false` otherwise
 */
export function checkWindowsOrWine() {
    return isWindowsOrWine;
}

/**
 * Calls exec function from child_process module. Wine is automatically used when using Linux or macOS.
 * 
 * Returns the `child_process.ChildProcess` if successful or `null` if using Linux or macOS with no Wine installed
 * 
 * For more information, please refer to child_process.exec [documentation](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback).
 * 
 * @param command The command to run, with space-separated arguments.
 * @param options Additional options for the exec function.
 * @param callback Called with the output when process terminates.
 * 
 * @returns child_process.ChildProcess | null
 */
export function exec(command: string, options: child_process.ExecOptions,
    callback?: ((error: child_process.ExecException | null, stdout: string, stderr: string) => void))
    : child_process.ChildProcess | null {

    if (!isWindowsOrWine) return null;

    if (!useWine) return child_process.exec(command, options, callback);

    let cmd = command;
    if (typeof options.cwd === 'string') {
        cmd = path.join(options.cwd, cmd);
    }

    return child_process.exec(`wine ${cmd}`, options, callback);

}

/**
 * Calls execFile function from child_process module. Wine is automatically used when using Linux or macOS.
 * 
 * Returns the `child_process.ChildProcess` if successful or `null` if using Linux or macOS with no Wine installed
 * 
 * For more information, please refer to child_process.execFile [documentation](https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback).
 * 
 * @param file The name or path of the executable file to run.
 * @param args List of string arguments.
 * @param options Additional options for the execFile function.
 * @param callback Called with the output when process terminates.
 * 
 * @returns child_process.ChildProcess | null
 */
export function execFile(file: string, args: readonly string[], options: child_process.ExecFileOptions,
    callback?: ((error: child_process.ExecFileException | null, stdout: string | Buffer, stderr: string | Buffer) => void))
    : child_process.ChildProcess | null {

    if (!isWindowsOrWine) return null;

    if (!useWine) return child_process.execFile(file, args, options, callback);

    let fl = file;
    if (typeof options.cwd === 'string') {
        fl = path.join(options.cwd, fl);
    }

    return child_process.execFile("wine", [fl, ...args], options, callback);

}

/**
 * Calls execSync function from child_process module. Wine is automatically used when using Linux or macOS.
 * 
 * Returns the output Buffer or string if successful or `null` if using Linux or macOS with no Wine installed
 * 
 * For more information, please refer to child_process.execSync [documentation](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options).
 * 
 * @param command The command to run, with space-separated arguments.
 * @param options Additional options for the execSync function.
 * 
 * @returns Buffer | string | null
 */
export function execSync(command: string, options: child_process.ExecSyncOptions): Buffer | string | null {

    if (!isWindowsOrWine) return null;

    if (!useWine) return child_process.execSync(command, options);

    let cmd = command;
    if (typeof options.cwd === 'string') {
        cmd = path.join(options.cwd, cmd);
    }

    return child_process.execSync(`wine ${cmd}`, options);

}

/**
 * Calls execFileSync function from child_process module. Wine is automatically used when using Linux or macOS.
 * 
 * Returns the output Buffer or string if successful or `null` if using Linux or macOS with no Wine installed
 * 
 * For more information, please refer to child_process.execFileSync [documentation](https://nodejs.org/api/child_process.html#child_processexecfilesyncfile-args-options).
 * 
 * @param file The name or path of the executable file to run.
 * @param args List of string arguments.
 * @param options Additional options for the execFileSync function.
 * 
 * @returns Buffer | string | null
 */
export function execFileSync(file: string, args: readonly string[], options: child_process.ExecFileSyncOptions): Buffer | string | null {

    if (!isWindowsOrWine) return null;

    if (!useWine) return child_process.execFileSync(file, args, options);

    let fl = file;
    if (typeof options.cwd === 'string') {
        fl = path.join(options.cwd, fl);
    }

    return child_process.execFileSync("wine", [fl, ...args], options);

}