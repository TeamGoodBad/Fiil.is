package com.goodbad.fiilis;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;

public class NotificationReceiver extends BroadcastReceiver {
    private static final String NOTIFICATION_CHANNEL_ID = "fiilisID";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("NotificationReceiver", "Received...");

        // Create notification channel
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel notificationChannel = new NotificationChannel(
                    NOTIFICATION_CHANNEL_ID, "Muistutus", NotificationManager.IMPORTANCE_DEFAULT
            );

            // Configure notification channel
            notificationChannel.setDescription("Muistutus päivän arvioinnista");
            notificationChannel.enableLights(true);
            notificationChannel.setLightColor(Color.RED);
            notificationChannel.enableVibration(true);
            notificationChannel.setVibrationPattern(new long[]{0, 1000, 500, 1000});
            notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);

            NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.createNotificationChannel(notificationChannel);
            Log.d("NotificationReceiver", "Notification channel created");
        }

        // Create notification
        Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        Intent repeatingIntent = new Intent(context, MainActivity.class);
        repeatingIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            NotificationCompat.Builder builder = new NotificationCompat.Builder(context, NOTIFICATION_CHANNEL_ID)
                    .setSmallIcon(R.drawable.baseline_pending_actions_24)
                    .setContentTitle("Fiil.is-muistutus")
                    .setContentText("Oletko jo tehnyt päivän merkintäsi?")
                    .setAutoCancel(true)
                    .setSound(soundUri)
                    .setContentIntent(PendingIntent.getActivity(
                            context, 0, repeatingIntent,
                            PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
            NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.notify(0, builder.build());
            Log.d("NotificationReceiver", "Notification manager created");
        }
    }

}
