package com.example.macachin;

import android.content.Context;
import android.net.wifi.WifiConfiguration;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.lang.reflect.Method;

public class MainActivity extends AppCompatActivity {
    private WifiManager wifiManager;
    private WebView webView;

    public class WebAppInterface {
        @JavascriptInterface
        public void onLoginSuccess() {
            runOnUiThread(() -> {
                Toast.makeText(MainActivity.this, 
                    "Authentication successful! Full WiFi access granted.", 
                    Toast.LENGTH_LONG).show();
            });
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        wifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        startHotspot();

        webView = findViewById(R.id.webview);
        configureWebView();
    }

    private void configureWebView() {
        webView.setWebViewClient(new WebViewClient());
        webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface(new WebAppInterface(), "AndroidInterface");
        webView.loadUrl("file:///android_asset/index.html");
    }

    private void startHotspot() {
        try {
            if (wifiManager.isWifiEnabled()) {
                wifiManager.setWifiEnabled(false);
            }

            WifiConfiguration wifiConfig = new WifiConfiguration();
            wifiConfig.SSID = "macachin";
            wifiConfig.allowedAuthAlgorithms.set(WifiConfiguration.AuthAlgorithm.OPEN);
            wifiConfig.allowedKeyManagement.set(WifiConfiguration.KeyMgmt.NONE);

            Method method = wifiManager.getClass().getMethod(
                "setWifiApEnabled", 
                WifiConfiguration.class, 
                boolean.class
            );
            method.invoke(wifiManager, wifiConfig, true);
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "Failed to start hotspot", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            Method method = wifiManager.getClass().getMethod("setWifiApEnabled", 
                WifiConfiguration.class, boolean.class);
            method.invoke(wifiManager, null, false);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
