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
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.ChatBubble
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.AyidodeButton
import com.example.ui.components.AyidodeFooter
import com.example.ui.components.ShapeCarteAyidode
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeCreme
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeGrisTexte
import com.example.ui.theme.AyidodeOcre
import com.example.ui.theme.AyidodeTerracotta
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume
import com.example.ui.theme.AyidodeVertProfond
import com.example.util.AudioNarrator
import android.widget.Toast
import kotlinx.coroutines.launch

data class MiniMessage(
    val text: String,
    val isAssistant: Boolean,
    val hasAudioFon: Boolean = false
)

/**
 * INTERFACE 1 — ACCUEIL
 * Reproduit fidèlement les captures Capture d’écran du 2026-09-19 02-35-33.png & 02-35-41.png
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Interface1Accueil(
    onNavigateToInterface: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()

    var inputQuestion by remember { mutableStateOf("") }
    var inputPhone by remember { mutableStateOf("") }
    var selectedLang by remember { mutableStateOf("Français") }
    var langExpanded by remember { mutableStateOf(false) }
    var inscriptionSuccess by remember { mutableStateOf(false) }

    val messages = remember {
        mutableStateListOf(
            MiniMessage("Bonjour ! Comment puis-je vous aider aujourd'hui ?", isAssistant = true, hasAudioFon = true),
            MiniMessage("Quels sont les signes du cancer du col ?", isAssistant = false),
            MiniMessage("Saignements anormaux, douleurs, pertes inhabituelles. Si vous avez un de ces signes, allez au centre de santé.", isAssistant = true, hasAudioFon = true)
        )
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_1_accueil"),
        contentPadding = PaddingValues(bottom = 0.dp)
    ) {
        // TOP HEADER: Ayidodé+ Logo (left) | S'inscrire (right)
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Logo
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(CircleShape)
                            .background(AyidodeVert),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("🌿", fontSize = 18.sp)
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Text(
                        text = "Ayidodé+",
                        color = AyidodeVertProfond,
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                // S'inscrire Button
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(AyidodeVert)
                        .clickable { onNavigateToInterface(8) } // goes to dashboard / inscription
                        .padding(horizontal = 18.dp, vertical = 10.dp)
                ) {
                    Text(
                        text = "S'inscrire",
                        color = AyidodeBlanc,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // HERO TITLE & DECORATIVE BUBBLE
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp, vertical = 12.dp)
            ) {
                // Soft green circular background shape in top right
                Box(
                    modifier = Modifier
                        .size(160.dp)
                        .align(Alignment.TopEnd)
                        .clip(CircleShape)
                        .background(AyidodeVertBrume.copy(alpha = 0.7f))
                )

                Column(modifier = Modifier.fillMaxWidth()) {
                    // Big Editorial Headline with "une fatalité" in Terracotta
                    Text(
                        text = buildAnnotatedString {
                            append("Le cancer\nn'est pas ")
                            withStyle(style = SpanStyle(color = AyidodeTerracotta)) {
                                append("une\nfatalité.")
                            }
                        },
                        fontSize = 42.sp,
                        lineHeight = 48.sp,
                        fontWeight = FontWeight.Black,
                        fontFamily = FontFamily.Serif,
                        color = AyidodeEncre
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    Text(
                        text = "Dépister tôt, c'est protéger ceux qu'on aime.",
                        fontSize = 18.sp,
                        color = AyidodeEncre.copy(alpha = 0.9f),
                        lineHeight = 26.sp
                    )

                    Spacer(modifier = Modifier.height(28.dp))

                    // 1. Bouton "Parler à l'assistant" (Vert)
                    AyidodeButton(
                        text = "Parler à l'assistant",
                        onClick = { onNavigateToInterface(1) /* goes to cancer col or scroll chat */ },
                        isSecondary = false,
                        leadingIcon = {
                            Text("💬", fontSize = 18.sp)
                        },
                        testTag = "btn_parler_assistant"
                    )

                    Spacer(modifier = Modifier.height(12.dp))

                    // 2. Bouton "Parler à un infirmier" (Terracotta)
                    AyidodeButton(
                        text = "Parler à un infirmier",
                        onClick = { onNavigateToInterface(4) },
                        isSecondary = true,
                        leadingIcon = {
                            Text("📞", fontSize = 18.sp)
                        },
                        testTag = "btn_parler_infirmier_hero"
                    )
                }
            }
        }

        // 3 CHIFFRES CLÉS (Terracotta 28px Sora in green misty rounded cards)
        item {
            Spacer(modifier = Modifier.height(24.dp))
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                // Card 1
                ChiffreCard(
                    modifier = Modifier.weight(1f),
                    valeur = "7 500",
                    label = "CAS / AN"
                )
                // Card 2
                ChiffreCard(
                    modifier = Modifier.weight(1f),
                    valeur = "5 000",
                    label = "DÉCÈS / AN"
                )
                // Card 3
                ChiffreCard(
                    modifier = Modifier.weight(1f),
                    valeur = "Gratuit",
                    label = "DÉPISTAGE"
                )
            }
        }

        // SECTION: Ce que fait Ayidodé+
        item {
            Spacer(modifier = Modifier.height(36.dp))
            Text(
                text = "Ce que fait Ayidodé+",
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
                // Action 1 -> Interface 2 (Col de l'utérus)
                ActionCard(
                    emoji = "📚",
                    titre = "Apprendre à prévenir",
                    sousTitre = "Cause, signes, solutions",
                    onClick = { onNavigateToInterface(2) }
                )
                // Action 2 -> Interface 3 (Alimentation)
                ActionCard(
                    emoji = "🥗",
                    titre = "Bien manger, pas cher",
                    sousTitre = "500, 1 000, 2 000 FCFA",
                    onClick = { onNavigateToInterface(3) }
                )
                // Action 3 -> Interface 5 (Trouver un centre)
                ActionCard(
                    emoji = "📍",
                    titre = "Trouver un centre",
                    sousTitre = "Le plus proche de vous",
                    onClick = { onNavigateToInterface(5) }
                )
                // Action 4 -> Interface 8 (Tableau de bord / Rappels)
                ActionCard(
                    emoji = "🔔",
                    titre = "Recevoir des rappels",
                    sousTitre = "Vaccins, dépistages",
                    onClick = { onNavigateToInterface(8) }
                )
            }
        }

        // SECTION: Une question ? (Mini Chat interactif)
        item {
            Spacer(modifier = Modifier.height(36.dp))
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(horizontal = 24.dp)
            ) {
                Text("💬", fontSize = 22.sp)
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "Une question ?",
                    fontFamily = FontFamily.Serif,
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
            }
            Spacer(modifier = Modifier.height(16.dp))

            // Chat Box
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp)
                    .clip(RoundedCornerShape(24.dp))
                    .background(AyidodeCreme)
                    .padding(16.dp)
            ) {
                messages.forEach { msg ->
                    if (msg.isAssistant) {
                        // Bulle assistant
                        Box(
                            modifier = Modifier
                                .fillMaxWidth(0.88f)
                                .clip(RoundedCornerShape(topStart = 4.dp, topEnd = 20.dp, bottomEnd = 20.dp, bottomStart = 20.dp))
                                .border(
                                    width = 0.dp,
                                    color = Color.Transparent
                                )
                                .background(AyidodeBlanc)
                                .padding(horizontal = 16.dp, vertical = 14.dp)
                        ) {
                            Column {
                                Text(
                                    text = msg.text,
                                    color = AyidodeEncre,
                                    fontSize = 15.sp,
                                    lineHeight = 22.sp
                                )
                                if (msg.hasAudioFon) {
                                    Spacer(modifier = Modifier.height(8.dp))
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        modifier = Modifier.clickable { /* speak audio */ }
                                    ) {
                                        Icon(
                                            imageVector = Icons.Default.VolumeUp,
                                            contentDescription = null,
                                            tint = AyidodeVertProfond,
                                            modifier = Modifier.size(16.dp)
                                        )
                                        Spacer(modifier = Modifier.width(6.dp))
                                        Text(
                                            text = "Écouter en Fon",
                                            color = AyidodeVertProfond,
                                            fontSize = 12.sp,
                                            fontWeight = FontWeight.SemiBold
                                        )
                                    }
                                }
                            }
                        }
                    } else {
                        // Bulle utilisateur
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.End
                        ) {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth(0.85f)
                                    .clip(RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp, bottomEnd = 4.dp, bottomStart = 20.dp))
                                    .background(AyidodeVertBrume)
                                    .padding(horizontal = 16.dp, vertical = 14.dp)
                            ) {
                                Text(
                                    text = msg.text,
                                    color = AyidodeEncre,
                                    fontSize = 15.sp,
                                    lineHeight = 22.sp
                                )
                            }
                        }
                    }
                    Spacer(modifier = Modifier.height(10.dp))
                }

                // Chat Input Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    OutlinedTextField(
                        value = inputQuestion,
                        onValueChange = { inputQuestion = it },
                        placeholder = { Text("Écrivez votre question...", fontSize = 14.sp) },
                        modifier = Modifier
                            .weight(1f)
                            .height(56.dp),
                        shape = RoundedCornerShape(16.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedContainerColor = AyidodeBlanc,
                            unfocusedContainerColor = AyidodeBlanc,
                            focusedBorderColor = AyidodeVert,
                            unfocusedBorderColor = AyidodeVert.copy(alpha = 0.2f)
                        ),
                        singleLine = true
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Box(
                        modifier = Modifier
                            .size(52.dp)
                            .clip(CircleShape)
                            .background(AyidodeVert)
                            .clickable {
                                if (inputQuestion.isNotBlank()) {
                                    messages.add(MiniMessage(inputQuestion, isAssistant = false))
                                    val q = inputQuestion
                                    inputQuestion = ""
                                    // Simulated smart response
                                    messages.add(
                                        MiniMessage(
                                            "Merci pour votre question sur '$q'. Le dépistage précoce permet d'éviter plus de 90% des complications. Nos centres de santé sont à votre disposition.",
                                            isAssistant = true,
                                            hasAudioFon = true
                                        )
                                    )
                                }
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                            contentDescription = "Envoyer",
                            tint = AyidodeBlanc,
                            modifier = Modifier.size(22.dp)
                        )
                    }
                }
            }
        }

        // SECTION: Inscrivez-vous gratuitement
        item {
            Spacer(modifier = Modifier.height(36.dp))
            Text(
                text = "Inscrivez-vous gratuitement",
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
                Text(
                    text = "Téléphone",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
                Spacer(modifier = Modifier.height(6.dp))
                OutlinedTextField(
                    value = inputPhone,
                    onValueChange = { inputPhone = it },
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

                Text(
                    text = "Langue préférée",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = AyidodeEncre
                )
                Spacer(modifier = Modifier.height(6.dp))

                ExposedDropdownMenuBox(
                    expanded = langExpanded,
                    onExpandedChange = { langExpanded = !langExpanded },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    OutlinedTextField(
                        value = selectedLang,
                        onValueChange = {},
                        readOnly = true,
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = langExpanded) },
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
                        expanded = langExpanded,
                        onDismissRequest = { langExpanded = false }
                    ) {
                        listOf("Français", "Fɔngbe (Fon)", "Yoruba", "Bariba").forEach { lang ->
                            DropdownMenuItem(
                                text = { Text(lang) },
                                onClick = {
                                    selectedLang = lang
                                    langExpanded = false
                                }
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(20.dp))

                AyidodeButton(
                    text = if (inscriptionSuccess) "Inscrit avec succès ✓" else "Je m'inscris",
                    onClick = {
                        inscriptionSuccess = true
                        onNavigateToInterface(8) // navigates to personal dashboard
                    },
                    isSecondary = false,
                    testTag = "btn_je_minscris"
                )
            }
        }

        // FOOTER 136 NUMÉRO VERT
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
private fun ChiffreCard(
    valeur: String,
    label: String,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp, bottomEnd = 6.dp, bottomStart = 20.dp))
            .background(AyidodeVertBrume)
            .padding(vertical = 16.dp, horizontal = 8.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = valeur,
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeTerracotta
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = label,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeEncre,
                letterSpacing = 0.5.sp
            )
        }
    }
}

@Composable
private fun ActionCard(
    emoji: String,
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
            .border(
                width = 3.dp,
                color = Color.Transparent,
                shape = ShapeCarteAyidode
            )
            .clickable(onClick = onClick)
            .padding(18.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(text = emoji, fontSize = 28.sp)
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
