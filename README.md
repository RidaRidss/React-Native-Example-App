# React-Native-Example-App



## add following things & enjoy with react
## ===================================
#### your service BASE_URL ,
#### API_USER_NAME ,
#### API_PASSWORD in config/WebServices ,
#### place FacebookSDK folder at system path "~/Documents/"
#### get FacebookAppID,FacebookDisplayName by facebook steps from "https://developers.facebook.com/docs/facebook-login" for ios & replace below code in ios/app.xcodeproj/app/Info.plist file

`  <key>FacebookAppID</key>
  <string>111111111111111</string>
  <key>FacebookDisplayName</key>
  <string>app</string>`

## What custom things are added in it?
## ===================================

#### code for permission to access internet connection in ios/app.xcodeproj/app/Info.plist file

	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
	</dict>

#### code for permissions to access (calendar,photo gallery,camera,bluetooth,device location,speech recognization,contacts,background notification) in ios/app.xcodeproj/app/Info.plist file

`   <key>NSBluetoothPeripheralUsageDescription</key>
	<string>accessing bluetooth usage</string>
	<key>NSCalendarsUsageDescription</key>
	<string>accessing Calender Usage</string>
	<key>NSCameraUsageDescription</key>
	<string>accessing Camera usage</string>
	<key>NSContactsUsageDescription</key>
	<string>accessing contact usage</string>
	<key>NSLocationWhenInUseUsageDescription</key>
	<string>accesing location usage</string>
	<key>NSPhotoLibraryUsageDescription</key>
	<string>accessing camera gallery usage</string>
	<key>NSSpeechRecognitionUsageDescription</key>
	<string>accessing speech recognization</string>
	<key>UIBackgroundModes</key>
	<array>
		<string>audio</string>
		<string>location</string>
		<string>remote-notification</string>
	</array> `


#### drag and droped following sdks to the path  FacebookSDK folder at path ~"ios/app.xcodeproj/Framework" from path "~/Documents/"

##### SDK's list : 
##### Bolts.framework
##### FBSDKLoginKit.framework
##### FBSDKCoreKit.framework
##### FBSDKShareKit.framework


#### below code added in AppDelegate.m for facebook & map splash component delay work

`#import <FBSDKCoreKit/FBSDKCoreKit.h>

 @import GoogleMaps;
#import "SplashScreen.h"
  
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

    [SplashScreen show];


- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                                             annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
                  ];
  // Add any custom logic here.
  return handled;
}`



#### framework search paths added for facebook sdk / framework directory path and its value should be recursive
##### goto ios/app.xcodeproj -> Build Settings -> Framework Search Paths 
##### + field name = ~/Documents/FacebookSDK ,  value="recursive"
##### + field name = $(PROJECT_DIR)/Frameworks ,  value="recursive"

#### Following header search paths added at ios/app.xcodeproj -> Build Settings -> Header Search Paths for react , (fbsdk,keyboard manager,splash screen - node modules) and its value should be recursive
##### + field name = $(SRCROOT)/../node_modules/react-native-fbsdk/ios/RCTFBSDK ,  value="recursive"

##### + field name = $(SRCROOT)/../node_modules/react-native-keyboard-manager/ios ,  value="recursive"

##### + field name = $(SRCROOT)/../node_modules/react-native-splash-screen/ios ,  value="recursive"

#### Fonts and keyboardManager.bundle added at "ios/app.xcodeproj/" , given steps followed to add.
##### + Add 2 Groups in "ios/app.xcodeproj/" named "fonts" , "Resources" 

##### 1. place fonts from app/src/assets/fonts in "ios/app.xcodeproj/fonts" , then select all fonts from that folder and drag & drop to Build Phases -> Copy Bundle Resources , it will add fonts path for ios also

##### 2. place IQKeyboardManager.bundle from app/node_modules/react-native-keyboard-manager/ios/IQKeyboardManager/Resources , it will automatically add in ios/app.xcodeproj -> Build Phases -> Copy Bundle Resources

#### Google Map added by following steps

#### run following commands

 ##### sudo gem install cocoapods
 ##### cd ios
 
 ##### pod init

 #### Placed following code in podfile at "app/ios/Podfile"

##### pod 'GoogleMaps', '= 2.5.0'

#### run command 'pod install' at path "app/ios/"

##### drag and droped "AirGoogleMaps , AirMaps folders" from "app/node_modules/react-native-maps/lib/ios/AirGoogleMaps" & "app/node_modules/react-native-maps/lib/ios/AirGoogleMaps"

##### at path "ios/app.xcodeproj -> Build Phases -> +Added MapKit.framework , than mapkit added automatically from ios sdk

#### below code added for permissions to access (fb messenger,fb app , fb share , whatsapp , twitter , email) apps in ios/app.xcodeproj/app/Info.plist file

   ` <key>LSApplicationQueriesSchemes</key>
	<array>
		<string>fbapi</string>
		<string>fb-messenger-api</string>
		<string>fbauth2</string>
		<string>fbshareextension</string>
		<string>whatsapp</string>
		<string>twitter</string>
		<string>mailto</string>
	</array>`


#### post adding react native maps from pod , run "app.xcworkspace"
