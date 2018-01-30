# React-Native-Example-App


#### api integrated  , add your service base_url , username , pass and get started


##### Facebook , device location integrated for ios & android both


#### add below permission to access internet connection in ios

	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
	</dict>

#### add below permissions to access (calendar,photo gallery,camera,bluetooth,device location,speech recognization,contacts,background notification) in plist file for IOS

`    <key>NSBluetoothPeripheralUsageDescription</key>
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

#### add below permissions to access (fb messenger,fb app , fb share , whatsapp , twitter , email) apps in plist file for IOS

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
#### place FacebookSDK folder at path ~/Documents/