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




class SDK(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext){
    override fun getName() = "SDK"

    private var core: Core? = null
    private lateinit var callback: Callback
    var isCallbackInvoked = false


    val waitForServerAnswer = MutableLiveData<Boolean>()


    override fun initialize() {
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

            if (state == RegistrationState.Failed ) {                            
                if (!isCallbackInvoked) callback.invoke(state.toString())
                isCallbackInvoked=true
            } else if (state == RegistrationState.Ok) {
                Log.i("[Assistant] [Generic Login] Registration state is")
                if (!isCallbackInvoked) callback.invoke(state.toString())
                isCallbackInvoked=true                    
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
                    Log.i("[Assistant] [Generic Login] Registration state is")
                }

                Call.State.Connected -> {

                }

                Call.State.Released -> {

                }
                else ->{
                
                }
            }
        }
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
            if (!isCallbackInvoked) callback.invoke("err ${e}")
            isCallbackInvoked=true
        }   
        
    }
    
    fun createAccountAndAuthInfo() {
        waitForServerAnswer.value = true
        // accountCreator.username = "7001"
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