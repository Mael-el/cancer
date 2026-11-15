package com.example.ui.components

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Assignment
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.Fastfood
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocalHospital
import androidx.compose.material.icons.filled.MedicalServices
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.outlined.Assignment
import androidx.compose.material.icons.outlined.Description
import androidx.compose.material.icons.outlined.Fastfood
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.LocalHospital
import androidx.compose.material.icons.outlined.MedicalServices
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Phone
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.AppLanguage
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.AyidodeEncre
import com.example.ui.theme.AyidodeVert
import com.example.ui.theme.AyidodeVertBrume
import com.example.ui.theme.AyidodeVertProfond

data class NavigationTabItem(
    val id: Int,
    val titleFr: String,
    val titleFon: String,
    val selectedIcon: ImageVector,
    val unselectedIcon: ImageVector,
    val testTag: String
)

@Composable
fun AyidodeBottomBar(
    activeInterface: Int,
    language: AppLanguage,
    onInterfaceSelected: (Int) -> Unit
) {
    val items = listOf(
        NavigationTabItem(1, "1. Accueil", "Axɔsu", Icons.Filled.Home, Icons.Outlined.Home, "tab_1_accueil"),
        NavigationTabItem(2, "2. Col utérus", "Adɔgo", Icons.Filled.MedicalServices, Icons.Outlined.MedicalServices, "tab_2_col"),
        NavigationTabItem(3, "3. Alimentation", "Nǔɖuɖu", Icons.Filled.Fastfood, Icons.Outlined.Fastfood, "tab_3_alimentation"),
        NavigationTabItem(4, "4. Infirmier", "Doto", Icons.Filled.Phone, Icons.Outlined.Phone, "tab_4_infirmier"),
        NavigationTabItem(5, "5. Centres", "Dotoxó", Icons.Filled.LocalHospital, Icons.Outlined.LocalHospital, "tab_5_centres"),
        NavigationTabItem(6, "6. Questionnaire", "Kancicé", Icons.Filled.Assignment, Icons.Outlined.Assignment, "tab_6_questionnaire"),
        NavigationTabItem(7, "7. Résultats", "Nukún", Icons.Filled.CheckCircle, Icons.Filled.CheckCircle, "tab_7_resultats"),
        NavigationTabItem(8, "8. Mon espace", "Wema ce", Icons.Filled.Person, Icons.Outlined.Person, "tab_8_espace"),
        NavigationTabItem(9, "9. Fiches", "Flinmɛ", Icons.Filled.Description, Icons.Outlined.Description, "tab_9_fiches")
    )

    Surface(
        modifier = Modifier.testTag("ayidode_bottom_nav"),
        color = AyidodeBlanc,
        shadowElevation = 8.dp
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 8.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            items.forEach { item ->
                val isSelected = activeInterface == item.id
                val title = if (language == AppLanguage.FONGBE) item.titleFon else item.titleFr

                FilterChip(
                    modifier = Modifier.testTag(item.testTag),
                    selected = isSelected,
                    onClick = { onInterfaceSelected(item.id) },
                    leadingIcon = {
                        Icon(
                            imageVector = if (isSelected) item.selectedIcon else item.unselectedIcon,
                            contentDescription = title,
                            tint = if (isSelected) AyidodeBlanc else AyidodeVertProfond
                        )
                    },
                    label = {
                        Text(
                            text = title,
                            fontSize = 12.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                        )
                    },
                    colors = FilterChipDefaults.filterChipColors(
                        containerColor = AyidodeVertBrume,
                        labelColor = AyidodeEncre,
                        selectedContainerColor = AyidodeVert,
                        selectedLabelColor = AyidodeBlanc
                    )
                )
            }
        }
    }
}
