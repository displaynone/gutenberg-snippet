=== Snippets Block ===
Contributors: displaynone
Tags: gutenberg, blocks, snippets, highlight.js
Requires at least: 5.0
Tested up to: 5.0
Stable tag: 1.0.2
License: GPL2+

Allows to add snippets blocks to your content: Javascript, CSS, HTML...

== Description ==
==== Purpose ====
Add snippet blocks to your WordPress content using the new Gutenberg editor

==== How to use it ====
- Add a Snippet block within your content
- Include your code
- Select the language
- Save the post and check your front-end

==== Supported languages ====

- Apache
- Bash
- C#
- C++
- CSS
- Erlang
- Go
- HTML
- XML
- Handlebars
- JSON
- Java
- JavaScript
- Markdown
- Objective C
- PHP
- Python
- R
- Ruby
- Rust
- SCSS
- SQL
- Shell
- Twig
- TypeScript

==== Credits ====

- Based in Making WordPress Do More [Block Starter Kit](https://github.com/mkdo/block-starter-kit)
- Original webpack configuration (before modifications) from [Zac Gordon\'s Gutenberg Course](https://github.com/zgordon/gutenberg-course).
- Original deploy script (before modifications) from [Garry Jones](https://github.com/GaryJones/wordpress-plugin-git-flow-svn-deploy).
- Webpack HMR thanks to [Christian Glingener](https://github.com/CGlingener)


== Installation ==
1. Backup your WordPress install
2. Upload the plugin folder to the `/wp-content/plugins/` directory
3. Activate the plugin through the \'Plugins\' menu in WordPress

== Screenshots ==
1. /snippets-block/assets/step1.png
2. /snippets-block/assets/step2.png
3. /snippets-block/assets/step3.png
4. /snippets-block/assets/step4.png

== Frequently Asked Questions ==

= What library does this plugin use?

It uses [highlight.js](https://highlightjs.org/)

= What highlight.js theme uses?

`androidstudio`

== Changelog ==

= 1.1.0 =

* Added copy button: it allows to copy to clipboard the content of the snippet
* Fixed `filemtime` in Windows

= 1.0.1 =
* Cleaning some first SVN version mess

= 1.0.0 =
* First version.

== Upgrade Notice ==

There are no upgrade notices at this time.

== Requirements ==

Gutenberg activated

== Known Issues ==

There are no known issues at this time.

== Roadmap ==

* Allow several themes
* Avoid `highlight.js` library in the frontend
