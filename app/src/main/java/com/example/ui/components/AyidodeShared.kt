package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.util.AudioNarrator
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeCreme
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeTerracotta
import com.example.ui.theme.AyidodeTerracottaFonce
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume
import com.example.ui.theme.AyidodeVertProfond

// Custom corner radius from design specifications:
// --radius-carte: 32px 32px 8px 32px
val ShapeCarteAyidode = RoundedCornerShape(topStart = 32.dp, topEnd = 32.dp, bottomEnd = 8.dp, bottomStart = 32.dp)
// --radius-bouton: 20px 20px 6px 20px
val ShapeBoutonAyidode = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp, bottomEnd = 6.dp, bottomStart = 20.dp)

/**
 * Solid 3D bevel button conforming strictly to:
 * .btn-principal { background: var(--vert); box-shadow: 0 4px 0 var(--vert-profond); }
 * .btn-secondaire { background: var(--terracotta); box-shadow: 0 4px 0 #9a4429; }
 */
@Composable
fun AyidodeButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    isSecondary: Boolean = false,
    leadingIcon: (@Composable () -> Unit)? = null,
    testTag: String = "btn_ayidode"
) {
    val bgColor = if (isSecondary) AyidodeTerracotta else AyidodeVert
    val shadowColor = if (isSecondary) AyidodeTerracottaFonce else AyidodeVertProfond

    Box(
        modifier = modifier
            .testTag(testTag)
            .fillMaxWidth()
            .height(60.dp)
            .clip(ShapeBoutonAyidode)
            .background(shadowColor)
            .padding(bottom = 4.dp) // creates the solid 4px bottom shadow bevel
            .clip(ShapeBoutonAyidode)
            .background(bgColor)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center,
            modifier = Modifier.padding(horizontal = 16.dp)
        ) {
            if (leadingIcon != null) {
                leadingIcon()
                Spacer(modifier = Modifier.width(10.dp))
            }
            Text(
                text = text,
                color = AyidodeBlanc,
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

/**
 * Green footer banner present on all 9 screens with:
 * ☎️ 136
 * Numéro vert — Ministère de la Santé
 * © 2026 Ayidodé+ — Aucun diagnostic médical.
 */
@Composable
fun AyidodeFooter(
    modifier: Modifier = Modifier,
    quote: String? = null,
    onCall136: () -> Unit = {}
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp))
            .background(AyidodeVertProfond)
            .padding(vertical = 28.dp, horizontal = 20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        if (quote != null) {
            Text(
                text = quote,
                color = AyidodeBlanc.copy(alpha = 0.95f),
                fontSize = 17.sp,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic,
                fontWeight = FontWeight.Medium,
                modifier = Modifier.padding(bottom = 20.dp)
            )
        }

        // Phone call capsule
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center,
            modifier = Modifier
                .clip(RoundedCornerShape(20.dp))
                .background(AyidodeBlanc.copy(alpha = 0.15f))
                .clickable(onClick = onCall136)
                .padding(horizontal = 20.dp, vertical = 8.dp)
        ) {
            Text(text = "☎️", fontSize = 20.sp)
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "136",
                color = AyidodeBlanc,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
        }

        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = "Numéro vert — Ministère de la Santé",
            color = AyidodeBlanc.copy(alpha = 0.9f),
            fontSize = 13.sp,
            fontWeight = FontWeight.Medium
        )

        Spacer(modifier = Modifier.height(6.dp))
        Text(
            text = "© 2026 Ayidodé+ — Aucun diagnostic médical.",
            color = AyidodeBlanc.copy(alpha = 0.65f),
            fontSize = 11.sp
        )
    }
}

/**
 * Audio pill selector (Français / Fon)
 */
@Composable
fun AudioPill(
    text: String,
    isSelected: Boolean = false,
    onClick: () -> Unit
) {
    val context = LocalContext.current
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clip(RoundedCornerShape(20.dp))
            .background(if (isSelected) AyidodeVert else AyidodeVert.copy(alpha = 0.85f))
            .clickable {
                onClick()
                AudioNarrator.speak(context, "Langue audio sélectionnée : $text", isFon = text.contains("Fon", ignoreCase = true))
            }
            .padding(horizontal = 14.dp, vertical = 6.dp)
    ) {
        Icon(
            imageVector = Icons.Default.VolumeUp,
            contentDescription = "Écouter en $text",
            tint = AyidodeBlanc,
            modifier = Modifier.size(16.dp)
        )
        Spacer(modifier = Modifier.width(6.dp))
        Text(
            text = text,
            color = AyidodeBlanc,
            fontSize = 13.sp,
            fontWeight = FontWeight.SemiBold
        )
    }
}
