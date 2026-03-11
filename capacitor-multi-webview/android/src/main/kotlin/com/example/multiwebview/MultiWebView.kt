package com.example.multiwebview

import android.util.Log

class MultiWebView {

    fun echo(value: String?): String? {
        Log.i("Echo", value ?: "null")

        return value
    }
}
