package com.example.util

import android.content.Context
import android.speech.tts.TextToSpeech
import android.widget.Toast
import java.util.Locale

/**
 * Audio feedback helper for Ayidodé+
 * Allows spoken feedback in French and audio visual indicators for Fon
 */
object AudioNarrator {
    private var tts: TextToSpeech? = null
    private var isInitialized = false

    fun init(context: Context) {
        if (tts == null) {
            tts = TextToSpeech(context.applicationContext) { status ->
                if (status == TextToSpeech.SUCCESS) {
                    val result = tts?.setLanguage(Locale.FRENCH)
                    if (result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED) {
                        isInitialized = true
                    }
                }
            }
        }
    }

    fun speak(context: Context, text: String, isFon: Boolean = false) {
        if (isFon) {
            Toast.makeText(context, "🔊 [Fon] : $text", Toast.LENGTH_SHORT).show()
        } else {
            Toast.makeText(context, "🔊 Lecture audio : ${text.take(45)}...", Toast.LENGTH_SHORT).show()
            if (tts == null) {
                init(context)
            }
            if (isInitialized) {
                tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "AyidodeAudio")
            }
        }
    }

    fun stop() {
        tts?.stop()
    }
}
