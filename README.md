# Classroom Export Viewer

Classroom Export Viewer is a Web-based tool for viewing JSON exports
(from Google Takeout) of Google Classroom data.

## Directory specification

From the root of the repository:
- `src/`: source files (modified during the build process)
- `static/`: static files (only copied during the build process)
- `dist/`: output (distribution) files
- `node_modules/`: `npm` dependencies fetched by `npm install`
- `package.json`: package specification for `npm`, including build scripts
  and dependencies
- `package-lock.json`: a file generated by `npm` containing a working
  configuration of dependencies with versions and the locations from
  which they were downloaded
- `.babelrc`: configuration for Babel (part of the build process)
- `rollup.config.js`: configuration for Rollup (part of the build process)
- `Makefile`: provided for convenience, so that Unix users can run `make`
  instead of `npm run build`
- `LICENSE`: the license for the project
- `README.md`: this file

## Contributing / trying out

Thank you for your contributions!

If you find any bugs or have any feature requests, please open an issue on
GitHub.

To try out Classroom Export Viewer on your own computer or to
contribute to this project, you will need [node.js](https://nodejs.org/),
and you will likely want a [git](https://git-scm.com/) client so that
you can clone a [fork](https://guides.github.com/activities/forking/)
of this repository and make changes.

After cloning or downloading this repository to your computer, open
a terminal or command prompt and navigate to the directory containing
your copy of the repository and run `npm install`. If `npm` gives any
errors, please check if you have the latest version of `npm` installed
and open an issue on GitHub if the error persists. After installing
the dependencies through `npm`, you can run `npm run build` to build
Classroom Export Viewer. Because Classroom Export Viewer is completely
client-side, you can run it by visiting `dist/index.html` in a Web browser.

By contributing to this project, you agree to release your
contributions under the MIT/Expat License as detailed in the file `LICENSE`.
