# MULTEXT MSD builder

A builder for MSD style tags. Currently only Lithuanian (DLKT) tagset is supported but it shouldn't be hard to add others (see below).

It can't currently parse the tags (one day it will).

To use, *either*:

 * clone this repo (or download from releases page) and open `dist/index.html`
 * or go to [msd-builder.kludge.guru](https://msd-builder.kludge.guru)

## Development info

### Building

Install Node.js 8 or later, then run:

    npm run build
    
This will regenerate files in `dist`. While developing, you can also use

	npx webpack --watch

### Coding

The thing is written in TypeScript with a few tiny helper libs. I recommend using the WebStorm IDE but there are many other options.

`src/tagsets.ts` contains an array of references to tagsets. There is currently just one, and the `dev` directory contains the script used to source that.

## License

MIT. TL;DR do whatever you want but don't blame me for anything.
