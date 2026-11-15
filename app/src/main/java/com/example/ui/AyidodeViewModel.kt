package com.example.ui

import androidx.lifecycle.ViewModel
import com.example.data.AppLanguage
import com.example.data.AssessmentResult
import com.example.data.AyidodeRepository
import com.example.data.CancerInfo
import com.example.data.ChatMessage
import com.example.data.PracticalTip
import com.example.data.ScreeningReminder
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.UUID

data class AyidodeUiState(
    val language: AppLanguage = AppLanguage.FRENCH,
    val selectedTab: Int = 0,
    val activeInterface: Int = 1, // 1 to 9 corresponding to the 9 interfaces
    // Risk Assessment Quiz
    val currentQuestionIndex: Int = 0,
    val quizAnswers: Map<Int, Int> = emptyMap(),
    val assessmentResult: AssessmentResult? = null,
    val isQuizCompleted: Boolean = false,
    // Screening Centers
    val selectedDepartment: String = "Tous",
    // Reminders
    val reminders: List<ScreeningReminder> = AyidodeRepository.defaultReminders,
    // Chatbot
    val chatMessages: List<ChatMessage> = listOf(
        ChatMessage(
            id = "welcome_bot",
            text = "Bonjour et bienvenue sur Ayidodé+ (Santé & Prévention du cancer au Bénin). Posez-moi vos questions en toute confidentialité sur le dépistage du col de l'utérus, les seins, les moisissures d'aflatoxine ou les centres d'examen agréés.",
            isUser = false,
            timestamp = "À l'instant",
            quickReplies = listOf("Dépistage du col", "Aflatoxine & Maïs", "Centres à Cotonou", "Autopalpation du sein")
        )
    ),
    val isChatLoading: Boolean = false,
    // Detail sheets
    val activeCancerDetail: CancerInfo? = null,
    val activeTipDetail: PracticalTip? = null
)

class AyidodeViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(AyidodeUiState())
    val uiState: StateFlow<AyidodeUiState> = _uiState.asStateFlow()

    fun setLanguage(language: AppLanguage) {
        _uiState.value = _uiState.value.copy(language = language)
        // If chat has only default message, adapt greeting
        if (_uiState.value.chatMessages.size <= 1) {
            val welcomeText = if (language == AppLanguage.FONGBE) {
                "Kú do ayihɔngbe ! Ayidodé+ ɖo fi bo na d'alɔ we do lanmɛzɔn e nɔ gbɔ e wu (adɔgo lanmɛzɔn, anɔ̌ lanmɛzɔn, azin kpo gbado kpo)."
            } else {
                "Bonjour et bienvenue sur Ayidodé+ (Santé & Prévention du cancer au Bénin). Posez-moi vos questions en toute confidentialité sur le dépistage du col de l'utérus, les seins, les moisissures d'aflatoxine ou les centres d'examen agréés."
            }
            val quicks = if (language == AppLanguage.FONGBE) {
                listOf("Adɔgo lanmɛzɔn", "Azin kpo gbado kpo", "Dotoxó lɛ")
            } else {
                listOf("Dépistage du col", "Aflatoxine & Maïs", "Centres à Cotonou", "Autopalpation du sein")
            }
            _uiState.value = _uiState.value.copy(
                chatMessages = listOf(
                    ChatMessage(
                        id = "welcome_bot",
                        text = welcomeText,
                        isUser = false,
                        quickReplies = quicks
                    )
                )
            )
        }
    }

    fun selectTab(index: Int) {
        _uiState.value = _uiState.value.copy(selectedTab = index)
    }

    fun navigateToInterface(interfaceNumber: Int) {
        _uiState.value = _uiState.value.copy(activeInterface = interfaceNumber)
    }

    fun answerQuestion(questionId: Int, score: Int) {
        val updatedAnswers = _uiState.value.quizAnswers.toMutableMap()
        updatedAnswers[questionId] = score

        val totalQuestions = AyidodeRepository.quizQuestions.size
        val nextIndex = _uiState.value.currentQuestionIndex + 1

        if (nextIndex < totalQuestions) {
            _uiState.value = _uiState.value.copy(
                quizAnswers = updatedAnswers,
                currentQuestionIndex = nextIndex
            )
        } else {
            // Compute score
            val totalScore = updatedAnswers.values.sum()
            val result = AyidodeRepository.evaluateRisk(totalScore)
            _uiState.value = _uiState.value.copy(
                quizAnswers = updatedAnswers,
                assessmentResult = result,
                isQuizCompleted = true
            )
        }
    }

    fun restartQuiz() {
        _uiState.value = _uiState.value.copy(
            currentQuestionIndex = 0,
            quizAnswers = emptyMap(),
            assessmentResult = null,
            isQuizCompleted = false
        )
    }

    fun setSelectedDepartment(dept: String) {
        _uiState.value = _uiState.value.copy(selectedDepartment = dept)
    }

    fun toggleReminderDone(reminderId: String) {
        val updated = _uiState.value.reminders.map {
            if (it.id == reminderId) it.copy(isDone = !it.isDone) else it
        }
        _uiState.value = _uiState.value.copy(reminders = updated)
    }

    fun addReminder(title: String, cancerType: String, dueDate: String, periodicity: String) {
        val newReminder = ScreeningReminder(
            id = UUID.randomUUID().toString(),
            title = title,
            cancerType = cancerType,
            dueDate = dueDate,
            periodicity = periodicity,
            isDone = false
        )
        _uiState.value = _uiState.value.copy(
            reminders = listOf(newReminder) + _uiState.value.reminders
        )
    }

    fun sendChatMessage(text: String) {
        if (text.isBlank()) return

        val userMsg = ChatMessage(
            id = UUID.randomUUID().toString(),
            text = text,
            isUser = true,
            timestamp = "À l'instant"
        )

        val currentList = _uiState.value.chatMessages + userMsg
        _uiState.value = _uiState.value.copy(chatMessages = currentList)

        // Bot response
        val botMsg = AyidodeRepository.getChatBotResponse(text, _uiState.value.language)
        _uiState.value = _uiState.value.copy(
            chatMessages = _uiState.value.chatMessages + botMsg
        )
    }

    fun openCancerDetail(info: CancerInfo?) {
        _uiState.value = _uiState.value.copy(activeCancerDetail = info)
    }

    fun openTipDetail(tip: PracticalTip?) {
        _uiState.value = _uiState.value.copy(activeTipDetail = tip)
    }
}
