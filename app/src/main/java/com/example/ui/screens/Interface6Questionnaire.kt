package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.AyidodeButton
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeGrisTexte
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume

/**
 * INTERFACE 6 — QUESTIONNAIRE
 * Conforme exactement aux captures:
 * Capture d’écran du 2026-09-19 02-36-22.png
 */
@Composable
fun Interface6Questionnaire(
    onContinuer: () -> Unit,
    modifier: Modifier = Modifier
) {
    val optionsAge = listOf(
        "Moins de 25 ans",
        "25 à 35 ans",
        "36 à 50 ans",
        "Plus de 50 ans"
    )

    var selectedOption by remember { mutableStateOf("25 à 35 ans") }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(AyidodeBlanc)
            .testTag("interface_6_questionnaire"),
        contentPadding = PaddingValues(horizontal = 24.dp, vertical = 20.dp)
    ) {
        // TOP PROGRESSION BAR (Thin line: 20% green, remaining misty green)
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(6.dp)
                    .clip(RoundedCornerShape(3.dp))
                    .background(AyidodeVertBrume)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.25f)
                        .height(6.dp)
                        .clip(RoundedCornerShape(3.dp))
                        .background(AyidodeVert)
                )
            }
            Spacer(modifier = Modifier.height(36.dp))
        }

        // QUESTION TITLE: "Quel est votre âge ?"
        item {
            Text(
                text = "Quel est votre âge ?",
                fontFamily = FontFamily.Serif,
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = AyidodeEncre
            )
            Spacer(modifier = Modifier.height(28.dp))
        }

        // 4 AGE OPTIONS (Outlined rounded boxes with clear click feedback)
        items(optionsAge.size) { index ->
            val optionText = optionsAge[index]
            val isSelected = optionText == selectedOption

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(if (isSelected) AyidodeVertBrume.copy(alpha = 0.5f) else AyidodeBlanc)
                    .border(
                        width = if (isSelected) 2.dp else 1.5.dp,
                        color = if (isSelected) AyidodeVert else AyidodeVert.copy(alpha = 0.25f),
                        shape = RoundedCornerShape(16.dp)
                    )
                    .clickable { selectedOption = optionText }
                    .padding(vertical = 18.dp, horizontal = 20.dp)
            ) {
                Text(
                    text = optionText,
                    fontSize = 16.sp,
                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                    color = AyidodeEncre
                )
            }
            Spacer(modifier = Modifier.height(14.dp))
        }

        // BUTTON: "Continuer"
        item {
            Spacer(modifier = Modifier.height(20.dp))
            AyidodeButton(
                text = "Continuer",
                onClick = onContinuer,
                isSecondary = false,
                testTag = "btn_questionnaire_continuer"
            )
            Spacer(modifier = Modifier.height(14.dp))
            Box(
                modifier = Modifier.fillMaxWidth(),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "Chaque réponse nous aide à mieux vous orienter.",
                    fontSize = 13.sp,
                    color = AyidodeGrisTexte
                )
            }
        }
    }
}
