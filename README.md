# Compile Schemas to TypeScript

This module is a wrapper around the `json-schema-to-typescript` library that enables transformation of directories of schemas instead of individual schemas. If directory support is added to the `json-schema-to-typescript` library this module will be archived.

## CLI

This module works as an CLI. Install as a dependency and call `compile-schemas-to-typescript` from a npm script, or use `npx`

```bash
npx compile-schemas-to-typescript <schema-dir> <types-output-dir>
```

## API

`compileSchema(input: string, output: string): Promise<void>`

The method iterates over the contents of the `input` directory and compiles any `.json` files into TypeScript interfaces and stores the generated output into the specified `output` directory.

```javascript
const compileSchemas = require('compile-schemas-to-typescript')

(async () => {
  try {
    await compileSchemas('./schemas', './types')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
```

## Contributing

This project is actively maintained by the Fastify team.

Contributions are welcome! Please open an issue and a pull request.

## License

Licensed under [MIT](./LICENSE).
