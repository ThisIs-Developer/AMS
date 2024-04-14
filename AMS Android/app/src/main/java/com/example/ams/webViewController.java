package com.example.ams;

import android.webkit.WebView;
import android.webkit.WebViewClient;

public class webViewController extends WebViewClient {

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.loadUrl(url);
        return true;
    }
}
