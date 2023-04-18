package com.goodbad.fiilis;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class NotificationModule extends ReactContextBaseJavaModule {
    NotificationModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() { return "NotificationModule"; }

    @ReactMethod
    public void createNotification(int hours, int minutes, int seconds) {
        Log.d("NotificationModule", "Create notification with time: " + hours + ":" + minutes + ":" + seconds);
        RepeatingNotification rn = new RepeatingNotification();
        rn.onClick(getReactApplicationContext(), hours, minutes, seconds);
    }
}
