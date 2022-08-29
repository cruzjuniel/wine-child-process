# Wine Child Process

A child process implementation that automatically utilizes wine when running Windows EXE applications in Linux and macOS.

This modules aims to be a simple bridge between the common [child process](https://nodejs.org/api/child_process.html) functions and Wine as required.


## Child Process Functions

Basic child process functions are provided that runs Wine automicatilly when running in Linux or macOS. Otherwise, these functions acts similarly to the [child process](https://nodejs.org/api/child_process.html) counterpart.

- [`exec`](#exec)
- [`execFile`](#execfile)
- [`execSync`](#execsync)
- [`execFileSync`](#execfilesync)


### `exec`

Calls exec function from child_process module. Wine is automatically used when using Linux or macOS.

Returns the `child_process.ChildProcess` if successful or `null` if using Linux or macOS with no Wine installed

For more information, please refer to child_process.exec [documentation](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback).

| Parameter  | Type                          | Description                                        |
|:---------- |:-----------------------------:|:-------------------------------------------------- |
| command    | string                        | The command to run, with space-separated arguments |
| options    | child_process.ExecOptions     | Additional options for the exec function           |
| callback   | callback(err, stdout, stderr) | Called with the output when process terminates     |


### `execFile`

Calls execFile function from child_process module. Wine is automatically used when using Linux or macOS.

Returns the `child_process.ChildProcess` if successful or `null` if using Linux or macOS with no Wine installed

For more information, please refer to child_process.execFile [documentation](https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback).

| Parameter  | Type                          | Description                                        |
|:---------- |:-----------------------------:|:-------------------------------------------------- |
| file       | string                        | The name or path of the executable file to run     |
| args       | readonly string[]             | List of string arguments                           |
| options    | child_process.ExecFileOptions | Additional options for the execFile function       |
| callback   | callback(err, stdout, stderr) | Called with the output when process terminates     |


### `execSync`

Calls execSync function from child_process module. Wine is automatically used when using Linux or macOS.

Returns the output Buffer or string if successful or `null` if using Linux or macOS with no Wine installed

For more information, please refer to child_process.execSync [documentation](https://nodejs.org/api/child_process.html#child_processexecsynccommand-options).

| Parameter  | Type                          | Description                                        |
|:---------- |:-----------------------------:|:-------------------------------------------------- |
| command    | string                        | The command to run, with space-separated arguments |
| options    | child_process.ExecOptions     | Additional options for the exec function           |


### `execFileSync`

Calls execFileSync function from child_process module. Wine is automatically used when using Linux or macOS.

Returns the output Buffer or string if successful or `null` if using Linux or macOS with no Wine installed

For more information, please refer to child_process.execFileSync [documentation](https://nodejs.org/api/child_process.html#child_processexecfilesyncfile-args-options).

| Parameter  | Type                          | Description                                        |
|:---------- |:-----------------------------:|:-------------------------------------------------- |
| file       | string                        | The name or path of the executable file to run     |
| args       | readonly string[]             | List of string arguments                           |
| options    | child_process.ExecFileOptions | Additional options for the execFile function       |


## Utility Functions

Some utility functions are also provided for basic check such as checking if Wine is installed in the system.


### `checkWindowsOrWine`

Returns `true` if the system is running Windows or if Wine is installed in Linux or macOS. Otherwise, returns `false`.

This is useful when checking if the rest of the child process functions can be safely used without running the child process functions.


## Usage Notes

It is advisable to check whether the functions can used to create child processes.

    if (checkWindowsOrWine()) {
        // Perform child process functions
    }

When using `cwd` option, the path is automatically joined with the exe command/file. This is only performed when running Linux and macOS since the main command becomes `wine`