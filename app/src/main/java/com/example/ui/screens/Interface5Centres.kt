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
import com.example.ui.theme.AyidodeVertProfond

data class CentreSanteExact(
    val nom: String,
    val service: String,
    val distance: String,
    val tel: String,
    val lat: Double,
    val lng: Double
)

/**
 * INTERFACE 5 — TROUVER UN CENTRE
 * Conforme exactement aux captures:
 * Capture d’écran du 2026-09-19 02-36-17.png
 * Capture d’écran du 2026-09-19 02-36-20.png
 */
@Composable
fun Interface5Centres(
    onNavigateToInterface: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    val centres = listOf(
        CentreSanteExact(
            nom = "Centre de santé Gbégamey",
            service = "Dépistage col de l'utérus",
            distance = "1,2 km",
            tel = "+229 21 30 15 22",
            lat = 6.368,
            lng = 2.414
        ),
        CentreSanteExact(
            nom = "Centre de santé Ahouansori",
            service = "Dépistage sein + col",
            distance = "2,5 km",
            tel = "+229 21 33 08 41",
            lat = 6.381,
            lng = 2.441
        ),
        CentreSanteExact(
            nom = "CHU-MEL",
            service = "Dépistage complet",
            distance = "4,1 km",
            tel = "+229 21 31 22 45",
            lat = 6.353,
            lng = 2.428
        )
    )

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_5_centres"),
        contentPadding = PaddingValues(bottom = 0.dp)
    ) {
        // TOP HERO TITLE & LIGHT GREEN ACCENT BUBBLE
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp, vertical = 20.dp)
            ) {
                // Soft green circular background shape in top right
                Box(
                    modifier = Modifier
                        .size(150.dp)
                        .align(Alignment.TopEnd)
                        .clip(CircleShape)
                        .background(AyidodeVertBrume.copy(alpha = 0.8f))
                )

                Column {
                    Text(
                        text = "Un centre vous\nattend.",
                        fontFamily = FontFamily.Serif,
                        fontSize = 36.sp,
                        lineHeight = 42.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeEncre
                    )
                }
            }
        }

        // MAP PLACEHOLDER BANNER (Soft green box with map illustration)
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(200.dp)
                    .padding(horizontal = 20.dp)
                    .clip(RoundedCornerShape(24.dp))
                    .background(AyidodeVertBrume),
                contentAlignment = Alignment.Center
            ) {
                // Map Illustration Emoji / Canvas
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(text = "🗺️", fontSize = 52.sp)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Centres géolocalisés à Cotonou",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = AyidodeVertProfond
                    )
                }
            }
        }

        // LIST OF 3 EXACT HEALTH CENTERS
        item {
            Spacer(modifier = Modifier.height(24.dp))
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                centres.forEach { centre ->
                    CentreCardExact(
                        centre = centre,
                        onAppeler = {
                            val intent = Intent(Intent.ACTION_DIAL).apply {
                                data = Uri.parse("tel:${centre.tel.replace(" ", "")}")
                            }
                            context.startActivity(intent)
                        },
                        onItineraire = {
                            val uri = Uri.parse("geo:${centre.lat},${centre.lng}?q=${centre.lat},${centre.lng}(${Uri.encode(centre.nom)})")
                            val intent = Intent(Intent.ACTION_VIEW, uri)
                            context.startActivity(intent)
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
private fun CentreCardExact(
    centre: CentreSanteExact,
    onAppeler: () -> Unit,
    onItineraire: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .shadow(elevation = 2.dp, shape = RoundedCornerShape(topStart = 4.dp, topEnd = 20.dp, bottomEnd = 20.dp, bottomStart = 20.dp))
            .clip(RoundedCornerShape(topStart = 4.dp, topEnd = 20.dp, bottomEnd = 20.dp, bottomStart = 20.dp))
            .background(AyidodeBlanc)
            .border(
                width = 3.dp,
                color = Color.Transparent
            )
            .padding(18.dp)
    ) {
        Column {
            Text(
                text = centre.nom,
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeEncre
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = "${centre.service} · ${centre.distance}",
                fontSize = 13.sp,
                color = AyidodeGrisTexte
            )
            Spacer(modifier = Modifier.height(16.dp))

            // Action Buttons: Appeler (Vert) | Itinéraire (Vert Brume)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                // Bouton Appeler
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(AyidodeVert)
                        .clickable(onClick = onAppeler),
                    contentAlignment = Alignment.Center
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(text = "📞", fontSize = 14.sp)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Appeler",
                            color = AyidodeBlanc,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                // Bouton Itinéraire
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(44.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(AyidodeVertBrume)
                        .clickable(onClick = onItineraire),
                    contentAlignment = Alignment.Center
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(text = "🗺️", fontSize = 14.sp)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Itinéraire",
                            color = AyidodeVertProfond,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }
    }
}
