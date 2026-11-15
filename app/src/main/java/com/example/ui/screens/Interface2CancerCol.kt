package com.example.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Divider
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
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
import com.example.ui.components.AudioPill
import com.example.ui.components.AyidodeButton
import com.example.ui.components.AyidodeFooter
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeOcre
import com.example.ui.theme.AyidodeTerracotta
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume
import com.example.ui.theme.AyidodeVertProfond

/**
 * INTERFACE 2 — CANCER DU COL DE L'UTÉRUS
 * Exactement conforme aux captures:
 * Capture d’écran du 2026-09-19 02-35-46.png
 * Capture d’écran du 2026-09-19 02-35-51.png
 * Capture d’écran du 2026-09-19 02-35-54.png
 */
@Composable
fun Interface2CancerCol(
    onNavigateToInterface: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var selectedAudioLang by remember { mutableStateOf("Français") }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_2_cancer_col"),
        contentPadding = PaddingValues(bottom = 0.dp)
    ) {
        // 1. GREEN HERO CARD WITH RADIUS & CIRCLE DECORATION
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(bottomStart = 28.dp, bottomEnd = 28.dp))
                    .background(AyidodeVert)
                    .padding(24.dp)
            ) {
                // Circle watermark decoration
                Box(
                    modifier = Modifier
                        .size(160.dp)
                        .align(Alignment.BottomEnd)
                        .clip(CircleShape)
                        .background(Color.White.copy(alpha = 0.08f))
                )

                Column {
                    Text(
                        text = "Cancer du col de l'utérus",
                        fontFamily = FontFamily.Serif,
                        fontSize = 28.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeBlanc
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    Text(
                        text = "Le vaccin protège vos filles. C'est un geste d'amour.",
                        fontSize = 17.sp,
                        fontStyle = FontStyle.Italic,
                        fontFamily = FontFamily.Serif,
                        color = AyidodeBlanc.copy(alpha = 0.95f),
                        lineHeight = 24.sp
                    )
                    Spacer(modifier = Modifier.height(16.dp))

                    // Audio Pills: Français | Fon
                    Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                        AudioPill(
                            text = "Français",
                            isSelected = selectedAudioLang == "Français",
                            onClick = { selectedAudioLang = "Français" }
                        )
                        AudioPill(
                            text = "Fon",
                            isSelected = selectedAudioLang == "Fon",
                            onClick = { selectedAudioLang = "Fon" }
                        )
                    }
                }
            }
        }

        // 01 Les causes
        item {
            BlocNumberedSection(
                number = "01",
                title = "Les causes",
                content = {
                    Text(
                        text = "Le cancer du col est causé par un virus appelé VPH. Il se transmet lors des rapports sexuels.",
                        fontSize = 15.sp,
                        color = AyidodeEncre,
                        lineHeight = 22.sp
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    EcouterButton(onClick = { /* TTS */ })
                }
            )
            HorizontalDivider(color = AyidodeVert.copy(alpha = 0.12f), thickness = 1.dp)
        }

        // 02 Les signes d'alerte
        item {
            BlocNumberedSection(
                number = "02",
                title = "Les signes d'alerte",
                content = {
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        SigneItem(text = "Saignements anormaux")
                        SigneItem(text = "Douleurs pendant les rapports")
                        SigneItem(text = "Pertes inhabituelles")
                    }
                    Spacer(modifier = Modifier.height(14.dp))
                    Text(
                        text = "Si vous avez un de ces signes, allez au centre de santé.",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Medium,
                        color = AyidodeEncre,
                        lineHeight = 22.sp
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    EcouterButton(onClick = { /* TTS */ })
                }
            )
            HorizontalDivider(color = AyidodeVert.copy(alpha = 0.12f), thickness = 1.dp)
        }

        // 03 Les conséquences
        item {
            BlocNumberedSection(
                number = "03",
                title = "Les conséquences",
                content = {
                    Text(
                        text = "Sans dépistage, le cancer peut rendre stérile ou tuer. Le traitement coûte cher. Le dépistage est gratuit.",
                        fontSize = 15.sp,
                        color = AyidodeEncre,
                        lineHeight = 22.sp
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    EcouterButton(onClick = { /* TTS */ })
                }
            )
            HorizontalDivider(color = AyidodeVert.copy(alpha = 0.12f), thickness = 1.dp)
        }

        // 04 Les solutions
        item {
            BlocNumberedSection(
                number = "04",
                title = "Les solutions",
                content = {
                    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                        SolutionItem(text = "Vaccin VPH (filles 9-14 ans)")
                        SolutionItem(text = "Dépistage gratuit (femmes 25-65)")
                        SolutionItem(text = "Préservatif")
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    EcouterButton(onClick = { /* TTS */ })
                }
            )
            HorizontalDivider(color = AyidodeVert.copy(alpha = 0.12f), thickness = 1.dp)
        }

        // 05 Les aliments
        item {
            BlocNumberedSection(
                number = "05",
                title = "Les aliments",
                content = {
                    Text(
                        text = "À remplacer :",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeEncre
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    AlimentRemplacerItem(text = "Tabac")
                    Spacer(modifier = Modifier.height(8.dp))
                    AlimentRemplacerItem(text = "Alcool")

                    Spacer(modifier = Modifier.height(18.dp))
                    Text(
                        text = "À privilégier :",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeEncre
                    )
                    Spacer(modifier = Modifier.height(10.dp))
                    AlimentPrivilegierItem(text = "Orange, goyave (vitamine C)")
                    Spacer(modifier = Modifier.height(8.dp))
                    AlimentPrivilegierItem(text = "Gboma, fotètè (légumes verts)")

                    Spacer(modifier = Modifier.height(14.dp))
                    EcouterButton(onClick = { /* TTS */ })
                }
            )
        }

        // ACTION BUTTONS: Parler à un infirmier | Trouver un centre
        item {
            Spacer(modifier = Modifier.height(20.dp))
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                AyidodeButton(
                    text = "Parler à un infirmier",
                    onClick = { onNavigateToInterface(4) },
                    isSecondary = true,
                    leadingIcon = { Text("📞", fontSize = 18.sp) },
                    testTag = "btn_col_infirmier"
                )

                AyidodeButton(
                    text = "Trouver un centre",
                    onClick = { onNavigateToInterface(5) },
                    isSecondary = false,
                    leadingIcon = { Text("📍", fontSize = 18.sp) },
                    testTag = "btn_col_centre"
                )
            }
        }

        // FOOTER: Vous n'êtes pas seuls.
        item {
            Spacer(modifier = Modifier.height(30.dp))
            AyidodeFooter(
                quote = "Vous n'êtes pas seuls.",
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
private fun BlocNumberedSection(
    number: String,
    title: String,
    content: @Composable () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp, vertical = 20.dp)
    ) {
        Text(
            text = number,
            fontSize = 13.sp,
            fontWeight = FontWeight.Bold,
            color = AyidodeOcre,
            letterSpacing = 1.sp
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = title,
            fontFamily = FontFamily.Serif,
            fontSize = 22.sp,
            fontWeight = FontWeight.Bold,
            color = AyidodeVertProfond
        )
        Spacer(modifier = Modifier.height(12.dp))
        content()
    }
}

@Composable
private fun EcouterButton(onClick: () -> Unit) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .clip(RoundedCornerShape(18.dp))
            .background(AyidodeVertBrume)
            .clickable(onClick = onClick)
            .padding(horizontal = 14.dp, vertical = 6.dp)
    ) {
        Icon(
            imageVector = Icons.Default.VolumeUp,
            contentDescription = null,
            tint = AyidodeVertProfond,
            modifier = Modifier.size(16.dp)
        )
        Spacer(modifier = Modifier.width(6.dp))
        Text(
            text = "Écouter",
            color = AyidodeVertProfond,
            fontSize = 13.sp,
            fontWeight = FontWeight.SemiBold
        )
    }
}

@Composable
private fun SigneItem(text: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(text = "⚠️", fontSize = 16.sp)
        Spacer(modifier = Modifier.width(10.dp))
        Text(
            text = text,
            fontSize = 15.sp,
            color = AyidodeEncre
        )
    }
}

@Composable
private fun SolutionItem(text: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(text = "✓", fontSize = 16.sp, color = AyidodeVert, fontWeight = FontWeight.Bold)
        Spacer(modifier = Modifier.width(10.dp))
        Text(
            text = text,
            fontSize = 15.sp,
            color = AyidodeEncre
        )
    }
}

@Composable
private fun AlimentRemplacerItem(text: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(text = "✗", fontSize = 16.sp, color = AyidodeTerracotta, fontWeight = FontWeight.Bold)
        Spacer(modifier = Modifier.width(10.dp))
        Text(
            text = text,
            fontSize = 15.sp,
            color = AyidodeEncre
        )
    }
}

@Composable
private fun AlimentPrivilegierItem(text: String) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(text = "✓", fontSize = 16.sp, color = AyidodeVert, fontWeight = FontWeight.Bold)
        Spacer(modifier = Modifier.width(10.dp))
        Text(
            text = text,
            fontSize = 15.sp,
            color = AyidodeEncre
        )
    }
}
