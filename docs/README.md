# Overview

## Setup and dependencies

Python dependencies are encoded in a `requirements.txt` file, but `nbsphinx`
requires [pandoc](https://pandoc.org/installing.html) to be installed on the
system. At this time, `pandoc` must be installed manually.

## Understanding the documentation system

1. Source files for the documentation are .md and .ipynb files stored in the `/docs`, from the project root
2. The `/docs/build_docs.sh` script uses `sphinx` to generate JSON documents containing the converted HTML docs
3. The script copies the JSON documents to this `/src/docs` directory
4. When the application in built, all `*.json` files are imported via Webpack
5. The JSON/HTML is rendered within the application, and any `reference internal` links are handled by React Router

## Adding documentation

To add documentation, commit markdown or ipynb files directly to the
`docs/api` or `docs/compute` directories. These files can include directives
as allowed by [My-ST Parser](https://myst-parser.readthedocs.io/en/latest/).
Manually edit the `index.md` file to include the new documentation pages into
the Table of Contents.

To generate the rendered docs and incorporate them into the application for
development, run the `./build_docs.sh` script. The generated markup is not
checked into the repository, but is build and bunded during the CI build
process for production.