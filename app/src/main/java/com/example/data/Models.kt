package com.example.data

enum class AppLanguage {
    FRENCH,
    FONGBE
}

data class CancerInfo(
    val id: String,
    val nameFr: String,
    val nameFon: String,
    val badge: String,
    val descriptionFr: String,
    val descriptionFon: String,
    val symptomsFr: List<String>,
    val preventionFr: List<String>,
    val screeningMethodFr: String
)

data class ScreeningCenter(
    val id: String,
    val name: String,
    val department: String,
    val city: String,
    val address: String,
    val phone: String,
    val services: List<String>,
    val isNationalCampaignActive: Boolean = true,
    val pricingNote: String = "Tarif public subventionné"
)

data class QuizQuestion(
    val id: Int,
    val questionFr: String,
    val questionFon: String,
    val contextExplanationFr: String,
    val optionsFr: List<QuizOption>
)

data class QuizOption(
    val textFr: String,
    val textFon: String,
    val riskScore: Int
)

data class AssessmentResult(
    val totalScore: Int,
    val level: RiskLevel,
    val titleFr: String,
    val titleFon: String,
    val adviceFr: List<String>,
    val recommendedExamsFr: List<String>
)

enum class RiskLevel {
    LOW,
    MODERATE,
    HIGH
}

data class ScreeningReminder(
    val id: String,
    val title: String,
    val cancerType: String,
    val dueDate: String,
    val periodicity: String,
    val isDone: Boolean = false
)

data class PracticalTip(
    val id: String,
    val titleFr: String,
    val titleFon: String,
    val category: String,
    val shortSummaryFr: String,
    val detailedContentFr: String,
    val isMythDebunk: Boolean = false,
    val mythStatementFr: String? = null
)

data class ChatMessage(
    val id: String,
    val text: String,
    val isUser: Boolean,
    val timestamp: String = "Maintenant",
    val quickReplies: List<String> = emptyList()
)
