package com.weatherwell.widget;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.os.Build;
import android.view.View;
import android.widget.RemoteViews;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.weatherwell.R;

public class WidgetPinModule extends ReactContextBaseJavaModule {

    WidgetPinModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "WidgetPinModule";
    }

    @ReactMethod
    public void requestPinWidget(Promise promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(getReactApplicationContext());
                ComponentName widgetProvider = new ComponentName(
                    getReactApplicationContext(),
                    WeatherWidget.class
                );

                if (appWidgetManager.isRequestPinAppWidgetSupported()) {
                    appWidgetManager.requestPinAppWidget(widgetProvider, null, null);
                    promise.resolve(true);
                } else {
                    promise.reject("UNSUPPORTED", "Widget pinning not supported by launcher");
                }
            } else {
                promise.reject("UNSUPPORTED", "Widget pinning requires Android 8.0+");
            }
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    /**
     * Hide the native refresh spinner overlay. Called from the widget task
     * handler when a refresh finishes — launchers recycle the widget view tree
     * on full updates, so the overlay visibility set by WeatherWidget.java's
     * partial update would otherwise survive the re-render.
     */
    @ReactMethod
    public void hideWidgetRefreshSpinner(Promise promise) {
        try {
            Context context = getReactApplicationContext();
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisWidget = new ComponentName(context, WeatherWidget.class);
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);

            for (int appWidgetId : appWidgetIds) {
                RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.rn_widget);
                views.setViewVisibility(R.id.widget_refresh_overlay, View.GONE);
                appWidgetManager.partiallyUpdateAppWidget(appWidgetId, views);
            }
            promise.resolve(true);
        } catch (Exception e) {
            promise.resolve(false);
        }
    }
}
