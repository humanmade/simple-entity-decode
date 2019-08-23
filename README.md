# Simple Entity Decode

![npm](https://img.shields.io/npm/v/simple-entity-decode)
![npm bundle size](https://img.shields.io/bundlephobia/min/simple-entity-decode)

A tiny library to decode HTML numeric entities and basic XML named entities.

Most entity libraries include complex handling for entities, and include the full list of named entities from the HTML specification. However, most applications and pages don't need this, and can instead normalise entities (e.g. on the server).

Specifically, this library decodes:

* Basic named entities (`&amp;`, `&apos;`, `&quot;`, `&lt;`, `&gt;`)
* Numeric decimal entities (`&#163;`)
* Numeric hexadecimal entities (`&#x000A3;`)

It does **not** handle other named entities.

## Licence

Copyright 2019 Human Made. Licensed under the [MIT license](LICENSE.txt).

Uses code from [he by Mathias Bynens](https://github.com/mathiasbynens/he). Used under the MIT license.
