# gravitee-cordova

## Install
* [NodeJS](https://nodejs.org/en/)
* Install cordova :
    * Open your terminal
    * Write >> npm install -g cordova
    * To verify >> cordova --version
* Install [Java SE Development kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
* Install [android SDK](http://www.clubic.com/telecharger-fiche280710-android-sdk.html)
* Install [apache ant](http://ant.apache.org/)
* Add bin folders to your PATH

## Verify
* Open new terminal :
    * java --version
    * ant --version
    * adb --help

## Build and Run
* Copy the repository to your computer

### first solution
* With your terminal, go to the work repository then App folder
* Write :
    * >> cordova platforms add android
    * >> cordova build
    * >> android
        * tools -> manage avds -> device definitions -> nexus S -> create avd -> ok -> start -> launch
    * >> cordova emulate android

### second solution
* Install google chrome
* Install [Ripple Emulator](https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc)
* localhost/.../App/www/
* Ripple enable

### third solution
* With your terminal, go to the work repository then App folder
* Write :
    * >> cordova platforms add android
* Install [android studio](https://developer.android.com/studio/index.html)
* Run android studio :
    * import project
    * run android, green button
