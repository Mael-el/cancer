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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
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
import com.example.ui.components.AyidodeButton
import com.example.ui.components.AyidodeFooter
import com.example.ui.components.ShapeCarteAyidode
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeGrisTexte
import com.example.ui.theme.AyidodeTerracotta
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume

/**
 * INTERFACE 4 — PARLER À UN INFIRMIER
 * Conforme exactement aux captures:
 * Capture d’écran du 2026-09-19 02-36-11.png
 * Capture d’écran du 2026-09-19 02-36-14.png
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Interface4Infirmier(
    onNavigateToInterface: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    var inputNom by remember { mutableStateOf("") }
    var inputTelephone by remember { mutableStateOf("") }
    var selectedMotif by remember { mutableStateOf("Je veux des informations") }
    var motifExpanded by remember { mutableStateOf(false) }
    var requestSent by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_4_infirmier"),
        contentPadding = PaddingValues(bottom = 0.dp)
    ) {
        // TOP HERO BANNER (TERRACOTTA)
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(bottomStart = 28.dp, bottomEnd = 28.dp))
                    .background(AyidodeTerracotta)
                    .padding(horizontal = 24.dp, vertical = 32.dp)
            ) {
                Column {
                    Text(
                        text = "Parler à un infirmier",
                        fontFamily = FontFamily.Serif,
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Bold,
                        color = AyidodeBlanc
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Parler, c'est déjà agir.",
                        fontFamily = FontFamily.Serif,
                        fontStyle = FontStyle.Italic,
                        fontSize = 20.sp,
                        color = AyidodeBlanc.copy(alpha = 0.95f)
                    )
                }
            }
        }

        // 3 GRANDES OPTIONS BLANCHES
        item {
            Spacer(modifier = Modifier.height(24.dp))
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                // Option 1: Appeler maintenant — 136
                GrandOptionCard(
                    icon = "📞",
                    title = "Appeler maintenant — 136",
                    onClick = {
                        val intent = Intent(Intent.ACTION_DIAL).apply {
                            data = Uri.parse("tel:136")
                        }
                        context.startActivity(intent)
                    }
                )

                // Option 2: Demander un rappel
                GrandOptionCard(
                    icon = "💬",
                    title = "Demander un rappel",
                    onClick = { /* focus on form below */ }
                )

                // Option 3: Écrire sur WhatsApp
                GrandOptionCard(
                    icon = "💬",
                    title = "Écrire sur WhatsApp",
                    onClick = {
                        val intent = Intent(Intent.ACTION_VIEW).apply {
                            data = Uri.parse("https://wa.me/2290136?text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20Ayidode")
                        }
                        context.startActivity(intent)
                    }
                )
            }
        }

        // FORMULAIRE: Demander un rappel
        item {
            Spacer(modifier = Modifier.height(36.dp))
            Text(
                text = "Demander un rappel",
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
                    .padding(horizontal = 20.dp)
                    .clip(RoundedCornerShape(24.dp))
                    .background(AyidodeVertBrume)
                    .padding(24.dp)
            ) {
                // Nom (optionnel)
                Text(
                    text = "Nom (optionnel)",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = inputNom,
                    onValueChange = { inputNom = it },
                    placeholder = { Text("Votre nom", color = Color.Gray) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedContainerColor = AyidodeBlanc,
                        unfocusedContainerColor = AyidodeBlanc,
                        focusedBorderColor = AyidodeVert,
                        unfocusedBorderColor = AyidodeVert.copy(alpha = 0.2f)
                    ),
                    singleLine = true
                )

                Spacer(modifier = Modifier.height(14.dp))

                // Téléphone
                Text(
                    text = "Téléphone",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = inputTelephone,
                    onValueChange = { inputTelephone = it },
                    placeholder = { Text("+229 XX XX XX XX", color = Color.Gray) },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedContainerColor = AyidodeBlanc,
                        unfocusedContainerColor = AyidodeBlanc,
                        focusedBorderColor = AyidodeVert,
                        unfocusedBorderColor = AyidodeVert.copy(alpha = 0.2f)
                    ),
                    singleLine = true
                )

                Spacer(modifier = Modifier.height(14.dp))

                // Motif
                Text(
                    text = "Motif",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
                Spacer(modifier = Modifier.height(6.dp))

                ExposedDropdownMenuBox(
                    expanded = motifExpanded,
                    onExpandedChange = { motifExpanded = !motifExpanded },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    OutlinedTextField(
                        value = selectedMotif,
                        onValueChange = {},
                        readOnly = true,
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = motifExpanded) },
                        modifier = Modifier
                            .menuAnchor()
                            .fillMaxWidth()
                            .height(56.dp),
                        shape = RoundedCornerShape(14.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedContainerColor = AyidodeBlanc,
                            unfocusedContainerColor = AyidodeBlanc,
                            focusedBorderColor = AyidodeVert,
                            unfocusedBorderColor = AyidodeVert.copy(alpha = 0.2f)
                        )
                    )
                    ExposedDropdownMenu(
                        expanded = motifExpanded,
                        onDismissRequest = { motifExpanded = false }
                    ) {
                        listOf(
                            "Je veux des informations",
                            "Dépistage col de l'utérus",
                            "Vaccination VPH pour ma fille",
                            "Signes d'alerte / Inquiétude",
                            "Centre de santé le plus proche"
                        ).forEach { motif ->
                            DropdownMenuItem(
                                text = { Text(motif) },
                                onClick = {
                                    selectedMotif = motif
                                    motifExpanded = false
                                }
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Demander un rappel button (Terracotta solid 3D)
                AyidodeButton(
                    text = if (requestSent) "Rappel demandé avec succès ✓" else "Demander un rappel",
                    onClick = { requestSent = true },
                    isSecondary = true,
                    testTag = "btn_demander_rappel_submit"
                )
            }
        }

        // DISCLAIMER: Nous ne posons pas de diagnostic...
        item {
            Spacer(modifier = Modifier.height(18.dp))
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(text = "⚠️", fontSize = 16.sp)
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Nous ne posons pas de diagnostic. Nous vous orientons vers un professionnel de santé.",
                    fontSize = 13.sp,
                    color = AyidodeGrisTexte,
                    lineHeight = 18.sp
                )
            }
        }

        // FOOTER: Vous n'êtes pas seuls.
        item {
            Spacer(modifier = Modifier.height(40.dp))
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
private fun GrandOptionCard(
    icon: String,
    title: String,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .shadow(elevation = 2.dp, shape = ShapeCarteAyidode)
            .clip(ShapeCarteAyidode)
            .background(AyidodeBlanc)
            .clickable(onClick = onClick)
            .padding(vertical = 20.dp, horizontal = 22.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = icon, fontSize = 20.sp)
            Spacer(modifier = Modifier.width(12.dp))
            Text(
                text = title,
                fontSize = 17.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeTerracotta
            )
        }
    }
}
