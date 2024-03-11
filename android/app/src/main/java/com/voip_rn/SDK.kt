package com.voip_rn

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import org.linphone.core.*
import android.Manifest
import androidx.lifecycle.MutableLiveData
import android.widget.Toast
import org.linphone.core.tools.Log


import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule





class SDK(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext){
    override fun getName() = "SDK"

    private var core: Core? = null

    private lateinit var callback: Callback
    var isCallbackInvoked = false

    var RC=reactContext;


    fun init() {
        super.initialize()
        val mainActivity = currentActivity as MainActivity?
        core = mainActivity?.getCoreInstance()
        core?.addListener(coreListener)
        core?.isPushNotificationEnabled = true
    }



    fun setCb(cb :Callback){
        this.callback=cb;
    }

    val coreListener = object : CoreListenerStub() {
        override fun onAccountRegistrationStateChanged(core: Core, account: Account, state: RegistrationState, message: String) {

            if (state == RegistrationState.Failed || state == RegistrationState.Ok) {                   
                
                val params = Arguments.createMap().apply {
                    putString("status", state.toString())
                }
                sendEvent(RC, "login", params)
            } 

        }

        override fun onCallStateChanged(
            core: Core,
            call: Call,
            state: Call.State?,
            message: String
        ){
            when(state){
                Call.State.IncomingReceived -> {
                    // core.currentCall?.accept()
                    val params = Arguments.createMap().apply {
                        putString("incoming", message.toString())
                    }
                    sendEvent(RC, "call", params)
                }

                Call.State.Connected -> {

                    val params = Arguments.createMap().apply {
                        putString("connect", call.remoteAddress.asStringUriOnly())
                    }
                    sendEvent(RC, "call", params)
                }

                Call.State.Released -> {

                }
                else ->{
                
                }
            }
        }
    }

    private var listenerCount = 0


    @ReactMethod
    fun addListener(eventName: String) {
        if (listenerCount == 0) {
            // Set up any upstream listeners or background tasks as necessary
        }
        
        // val eventEmitter = RC.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        // eventEmitter.addListener(eventName) { event ->
        //     // Handle the event here
        //     val eventData = event as WritableMap
        //     val incomingCall = eventData.getString("incoming")
        //     // Do something with the incoming call data
        // }

        listenerCount += 1
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        listenerCount -= count
        if (listenerCount == 0) {
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }



    private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          .emit(eventName, params)
    }


    @ReactMethod
    fun login(username: String, password: String, domain: String, cb: Callback) {

        try{
            isCallbackInvoked=false      
         
            
            setCb(cb)
            Log.i("[Assistant] [Generic Login] Registration state is")

            core?.let { safeCore ->   
                                
                val transportType = TransportType.Udp
                val authInfo = Factory.instance().createAuthInfo(username, null, password, null, null, domain, null)
               
                val params = safeCore.createAccountParams()
                val identity = Factory.instance().createAddress("sip:$username@$domain")
                params.identityAddress = identity
                val address = Factory.instance().createAddress("sip:$domain")
                
                address?.transport = transportType
                params.serverAddress=address   
                params.setRegisterEnabled(true)  
                params.pushNotificationAllowed = true        

                safeCore.addAuthInfo(authInfo)
                val account = safeCore.createAccount(params)
                safeCore.addAccount(account)

                safeCore.defaultAccount = account
                safeCore.addListener(coreListener)                
                safeCore.start()     
               
                
            } ?: run {
                val mainActivity = currentActivity as MainActivity?
                core = mainActivity?.getCoreInstance()
                if (!isCallbackInvoked) callback.invoke("err")
                isCallbackInvoked=true
            }            
           
        }catch(e:Exception){
            if (!isCallbackInvoked) callback.invoke("err ${e.toString()}")
            isCallbackInvoked=true
        }   
        
    }
    
 
   

    @ReactMethod
    fun accountStatus(cb:Callback){
        Log.i("[Assistant] [Generic Login] Registration state is")
        core?.let { safeCore ->
            if(safeCore.accountList.isEmpty()){
                cb.invoke(false)
                return 
            }else{
                cb.invoke(true)
                return
            }
            
        }?: run {
            val mainActivity = currentActivity as MainActivity?
            core = mainActivity?.getCoreInstance()            
        }     


    }
}