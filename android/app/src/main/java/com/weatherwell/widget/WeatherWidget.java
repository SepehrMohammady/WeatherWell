package com.weatherwell.widget;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.RemoteViews;

import com.reactnativeandroidwidget.RNWidgetProvider;
import com.weatherwell.R;

public class WeatherWidget extends RNWidgetProvider {

    @Override
    public void onReceive(Context context, Intent intent) {
        // The JS refresh icon broadcasts <package>.WIDGET_CLICK with clickAction=REFRESH.
        // Show a native indeterminate spinner immediately via a partial update —
        // unlike a full re-render this animates smoothly and never blanks the widget.
        // The spinner disappears automatically when the headless JS task finishes,
        // because the full render rebuilds the layout with the overlay hidden.
        String clickAction = intent.getStringExtra("clickAction");
        if ((context.getPackageName() + ".WIDGET_CLICK").equals(intent.getAction())
                && "REFRESH".equals(clickAction)) {
            showRefreshSpinner(context);
        }

        super.onReceive(context, intent);
    }

    private void showRefreshSpinner(Context context) {
        try {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisWidget = new ComponentName(context, WeatherWidget.class);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);

            for (int appWidgetId : appWidgetIds) {
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.rn_widget);
                views.setViewVisibility(R.id.widget_refresh_overlay, View.VISIBLE);
                appWidgetManager.partiallyUpdateAppWidget(appWidgetId, views);
            }
        } catch (Exception e) {
            // Spinner is cosmetic — never let it break the refresh itself
        }
    }
}
