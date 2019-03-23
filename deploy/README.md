# Deploy the plugin

A script that does the following:

- Commits changes to GitHub
- Tags a release on GitHub with the same version number as your new release
- Pushes the plugin to the WordPress.org repository via SVN
- Adds the assets in the `/wp-org` folder to the `/assets` folder in SVN

## How to Use
From the root of the plugin folder type the following command:

`sh deploy/deploy.sh`

Then just fill in the blanks.

## What is `/wp-org`
This is where you put all the images that relate to your plugin, that will be displayed on the WordPress.org repository. It contains the following:

- `banner-772x250` — the regular sized banner for the WordPress.org repository page.
- `banner-1544x500` — the retina / high resoloution sized banner for the WordPress.org repository page.
- `icon-128x128` - the regular sized icon for the WordPress.org repository listing.
- `banner-256x256` — the retina / high resoloution sized banner for the WordPress.org repository listing.

You can also add screenshots to this folder, ensuring they have the following file names:

- `screenshot-1`
- `screenshot-2`
- etc...

You can label these via the `readme.txt` file in the root of the plugin.

## Credits

Original deploy script (before modifications) from [Garry Jones](https://github.com/GaryJones/wordpress-plugin-git-flow-svn-deploy). See the `LICENCE` file in this directory for details of earlier contributers.