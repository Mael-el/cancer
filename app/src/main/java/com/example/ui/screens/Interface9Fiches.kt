package com.example.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.AyidodeButton
import com.example.ui.components.AyidodeFooter
import com.example.ui.components.ShapeCarteAyidode
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeGrisTexte
import com.example.ui.theme.AyidodeOcre
import com.example.ui.theme.AyidodeTerracotta
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume
import com.example.ui.theme.AyidodeVertProfond

data class FicheSujet(
    val numero: String,
    val titre: String,
    val sousTitre: String,
    val categorie: String
)

/**
 * INTERFACE 9 — FICHES PRATIQUES
 * Conforme exactement aux captures:
 * Capture d’écran du 2026-09-19 02-36-35.png
 * Capture d’écran du 2026-09-19 02-36-37.png
 */
@Composable
fun Interface9Fiches(
    onNavigateToInterface: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    var selectedFiltre by remember { mutableStateOf("Tous") }

    val fiches = listOf(
        FicheSujet("01", "Les 5 cancers fréquents au Bénin", "Sein, col, foie, prostate, estomac", "Cancers"),
        FicheSujet("02", "Démystifier les croyances", "Ce qui est vrai et faux sur le cancer", "Prévention"),
        FicheSujet("03", "Guide de conservation du maïs", "Éviter les aflatoxines et l'humidité", "Alimentation"),
        FicheSujet("04", "Calendrier vaccinal VPH", "Pour protéger vos filles de 9 à 14 ans", "Dépistage"),
        FicheSujet("05", "Recettes locales protectrices", "Ingrédients du marché à petit prix", "Alimentation")
    )

    val categories = listOf("Tous", "Cancers", "Alimentation", "Dépistage", "Prévention")

    val fichesFiltrees = if (selectedFiltre == "Tous") {
        fiches
    } else {
        fiches.filter { it.categorie == selectedFiltre }
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_9_fiches"),
        contentPadding = PaddingValues(bottom = 0.dp)
    ) {
        // TOP HERO TITLE & GREEN ACCENT WATERMARK
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp, vertical = 20.dp)
            ) {
                // Circle watermark
                Box(
                    modifier = Modifier
                        .size(150.dp)
                        .align(Alignment.TopEnd)
                        .clip(CircleShape)
                        .background(AyidodeVertBrume.copy(alpha = 0.7f))
                )

                Column {
                    Text(
                        text = "Fiches pratiques",
                        fontFamily = FontFamily.Serif,
                        fontSize = 36.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeEncre
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(
                        text = "Savoirs clairs, sans détours ni jargon",
                        fontSize = 15.sp,
                        color = AyidodeGrisTexte
                    )
                }
            }
        }

        // CATEGORY CHIPS
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState())
                    .padding(horizontal = 20.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                categories.forEach { cat ->
                    val isSelected = cat == selectedFiltre
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(16.dp))
                            .background(if (isSelected) AyidodeVert else AyidodeVertBrume)
                            .clickable { selectedFiltre = cat }
                            .padding(horizontal = 16.dp, vertical = 8.dp)
                    ) {
                        Text(
                            text = cat,
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            color = if (isSelected) AyidodeBlanc else AyidodeVertProfond
                        )
                    }
                }
            }
            Spacer(modifier = Modifier.height(20.dp))
        }

        // LIST OF FICHES PRATIQUES
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                fichesFiltrees.forEach { fiche ->
                    FichePratiqueCardExact(
                        fiche = fiche,
                        onClick = {
                            if (fiche.numero == "01") onNavigateToInterface(2)
                            else if (fiche.numero == "03" || fiche.numero == "05") onNavigateToInterface(3)
                            else onNavigateToInterface(2)
                        }
                    )
                }
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
private fun FichePratiqueCardExact(
    fiche: FicheSujet,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .shadow(elevation = 2.dp, shape = ShapeCarteAyidode)
            .clip(ShapeCarteAyidode)
            .background(AyidodeBlanc)
            .clickable(onClick = onClick)
            .padding(18.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            // Pill with 01, 02...
            Box(
                modifier = Modifier
                    .size(38.dp)
                    .clip(RoundedCornerShape(8.dp))
                    .background(AyidodeVertBrume),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = fiche.numero,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeOcre
                )
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = fiche.titre,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = fiche.sousTitre,
                    fontSize = 13.sp,
                    color = AyidodeGrisTexte
                )
            }
            Text(
                text = "→",
                fontSize = 20.sp,
                color = AyidodeVert,
                fontWeight = FontWeight.Bold
            )
        }
    }
}
