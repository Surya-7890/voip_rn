package com.voip_rn // replace your-apps-package-name with your app’s package name

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import org.linphone.core.*
import android.Manifest



class Test(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "Test"

    private var core: Core? = null

    @ReactMethod
    fun test(username: String, password: String, domain: String, cb: Callback) {  

        try{

            val mainActivity = currentActivity as MainActivity?
            core = mainActivity?.getCoreInstance()

            core?.let { safeCore ->

                val coreListener = object : CoreListenerStub() {
                    override fun onAccountRegistrationStateChanged(core: Core, account: Account, state: RegistrationState, message: String) {

                        if (state == RegistrationState.Failed ) {                            
                            cb.invoke(state.toString())
                        } else if (state == RegistrationState.Ok) {
                            cb.invoke(state.toString())                            
                        }
                    }
                }
                val transportType = TransportType.Udp
                val authInfo = Factory.instance().createAuthInfo(username, null, password, null, null, domain, null)
                val params = safeCore.createAccountParams()
                val identity = Factory.instance().createAddress("sip:$username@$domain")
                params.identityAddress = identity
                val address = Factory.instance().createAddress("sip:$domain")
                
                address?.transport = transportType
                params.serverAddress=address                

                val account = safeCore.createAccount(params)
                safeCore.addAuthInfo(authInfo)
                safeCore.addAccount(account)

                safeCore.defaultAccount = account
                safeCore.addListener(coreListener)                
                safeCore.start()         
                
            } ?: run {
                cb.invoke("err")
            }            
           
        }catch(e:Exception){
            cb.invoke(e)
        }      

        
        
    }
}