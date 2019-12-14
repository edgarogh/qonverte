# [qonverte](https://www.npmjs.com/package/qonverte)

> `qonverte` is a very simple pipe-based command line tool to convert between multiple data representation formats (hex, base64, base85, binary).
> 
> The project is bad on a few aspects. It's node, so it's probably slow and quite large for something that won't be used often. I built this as a kind of exercise where I'm trying to make the whole tool look polished (i.e. autocompletion, actual data streaming), while simple. I don't really recommend using it in prod, but it it great for manual use in your shell.

## Examples

 * `echo "Hello world" | qonverte to hex > h.txt` --> qonvertes `Hello world` to hex and writes it to a file
 * `curl https://pastebin.com/raw/qTDyLpPT | qonverte base64` --> Queries a URL and prints its base64-decoded content

## Installation

`npm i -g qonverte`

### Autocompletion

When you install qonverte, it comes packaged with autocompletion support for `bash`, `zsh` and `fish`. You can manually reinstall them by typing `npm run postinstall` in the module directory.

## Usage

The syntaxes are relatively natural / human-readable. 3 syntaxes are supported:

 * `qonverte hex to base64`
 * `qonverte hex` --> Input is _hex_, will be qonverted to _binary/text_
 * `qonverte to base85` --> Input is _binary/text_, will be qonverted to _base85_

Remember that `qonverte` is built around pipes, you give it something, it outputs something. There aren't — and won't be — any ways to use files or string arguments as input arguments. To input static data, use `echo ...` or `< file`. Output data will be sent to `stdout` by default, and you can use `> file` to store it as usual.
