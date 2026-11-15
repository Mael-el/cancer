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
import com.example.ui.components.AyidodeFooter
import com.example.ui.components.ShapeCarteAyidode
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeGrisTexte
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume

data class RappelPerso(
    val titre: String,
    val sousTitre: String
)

/**
 * INTERFACE 8 — TABLEAU DE BORD (MON ESPACE)
 * Conforme exactement aux captures:
 * Capture d’écran du 2026-09-19 02-36-30.png
 * Capture d’écran du 2026-09-19 02-36-32.png
 */
@Composable
fun Interface8TableauDeBord(
    onNavigateToInterface: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    val rappels = listOf(
        RappelPerso("Vaccin VPH (2e dose)", "Dans 3 mois · Fille 11 ans"),
        RappelPerso("Dépistage col de l'utérus", "Recommandé cette année"),
        RappelPerso("Contrôle alimentation", "Changer d'huile · Ce mois")
    )

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_8_tableau_de_bord"),
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
                        text = "Mon espace",
                        fontFamily = FontFamily.Serif,
                        fontSize = 36.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeEncre
                    )
                }
            }
        }

        // CARTE USER: +229 97 00 00 00 · Fon
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp)
                    .clip(RoundedCornerShape(20.dp))
                    .background(AyidodeVertBrume)
                    .padding(20.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(CircleShape)
                            .background(AyidodeVert),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(text = "👤", fontSize = 20.sp)
                    }
                    Spacer(modifier = Modifier.width(14.dp))
                    Column {
                        Text(
                            text = "+229 97 00 00 00",
                            fontSize = 17.sp,
                            fontWeight = FontWeight.Bold,
                            color = AyidodeEncre
                        )
                        Spacer(modifier = Modifier.height(2.dp))
                        Text(
                            text = "Langue : Fon · Inscrit le 15/01/2026",
                            fontSize = 13.sp,
                            color = AyidodeGrisTexte
                        )
                    }
                }
            }
        }

        // SECTION: Mes rappels
        item {
            Spacer(modifier = Modifier.height(32.dp))
            Text(
                text = "Mes rappels",
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
                rappels.forEach { rappel ->
                    RappelItemCardExact(
                        rappel = rappel,
                        onClick = {}
                    )
                }
            }
        }

        // SECTION: Mes fiches sauvegardées
        item {
            Spacer(modifier = Modifier.height(32.dp))
            Text(
                text = "Mes fiches sauvegardées",
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
                FicheSauvegardeeCard(
                    titre = "Cancer du col de l'utérus",
                    sousTitre = "Causes, signes, solutions",
                    onClick = { onNavigateToInterface(2) }
                )
                FicheSauvegardeeCard(
                    titre = "Recettes saines à 500 FCFA",
                    sousTitre = "Gari, niébé, gboma",
                    onClick = { onNavigateToInterface(3) }
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
private fun RappelItemCardExact(
    rappel: RappelPerso,
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
            Text(text = "🔔", fontSize = 24.sp)
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = rappel.titre,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = rappel.sousTitre,
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

@Composable
private fun FicheSauvegardeeCard(
    titre: String,
    sousTitre: String,
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
            Text(text = "📄", fontSize = 24.sp)
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
            Text(
                text = "→",
                fontSize = 20.sp,
                color = AyidodeVert,
                fontWeight = FontWeight.Bold
            )
        }
    }
}
