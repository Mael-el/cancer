package com.example.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.AyidodeButton
import com.example.ui.components.AyidodeFooter
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume
import com.example.ui.theme.AyidodeVertProfond

/**
 * INTERFACE 7 — RÉSULTATS
 * Conforme exactement aux captures:
 * Capture d’écran du 2026-09-19 02-36-24.png
 * Capture d’écran du 2026-09-19 02-36-27.png
 */
@Composable
fun Interface7Resultats(
    onNavigateToInterface: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_7_resultats"),
        contentPadding = PaddingValues(bottom = 0.dp)
    ) {
        // TOP GREEN RESULT CARD
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
                    .clip(RoundedCornerShape(24.dp))
                    .background(AyidodeVert)
                    .padding(vertical = 36.dp, horizontal = 24.dp)
            ) {
                // Circle watermark
                Box(
                    modifier = Modifier
                        .size(140.dp)
                        .align(Alignment.BottomEnd)
                        .clip(CircleShape)
                        .background(Color.White.copy(alpha = 0.08f))
                )

                Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
                    Text(
                        text = "Votre niveau de risque",
                        fontSize = 15.sp,
                        color = AyidodeBlanc.copy(alpha = 0.9f)
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "Modéré",
                        fontFamily = FontFamily.Serif,
                        fontSize = 36.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeBlanc
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "Rien d'alarmant. Des gestes simples vous protègent.",
                        fontSize = 15.sp,
                        fontStyle = FontStyle.Italic,
                        fontFamily = FontFamily.Serif,
                        color = AyidodeBlanc.copy(alpha = 0.95f),
                        lineHeight = 22.sp,
                        modifier = Modifier.align(Alignment.CenterHorizontally)
                    )
                }
            }
        }

        // SECTION: Ce que nous vous conseillons
        item {
            Text(
                text = "Ce que nous vous conseillons",
                fontFamily = FontFamily.Serif,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeEncre,
                modifier = Modifier.padding(horizontal = 24.dp)
            )
            Spacer(modifier = Modifier.height(16.dp))

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                ConseilItem(text = "Faire un test de dépistage (gratuit)")
                ConseilItem(text = "Manger plus de légumes verts (gboma)")
                ConseilItem(text = "Éviter les aliments moisis")
            }
        }

        // ACTION BUTTONS: Trouver un centre | Parler à un infirmier
        item {
            Spacer(modifier = Modifier.height(28.dp))
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                AyidodeButton(
                    text = "Trouver un centre",
                    onClick = { onNavigateToInterface(5) },
                    isSecondary = false,
                    leadingIcon = { Text("📍", fontSize = 18.sp) },
                    testTag = "btn_resultat_trouver_centre"
                )

                AyidodeButton(
                    text = "Parler à un infirmier",
                    onClick = { onNavigateToInterface(4) },
                    isSecondary = true,
                    leadingIcon = { Text("📞", fontSize = 18.sp) },
                    testTag = "btn_resultat_parler_infirmier"
                )
            }
        }

        // FOOTER: 136 NUMÉRO VERT
        item {
            Spacer(modifier = Modifier.height(40.dp))
            AyidodeFooter(
                onCall136 = {
                    val intent = Intent(Intent.ACTION_DIAL).apply {
                        data = Uri.parse("tel:136")
                    }
                    context.startActivity(intent)
                }
            )
        }
    }
}

@Composable
private fun ConseilItem(text: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(text = "✓", fontSize = 18.sp, color = AyidodeVert, fontWeight = FontWeight.Bold)
        Spacer(modifier = Modifier.width(12.dp))
        Text(
            text = text,
            fontSize = 15.sp,
            color = AyidodeEncre,
            lineHeight = 22.sp
        )
    }
}
