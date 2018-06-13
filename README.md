# Morph's Screeps

Useful details for VSCode autocompletion etc.

https://github.com/Garethp/ScreepsAutocomplete/issues/44

Autocomplete code found here - put in root folder of project: https://github.com/Garethp/ScreepsAutocomplete
Add _references.js to the Autocomplete directory as per https://gist.github.com/quonic/d7a7d385c85846027a7ca3dd03a0e985

The latter claims that adding jsconfig.json:
`{ "compilerOptions": { "target": "ES6" }, "exclude": [ "node_modules" ] }`

in the project will make it all work.

Others claim this is needed at the top of each file:
`/// <reference path="..\..\ScreepsAutocomplete\_references.js" />`

Truth remains to be seen...

Fallback: Typescript declaration from https://github.com/screepers/Screeps-Typescript-Declarations - Open in VSCode
