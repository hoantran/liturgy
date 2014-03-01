HOW TO INSTALL A NEW LITURGY
=============================

GIT
* clone the app:
    git clone git@github.com:hoantran/liturgy.git DIRECTORY_OF_YOUR_CHOICE

COMPOSER
* install composer @ getcomposer.org globally
* composer update

that's good to run DEV

TO BUILD
* cd to:
    DIRECTORY_OF_YOUR_CHOICE
* install npm modules by running:
    npm install
* to build:
    grunt

ON TO SHARED HOSTING
--------------------
* clone the depository
* update: composer:
    php-cli /home4/bluepego/bin/composer.phar self-update
* update lavavel:
    php-cli /home4/bluepego/bin/composer.phar update

* copy the files over:
    extra/scripts/push.sh
    note:
        - modify dst and src, if needed
        - there's a commented out line for 1st time push

* first time:
    change the 'public' path in:
        bootstrap/paths.php
    tell
        'YOUR_WWW_DIRECTORY/index.php'
    where autoload.php and start.php are, such as:
        require __DIR__.'/../../apps/liturgy/bootstrap/autoload.php';

    modify mysql connection to reflect local environment:
        app/config/database.php:


GIT: fatal: CRLF would be replaced by LF
==========================
* sudo apt-get install dos2unix
* find . -type f -exec dos2unix {} +
* http://bit.ly/1lol4MI


HOW TO MIGRATE LITURGY
======================

COMPOSER
* install composer @ getcomposer.org globally

LARAVEL
* run:
    composer create-project laravel/laravel --prefer-dist A_DIRECTORY_NAME_TO_INSTALL_LARAVEL
* running laravel version: v4.1.18
* cd to A_DIRECTORY_NAME_TO_INSTALL_LARAVEL and run:
    composer update
* when checking in, just ignore vendor directory

TO UPGRADE TO A NEWER LARAVEL version
(notes for upgrading from 4.0.x to 4.1.x)

make destination directory to be the new laravel directory
the source directory is that of the github's liturgy:
    git@github.com:hoantran/liturgy.git


LARAVEL
* app/config/app.php: include new aliases and providers
* app/config/database.php: modify mysql connection to reflect local environment
* app/controllers: copy everything over that are not BaseController.php and HomeController.php
* app/models: copy everything over
* app/routes.php: copy over
* app/views/marionette.php: copy over

OTHERS
* extra: copy over
* Gruntfile.js: copy
* package.json

public
copy over:
* favicon.ico
* SpecRunner.html
* css
* fonts
* img
* js
* create a link to the songs directory, eg. (in public directory):
    ln -s /Users/hoantran/DeveloperPego/backbone/liturgy/songs songs

SQL
* run the latest sql file in
    extra/sql

and voila!


TO BUILD
* install npm, grunt
* run:
    npm install
  to install directory:
    node_modeles
* to build, run:
    grunt


TO RUN DEV

TO RUN PROD


TO INSTALL NPM, GRUNT
* Download and install Node.js: http://nodejs.org/#download
* On the command line, type npm install nodemon -g to install the nodemon (https://github.com/remy/nodemon) library globally. If it complains about user permissions type sudo npm install nodemon -g.
* If you have installed Grunt globally in the past, you will need to remove it first by typing npm uninstall -g grunt. If it complains about user permissions, type sudo npm uninstall -g grunt.
* Next, install the latest version of Grunt (http://gruntjs.com/ ) by typing npm install -g grunt-cli. If it complains about user permissions, type sudo npm install -g grunt-cli.
* Navigate to inside of the Backbone-Require-Boilerplate folder and type npm install









