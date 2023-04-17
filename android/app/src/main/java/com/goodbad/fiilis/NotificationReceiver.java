package com.goodbad.fiilis;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

public class NotificationReceiver extends BroadcastReceiver {
    NotificationManager notificationManager;
    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public void onReceive(Context context, Intent intent) {
        notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        createNotificationChannel(
                "channelId",
                "Notifikaatiodemo",
                "Esimerkkikanava"
        );

        Intent repeating_intent = new Intent(context, MainActivity.class);
        repeating_intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pendingIntent = PendingIntent.getActivity(context, 100, repeating_intent, PendingIntent.FLAG_IMMUTABLE); //, FLAG_UPDATE_CURRENT
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "channelId")
                .setContentIntent(pendingIntent)
                .setSmallIcon(R.drawable.baseline_pending_actions_24)
                .setContentTitle("Notification title")
                .setContentText("Notification text")
                .setAutoCancel(true);
        notificationManager.notify(100,builder.build());
    }

    protected void createNotificationChannel(String id, String name, String description) {

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel =
                    new NotificationChannel(id, name, importance);
            channel.setDescription(description);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
