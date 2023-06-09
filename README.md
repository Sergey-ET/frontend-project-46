# The Difference Generator

[![Actions Status](https://github.com/Sergey-ET/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Sergey-ET/frontend-project-46/actions)[![Node CI](https://github.com/Sergey-ET/frontend-project-46/workflows/Node%20CI/badge.svg)](https://github.com/Sergey-ET/frontend-project-46/actions)[![Maintainability](https://api.codeclimate.com/v1/badges/5a5f6c02276268a5dc45/maintainability)](https://codeclimate.com/github/Sergey-ET/frontend-project-46/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/5a5f6c02276268a5dc45/test_coverage)](https://codeclimate.com/github/Sergey-ET/frontend-project-46/test_coverage)

## Description

The Difference Generator is a CLI application that determines the difference between two data structures and is used when testing or automatically tracking changes in configuration files.
Utility capabilities:

- Support for different input formats: yaml, json;
- Report generation as plain text, stylish and json.

## Quick Start Guide 📕

To get started you must have **Node.js**

### Basic command

```bash
git@github.com:Sergey-ET/frontend-project-46.git # Clone this repository by SSH key locally
make install # Dependencies installation
npm link # Global installation of a package from a local directory
make gendiff -h (or --help) # Utility help
make gendiff [options] <filepath1> <filepath2> # Running the generator
```

## Utility examples

### Flat file comparison (JSON)

[![asciicast](https://asciinema.org/a/9uIlnc1HWrAvcpjv8m56e39GQ.svg)](https://asciinema.org/a/9uIlnc1HWrAvcpjv8m56e39GQ)

### Flat file comparison (YAML)

[![asciicast](https://asciinema.org/a/T0p78fSkoFgwzVgB5lHlFFhtH.svg)](https://asciinema.org/a/T0p78fSkoFgwzVgB5lHlFFhtH)

### Comparison of files with the nested structures in the 'stylish' format

[![asciicast](https://asciinema.org/a/HBVeODWz1Myz7pK3ReW035b7Y.svg)](https://asciinema.org/a/HBVeODWz1Myz7pK3ReW035b7Y)

### Comparison of files with the nested structures in the 'plain' format

[![asciicast](https://asciinema.org/a/41L2e3jajEV28tRUQvSMSCx1J.svg)](https://asciinema.org/a/41L2e3jajEV28tRUQvSMSCx1J)

### Comparison of files with the nested structures in the 'json' format

[![asciicast](https://asciinema.org/a/mR3G7sU3RGHgid1plzDLMQmYw.svg)](https://asciinema.org/a/mR3G7sU3RGHgid1plzDLMQmYw)
