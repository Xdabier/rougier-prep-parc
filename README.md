# rougier-prep-parc
This is the first version of the app "Fiche prep parc" of group rougier

To prod build the app

in the root folder run: 

1- 
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```
2-
```bash
cd ./android
```
3-
```bash
./gradlew assembleDebug
```
