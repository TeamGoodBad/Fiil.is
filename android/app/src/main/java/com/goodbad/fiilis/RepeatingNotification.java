package com.goodbad.fiilis;

import static android.content.Context.ALARM_SERVICE;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import java.util.Calendar;

public class RepeatingNotification extends BroadcastReceiver {

    private static final String NOTIFICATION_CHANNEL_ID = "fiilisMuistutusID";

    @Override
    public void onReceive(Context context, Intent intent) {
        NotificationChannel(context);

        Intent repeatingIntent = new Intent(context, MainActivity.class);
        repeatingIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        // Create notification
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            NotificationCompat.Builder builder = new NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID)
                    .setSmallIcon(R.drawable.baseline_pending_actions_24)
                    .setContentTitle("Fiil.is-muistutus")
                    .setContentText("Oletko jo tehnyt päivän merkintäsi?")
                    .setPriority(Notification.PRIORITY_DEFAULT)
                    .setAutoCancel(true)
                    .setContentIntent(PendingIntent.getActivity(context, 0, repeatingIntent,
                            PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));

            NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.notify(0, builder.build());
        }
    }

    public void onClick(Context context, int hours, int minutes, int seconds) {

        int[] time = {21, 0, 0};
        if (hours >= 0 && hours < 24) {
            time[0] = hours;
        }
        if (minutes >= 0 && minutes < 60) {
            time[1] = minutes;
        }
        if (seconds >= 0 && seconds < 60) {
            time[2] = seconds;
        }
        String aika = time[0] + ":" + time[1] + ":" + time[2];
        Log.d("RepeatingNotification", "Asetellaan juttuja (aika: " + aika + ")");

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, time[0]);
        calendar.set(Calendar.MINUTE, time[1]);
        calendar.set(Calendar.SECOND, time[2]);

        Intent intent = new Intent(context, RepeatingNotification.class);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            flags |= PendingIntent.FLAG_MUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, flags);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            AlarmManager alarmManager = (AlarmManager) context.getSystemService(ALARM_SERVICE);
            alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), 1000*60, pendingIntent);
            // TODO: starting alarm when the device restarts - not happening now:
            // https://developer.android.com/training/scheduling/alarms#boot
        }
    }

    private void NotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, "Fiilis tänään", NotificationManager.IMPORTANCE_DEFAULT);
            channel.setDescription("Muistutus päivän arvostelusta");
            channel.enableLights(true);
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{0, 1000, 500, 1000});
            channel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);

            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
