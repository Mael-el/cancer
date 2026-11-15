package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.ui.AyidodeViewModel
import com.example.ui.components.AyidodeBottomBar
import com.example.ui.screens.Interface1Accueil
import com.example.ui.screens.Interface2CancerCol
import com.example.ui.screens.Interface3Alimentation
import com.example.ui.screens.Interface4Infirmier
import com.example.ui.screens.Interface5Centres
import com.example.ui.screens.Interface6Questionnaire
import com.example.ui.screens.Interface7Resultats
import com.example.ui.screens.Interface8TableauDeBord
import com.example.ui.screens.Interface9Fiches
import com.example.ui.theme.AyidodeBlanc
import com.example.ui.theme.MyApplicationTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                AyidodeApp()
            }
        }
    }
}

@Composable
fun AyidodeApp(viewModel: AyidodeViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsState()

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            AyidodeBottomBar(
                activeInterface = uiState.activeInterface,
                language = uiState.language,
                onInterfaceSelected = { viewModel.navigateToInterface(it) }
            )
        },
        containerColor = AyidodeBlanc
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .background(AyidodeBlanc)
        ) {
            when (uiState.activeInterface) {
                1 -> Interface1Accueil(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
                2 -> Interface2CancerCol(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
                3 -> Interface3Alimentation(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
                4 -> Interface4Infirmier(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
                5 -> Interface5Centres(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
                6 -> Interface6Questionnaire(
                    onContinuer = { viewModel.navigateToInterface(7) }
                )
                7 -> Interface7Resultats(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
                8 -> Interface8TableauDeBord(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
                9 -> Interface9Fiches(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
                else -> Interface1Accueil(
                    onNavigateToInterface = { viewModel.navigateToInterface(it) }
                )
            }
        }
    }
}
