package com.example.multiwebview

import android.webkit.CookieManager
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "MultiWebView")
class MultiWebViewPlugin : Plugin() {

    // 💡 원리 1. 웹뷰 관리 명부
    private val webViews = mutableMapOf<String, WebView>()

    @PluginMethod
    fun openWebView(call: PluginCall) {
        val url = call.getString("url") ?: return call.reject("URL이 없습니다.")
        val webviewId = call.getString("webviewId") ?: return call.reject("ID가 없습니다.")

        // 💡 원리 2. UI 스레드 (Main Thread)
        activity.runOnUiThread {
            val newWebView = WebView(context)
            newWebView.settings.javaScriptEnabled = true
            newWebView.settings.domStorageEnabled = true

            // 💡 원리 3. ERR_NAME_NOT_RESOLVED 해결 (핵심)
            // Capacitor의 Bridge는 내부적으로 로컬 서버(localhost)를 인터셉트합니다.
            // 새로 생성한 WebView도 이 인터셉트 로직을 공유해야만 http://localhost 브라우징이 가능합니다.
            
            // 💡 서브 웹뷰 쿠키 공유 허용 (HttpOnly 쿠키 인증 유지)
            val cookieManager = CookieManager.getInstance()
            cookieManager.setAcceptCookie(true)
            cookieManager.setAcceptThirdPartyCookies(newWebView, true)
            newWebView.webViewClient =
                    object : WebViewClient() {
                        override fun shouldInterceptRequest(
                                view: WebView,
                                request: WebResourceRequest
                        ): WebResourceResponse? {
                            // Capacitor Bridge의 로컬 서버 인스턴스에 요청 처리를 위임합니다.
                            return bridge.localServer.shouldInterceptRequest(request)
                        }

                        // 페이지 로드 에러 핸들링 (디버깅용)
                        @Suppress("DEPRECATION", "OverridingDeprecatedMember")
                        override fun onReceivedError(
                                view: WebView,
                                errorCode: Int,
                                description: String,
                                failingUrl: String
                        ) {
                            super.onReceivedError(view, errorCode, description, failingUrl)
                            println("[MultiWebView] 페이지 로드 에러: $description ($failingUrl)")
                        }
                    }

            // 💡 브릿지 연결
            newWebView.addJavascriptInterface(SubWebViewBridge(webviewId), "NativeBridge")

            // 레이아웃 설정
            newWebView.layoutParams =
                    FrameLayout.LayoutParams(
                            FrameLayout.LayoutParams.MATCH_PARENT,
                            FrameLayout.LayoutParams.MATCH_PARENT
                    )

            // 화면에 추가
            val rootView = activity.window.decorView.findViewById<FrameLayout>(android.R.id.content)
            rootView.addView(newWebView)

            // 관리 명부 등록 및 로드
            webViews[webviewId] = newWebView

            // localUrl이 후행 슬래시를 포함하지 않을 수 있으므로 안전하게 결합
            val baseUrl =
                    if (bridge.localUrl.endsWith("/")) bridge.localUrl else bridge.localUrl + "/"
            val fullUrl = baseUrl + url.removePrefix("/")
            newWebView.loadUrl(fullUrl)

            call.resolve()
        }
    }

    @PluginMethod
    fun closeWebView(call: PluginCall) {
        val webviewId = call.getString("webviewId") ?: return call.reject("ID가 없습니다.")

        activity.runOnUiThread {
            val targetWebView = webViews[webviewId]
            if (targetWebView != null) {
                val rootView =
                        activity.window.decorView.findViewById<FrameLayout>(android.R.id.content)
                rootView.removeView(targetWebView)
                targetWebView.destroy()
                webViews.remove(webviewId)
                call.resolve()
            } else {
                call.reject("해당 ID의 웹뷰를 찾을 수 없습니다: $webviewId")
            }
        }
    }

    @PluginMethod
    fun postMessageToWebView(call: PluginCall) {
        val webviewId = call.getString("webviewId") ?: return call.reject("ID가 없습니다.")
        val data = call.getObject("data")?.toString() ?: call.getString("data") ?: ""

        activity.runOnUiThread {
            val targetWebView = webViews[webviewId]
            if (targetWebView != null) {
                val jsCode = "if (window.onNativeMessage) { window.onNativeMessage('$data'); }"
                targetWebView.evaluateJavascript(jsCode, null)
                call.resolve()
            } else {
                call.reject("해당 ID의 웹뷰를 찾을 수 없습니다: $webviewId")
            }
        }
    }

    inner class SubWebViewBridge(private val webviewId: String) {
        @JavascriptInterface
        fun postMessage(messageData: String) {
            val ret = JSObject()
            ret.put("webviewId", webviewId)
            ret.put("data", messageData)
            notifyListeners("onSubWebViewMessage", ret)
        }
    }
}
