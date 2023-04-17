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
    public void createNotification(String title, String mainText, int hours, int minutes, int seconds) {
        Log.d("NotificationModule", "Create notification with title: " + title
                + " and text: " + mainText);
        RepeatingNotification rn = new RepeatingNotification();
        rn.onClick(getReactApplicationContext(), hours, minutes, seconds);
        //NotificationScheduler scheduler = new NotificationScheduler();
        //scheduler.scheduleNotification(getReactApplicationContext(), 5000);
    }
}
