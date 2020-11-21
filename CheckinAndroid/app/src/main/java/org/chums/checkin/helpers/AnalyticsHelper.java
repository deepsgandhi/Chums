package org.chums.checkin.helpers;
import android.content.Context;
import android.os.Bundle;

import com.google.firebase.analytics.FirebaseAnalytics;

public class AnalyticsHelper {
    private static FirebaseAnalytics mFirebaseAnalytics;

    public static void initFirebase(Context context)
    {
        mFirebaseAnalytics = FirebaseAnalytics.getInstance(context);
    }

    public static void setChurch()
    {
        try {
            mFirebaseAnalytics.setUserProperty("church", CachedData.Church.getName());
        } catch (Exception e) {};
    }

    public static void logCheckin(int peopleCount)
    {
        try {
            Bundle b = new Bundle();
            b.putDouble("people", peopleCount);
            mFirebaseAnalytics.logEvent("checkin", b);
        } catch (Exception e) {};
    }


}
