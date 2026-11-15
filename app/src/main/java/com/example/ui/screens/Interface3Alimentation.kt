package com.example.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.border
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
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
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
import com.example.ui.components.ShapeCarteAyidode
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeGrisTexte
import com.example.ui.theme.AyidodeTerracotta
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume
import com.example.ui.theme.AyidodeVertProfond

/**
 * INTERFACE 3 — ALIMENTATION
 * Conforme exactement aux captures:
 * Capture d’écran du 2026-09-19 02-36-02.png
 * Capture d’écran du 2026-09-19 02-36-04.png
 * Capture d’écran du 2026-09-19 02-36-07.png
 */
@Composable
fun Interface3Alimentation(
    onNavigateToInterface: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var selectedAudioLang by remember { mutableStateOf("Français") }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_3_alimentation"),
        contentPadding = PaddingValues(bottom = 0.dp)
    ) {
        // TOP BANNER (SOFT GREEN TINT)
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(bottomStart = 28.dp, bottomEnd = 28.dp))
                    .background(AyidodeVertBrume)
                    .padding(horizontal = 24.dp, vertical = 28.dp)
            ) {
                Column {
                    Text(
                        text = "Bien manger, ce n'est\npas cher.",
                        fontFamily = FontFamily.Serif,
                        fontSize = 32.sp,
                        lineHeight = 38.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeEncre
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "C'est un choix.",
                        fontFamily = FontFamily.Serif,
                        fontStyle = FontStyle.Italic,
                        fontSize = 20.sp,
                        color = AyidodeEncre.copy(alpha = 0.85f)
                    )
                    Spacer(modifier = Modifier.height(18.dp))

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

        // SECTION: Avec 500 FCFA
        item {
            Spacer(modifier = Modifier.height(28.dp))
            Text(
                text = "Avec 500 FCFA",
                fontFamily = FontFamily.Serif,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeEncre,
                modifier = Modifier.padding(horizontal = 24.dp)
            )
            Spacer(modifier = Modifier.height(14.dp))

            // Carte budget 500 FCFA
            BudgetCard(
                lignes = listOf(
                    "1 kg de gari" to "314 FCFA",
                    "200 g de niébé" to "103 FCFA",
                    "1 botte de gboma" to "80 FCFA"
                ),
                total = "497 FCFA",
                repasNote = "→ Repas complet pour 2 personnes"
            )
        }

        // SECTION: Avec 1 000 FCFA
        item {
            Spacer(modifier = Modifier.height(28.dp))
            Text(
                text = "Avec 1 000 FCFA",
                fontFamily = FontFamily.Serif,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeEncre,
                modifier = Modifier.padding(horizontal = 24.dp)
            )
            Spacer(modifier = Modifier.height(14.dp))

            // Carte budget 1 000 FCFA
            BudgetCard(
                lignes = listOf(
                    "1 kg de maïs" to "138 FCFA",
                    "1 kg de niébé" to "517 FCFA",
                    "1 botte de gboma" to "80 FCFA",
                    "Poisson séché" to "200 FCFA"
                ),
                total = "935 FCFA",
                repasNote = "→ Repas complet pour 4 personnes"
            )
        }

        // SECTION: À remplacer
        item {
            Spacer(modifier = Modifier.height(36.dp))
            Text(
                text = "À remplacer",
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
                RemplacerItem(isBad = true, text = "Cube de bouillon industriel")
                RemplacerItem(isBad = false, text = "Ail, gingembre, lanhouin, afitin")
                HorizontalDivider(color = AyidodeVert.copy(alpha = 0.1f))

                RemplacerItem(isBad = true, text = "Viande rouge")
                RemplacerItem(isBad = false, text = "Niébé, poisson séché, wagashi")
                HorizontalDivider(color = AyidodeVert.copy(alpha = 0.1f))

                RemplacerItem(isBad = true, text = "Arachide moisie")
                RemplacerItem(isBad = false, text = "Arachide bien séchée")
            }
        }

        // SECTION: Conserver sans aflatoxines
        item {
            Spacer(modifier = Modifier.height(36.dp))
            Text(
                text = "Conserver sans aflatoxines",
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
                    .padding(horizontal = 20.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                EtapeConservationCard(
                    numero = "1",
                    titre = "Bien sécher",
                    sousTitre = "Avant stockage"
                )
                EtapeConservationCard(
                    numero = "2",
                    titre = "Endroit sec et aéré",
                    sousTitre = "Pas humide"
                )
                EtapeConservationCard(
                    numero = "3",
                    titre = "Jeter tout aliment moisi",
                    sousTitre = "Même sans moisissure visible"
                )
            }
        }

        // FOOTER: Bien manger, c'est se protéger.
        item {
            Spacer(modifier = Modifier.height(40.dp))
            AyidodeFooter(
                quote = "Bien manger, c'est se protéger.",
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
private fun BudgetCard(
    lignes: List<Pair<String, String>>,
    total: String,
    repasNote: String
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp)
            .clip(RoundedCornerShape(24.dp))
            .background(AyidodeVertBrume)
            .padding(20.dp)
    ) {
        lignes.forEach { (aliment, prix) ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 6.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = aliment,
                    fontSize = 15.sp,
                    color = AyidodeEncre
                )
                Text(
                    text = prix,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
            }
            HorizontalDivider(
                color = AyidodeVert.copy(alpha = 0.15f),
                thickness = 1.dp
            )
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Total
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 6.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "Total",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeVertProfond
            )
            Text(
                text = total,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeVertProfond
            )
        }

        Spacer(modifier = Modifier.height(10.dp))

        Text(
            text = repasNote,
            fontSize = 14.sp,
            fontWeight = FontWeight.SemiBold,
            color = AyidodeVertProfond,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )
    }
}

@Composable
private fun RemplacerItem(
    isBad: Boolean,
    text: String
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        if (isBad) {
            Text(text = "✗", fontSize = 18.sp, color = AyidodeTerracotta, fontWeight = FontWeight.Bold)
        } else {
            Text(text = "✓", fontSize = 18.sp, color = AyidodeVert, fontWeight = FontWeight.Bold)
        }
        Spacer(modifier = Modifier.width(12.dp))
        Text(
            text = text,
            fontSize = 15.sp,
            color = AyidodeEncre
        )
    }
}

@Composable
private fun EtapeConservationCard(
    numero: String,
    titre: String,
    sousTitre: String
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .shadow(elevation = 2.dp, shape = ShapeCarteAyidode)
            .clip(ShapeCarteAyidode)
            .background(AyidodeBlanc)
            .padding(18.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            // Number badge (square with rounded corner, grey/blueish icon style)
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(RoundedCornerShape(6.dp))
                    .background(Color(0xFF5A8AA8)),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = numero,
                    color = AyidodeBlanc,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp
                )
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = titre,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = sousTitre,
                    fontSize = 13.sp,
                    color = AyidodeGrisTexte
                )
            }
        }
    }
}
