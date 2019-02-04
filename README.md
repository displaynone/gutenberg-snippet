# Block Starter Kit
A boilerplate / starter kit for WordPress Editor (Gutenberg) blocks. 

## Purpose
This starter kit aims to give a 'keep only what you need' approach to block building that works for PHP only WordPress plugins, Block driven plugins, or a mixure of both.

The kit is full of useful code snippets and tutorials. Every folder will contain a README.md file that will contain an explanation and a usage example.

It also contains serveral 'starter blocks' with plenty of inline documentation.

## Getting Started

- Download the plugin into your 'plugins' folder. 
- cd into the folder
- run `npm install` to install the project dependancies
- run `npm run build` to compile the plugin assets

## Find and Replace
You can find and replace the following strings to make the plugin fit for your organisation:

`Author Name`  
Author of the plugin, eg: `Matt Watson` or `Make Do`.

`author-name@author.uri`
Author email address of the plugin, eg: `matt@makedo.net` or `hello@makedo.net`.

`author_wordpress_username`  
Comma seperated list of WordPress.org usernames to add them as contributors if/when the plugin is uploaded into the repository, eg: `mwtsn, davegreen, mkdo`.

`https://author.uri`   
Author URL, eg: `http://www.makedo.net`.

`company_name`   
Lowercase underscored short version of your company name, eg: `mkdo`.

`COMPANY_NAME`   
Uppercase underscored short version of your company name, eg: `MKDO`.

`https://donate.uri`  
Link to donate to the plugin (or remove this if not applicable).

`Plugin Name`   
Plugin name, eg `Block Starter Kit`.

`plugin_name`  
Lowercase underscored short version of your plugin name, eg: `block_starter_kit` or `bsk`.

`plugin-name`  
Lowercase dashed short version of your plugin name, eg: `block-starter-kit` or `bsk`.

`PLUGIN_NAME`  
Uppercase underscored short version of your plugin name, eg: `BLOCK_STARTER_KIT` or `BSK`.

`Plugin Description.`   
Description of your plugin. 

`https://plugin.uri`  
Link to the location of the plugin. eg. `https://github.com/mkdo/block-starter-kit`.

## Folder Structure

The following details the high level structure of the plugin, and detail the purpose of each folder and file.

Note that there will be README.md files in most folders, describing the purpose of the code within. 

- `/assets` — The assests folder. 
  - `/images` — Images that are used within the blocks
   - `/css` — The compiled CSS for the plugin
   - `/js` — The compiled JavaScript for the plugin
   - `/src` — The folder that contains the uncompiled (non block specific) JavaScript and CSS for the plugin
     - `/js` — The uncompiled (non block specific) JavaScript for the plugin
     - `/scss` — The uncompiled (non block specific) CSS for the plugin
- `/blocks` — WordPress Editor (Gutenberg) Blocks
  - `/examples` — Block based code examples with documentation
- `deploy` - Tools to deploy to the WordPress.org plugin repository
  - `/wp-org` — Assets for the WordPress plugin repository (header, icon and screenshots go here), uploaded with deploy script
  - `.deploy.sh` — Script to deploy to WordPress plugin repository
- `/docs` - Files and images that support the documentation
- `/php` — Non block specific PHP plugin code
  - `/examples` — Non block based code examples with documentation
- `/vendor` — A place to put third party code libraries
- `.babelrc` — The configuration for the webpack `babel` plugin
- `.gitignore` — Tells Git not to commit certain files
- **`index.php` — *Start Here* - The 'Main' class, that loads all other classes, functions and assets.**
- `LICENSE` — The Open Source licence for the plugin
- `package.json` — The npm dependancies for the project, and npm scripts. 
- `README.md` — This file!
- `readme.txt` — Starter WordPress plugin repository readme file.
- `webpack.config.js` — The webpack configruation for the project

## Credits

Original webpack configuration (before modifications) from [Zac Gordon's Gutenberg Course](https://github.com/zgordon/gutenberg-course).

Original deploy script (before modifications) from [Garry Jones](https://github.com/GaryJones/wordpress-plugin-git-flow-svn-deploy).
