package com.voip_rn

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
// import io.wazo.callkeep.RNCallKeepModule; // Add these import lines
// import androidx.annotation.NonNull
// import androidx.annotation.Nullable

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "voip_rn"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

//   override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
//     super.onRequestPermissionsResult(requestCode, permissions, grantResults)
//     when (requestCode) {
//         RNCallKeepModule.REQUEST_READ_PHONE_STATE -> {
//             RNCallKeepModule.onRequestPermissionsResult(requestCode, permissions, grantResults)
//         }
//     }
// }

}
