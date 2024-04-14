package com.example.ams;

import android.webkit.JavascriptInterface;

public class WebAppInterface {
    private MainActivity mActivity;

    public WebAppInterface(MainActivity activity) {
        mActivity = activity;
    }

    @JavascriptInterface
    public void finishApp() {
        mActivity.finish();
    }
}
