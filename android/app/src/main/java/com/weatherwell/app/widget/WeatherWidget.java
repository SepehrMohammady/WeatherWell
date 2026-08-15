package com.weatherwell.app.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.RemoteViews;

import com.reactnativeandroidwidget.RNWidgetProvider;
import com.weatherwell.app.R;

public class WeatherWidget extends RNWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);
        attachRefreshButton(context);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        // The native refresh button broadcasts <package>.WIDGET_CLICK with
        // clickAction=REFRESH (same shape as the library's own click intents),
        // so the library forwards it to the JS widget task handler. Swap the
        // button for a native indeterminate spinner via a partial update —
        // this animates smoothly and never blanks the widget. WidgetPinModule
        // restores the button when the JS refresh completes.
        String clickAction = intent.getStringExtra("clickAction");
        if ((context.getPackageName() + ".WIDGET_CLICK").equals(intent.getAction())
                && "REFRESH".equals(clickAction)) {
            setRefreshing(context, true);
        }

        super.onReceive(context, intent);

        // Launchers may re-inflate the widget view tree at any time, which
        // drops the button's PendingIntent — re-attach it on every widget event.
        if (intent.getAction() != null
                && intent.getAction().startsWith(context.getPackageName() + ".WIDGET")) {
            attachRefreshButton(context);
        }
    }

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager,
                                          int appWidgetId, Bundle newOptions) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions);
        attachRefreshButton(context);
    }

    static void setRefreshing(Context context, boolean refreshing) {
        try {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisWidget = new ComponentName(context, WeatherWidget.class);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);

            for (int appWidgetId : appWidgetIds) {
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.rn_widget);
                views.setViewVisibility(R.id.widget_refresh_button, refreshing ? View.GONE : View.VISIBLE);
                views.setViewVisibility(R.id.widget_refresh_progress, refreshing ? View.VISIBLE : View.GONE);
                if (!refreshing) {
                    setRefreshClickIntent(context, views, appWidgetId);
                }
                appWidgetManager.partiallyUpdateAppWidget(appWidgetId, views);
            }
        } catch (Exception e) {
            // The refresh control is cosmetic — never let it break the widget
        }
    }

    static void attachRefreshButton(Context context) {
        try {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisWidget = new ComponentName(context, WeatherWidget.class);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);

            for (int appWidgetId : appWidgetIds) {
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.rn_widget);
                setRefreshClickIntent(context, views, appWidgetId);
                appWidgetManager.partiallyUpdateAppWidget(appWidgetId, views);
            }
        } catch (Exception e) {
            // ignore
        }
    }

    private static void setRefreshClickIntent(Context context, RemoteViews views, int appWidgetId) {
        Intent refreshIntent = new Intent(context, WeatherWidget.class);
        refreshIntent.setAction(context.getPackageName() + ".WIDGET_CLICK");
        refreshIntent.putExtra("widgetId", appWidgetId);
        refreshIntent.putExtra("clickAction", "REFRESH");
        refreshIntent.putExtra("clickActionData", new Bundle());

        PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                1000 + appWidgetId,
                refreshIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_refresh_button, pendingIntent);
    }
}
