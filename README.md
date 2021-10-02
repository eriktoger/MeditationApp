My meditation app

A learning tool for react native, typescript and firebase.
Maybe if things go well (and I have time), I will release it to the Google app store.

I have only tested the app on Andorid.

For some basic commands check the readme for https://github.com/eriktoger/GameHub

Creating APK
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android
./gradlew assembleRelease

cd app/build/outputs/apk
adb install -r release/app-release.apk
