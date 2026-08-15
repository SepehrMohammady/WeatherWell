package com.weatherwell.app.widget;

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

import com.weatherwell.app.R;

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
     * Restore the native refresh button after a refresh finishes — launchers
     * recycle the widget view tree on full renders, so the spinner state set by
     * WeatherWidget.java's partial update would otherwise survive the re-render.
     */
    @ReactMethod
    public void hideWidgetRefreshSpinner(Promise promise) {
        try {
            WeatherWidget.setRefreshing(getReactApplicationContext(), false);
            promise.resolve(true);
        } catch (Exception e) {
            promise.resolve(false);
        }
    }
}
