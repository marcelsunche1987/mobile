# VITAL INTERPRETER APP


App setup / Read Me
========================
Install Homebrew 👍https://brew.sh/
Install Dependencies
brew install node
brew install watchman
brew install ruby
gem install bundler
Android
Install Java Development Kit
brew tap homebrew/cask-versions
brew install --cask zulu11
 
2. Install Android Studio
Download and install Android Studio. While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:
Android SDK
Android SDK Platform
Android Virtual Device
Then, click "Next" to install all of these components.
If the checkboxes are grayed out, you will have a chance to install these components later on.
Once setup has finalized and you're presented with the Welcome screen, proceed to the next step.
3. Install the Android SDK
Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 12 (S) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.
To do that, open Android Studio, click on "More Actions" button and select "SDK Manager".


This section is needed for other tools and Java.
Add to .zshrc file 

 export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
 export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
 export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools%
 
If ‘adb not found’ error occurs at any point.
Try the following:
 
Launch Android Studio
Launch SDK Manager via Tools -> Android -> SDK Manager
Check Android SDK Platform-Tools
Run the following command on your Mac and restart your Terminal session:
echo export "PATH=~/Library/Android/sdk/platform-tools:$PATH" >> ~/.bash_profile

Note: If you've switched to zsh, the above command should use .zshenv rather than .bash_profile


 iOS

Install Ruby: 
Any of the following Ruby version managers should be fine
rbenv
RVM
Chruby

Xcode​
The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.
If you have already installed Xcode on your system, make sure it is version 10 or newer.

Command Line Tools​
You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.




How to fix pod and cocoa pods issues iOS
=========================================

On Xcode 

Press command key + comma (,)

This will launch preferences window :
On the derivedData section, click on the small right arrow after the path on the same line as the advanced button to launch the finder displaying the derivedData folder.

Then drag the folder to the bin manually or use  
Command backspace to delete derivedData 

Close Xcode completely as well. 

In terminal run the following:

cd iOS 
rm -rf Pods/
npx  pod-install

If it doesn’t work and you get an error like this:

!] Your Podfile requires that the plugin `cocoapods-pod-linkage` be installed. Please install it and try installation again.

Then run:
 
Bundle exec pod install 

Links:
Extensible mobile app debugger | Flipper
ruby
Brew Install Ruby · Mac Install Guide 
cocoa pods install on iOS project not working
Bundler: The best way to manage a Ruby application's gems


## How do I get Set up?
Clone the repository ⇒  https://github.com/sorenson-eng/vital-interpreter-app.git
Run the command npm install –legacy-peer-deps
Switch to the appropriate branch ⇒ git checkout <branch name> e.g Sprint
Start metro using— npx react-native start
– ios
Start your application — cd into ios folder and run — npx react-native run ios
*** You can also run it directly from within Xcode
– Android
Start your application — cd into android folder and run — npx react-native run android

 

