package com.voip_rn

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.linphone.core.*
import android.os.Bundle
import com.facebook.react.bridge.ReactContext



class MainActivity : ReactActivity() {
  private  var core: Core?=null

  override fun onCreate(savedInstanceState: Bundle?) {    
    super.onCreate(savedInstanceState)
    val factory = Factory.instance()
    factory.setDebugMode(true,"hello Linephone")
    core=factory.createCore(null,null,this)    
  }

  fun getCoreInstance(): Core?{
    return core
  }

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
}
