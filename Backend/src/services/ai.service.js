const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// Primary and fallback models
const PRIMARY_MODEL = "gemini-3-flash-preview"
const FALLBACK_MODEL = "gemini-2.0-flash"

/**
 * @description Calls the Gemini API with automatic retry and model fallback.
 * Retries up to 2 times on transient errors (503, 429), then falls back to a stable model.
 */
async function callGeminiWithRetry({ prompt, responseSchema, maxRetries = 3 }) {
    let lastError = null

    // Try primary model with retries
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: PRIMARY_MODEL,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: zodToJsonSchema(responseSchema),
                }
            })
            return JSON.parse(response.text)
        } catch (err) {
            lastError = err
            const errMsg = String(err.message || err)
            console.error(`Gemini API attempt ${attempt + 1}/${maxRetries + 1} failed (${PRIMARY_MODEL}):`, errMsg)

            // Only retry on transient errors (503 UNAVAILABLE, 429 RATE_LIMIT)
            const isTransient = errMsg.includes("503") || errMsg.includes("429") || errMsg.includes("UNAVAILABLE") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("high demand")
            if (!isTransient) break

            // Wait before retrying (exponential backoff: 3s, 6s, 9s)
            if (attempt < maxRetries) {
                const waitMs = (attempt + 1) * 3000
                console.log(`Retrying in ${waitMs / 1000}s...`)
                await new Promise(resolve => setTimeout(resolve, waitMs))
            }
        }
    }

    // Fallback to stable model
    console.log(`Falling back to ${FALLBACK_MODEL}...`)
    try {
        const response = await ai.models.generateContent({
            model: FALLBACK_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(responseSchema),
            }
        })
        return JSON.parse(response.text)
    } catch (fallbackErr) {
        console.error(`Fallback model (${FALLBACK_MODEL}) also failed:`, fallbackErr.message || fallbackErr)
        throw lastError || fallbackErr
    }
}


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`

    return await callGeminiWithRetry({ prompt, responseSchema: interviewReportSchema })
}



async function generateResumeHtml({ resume, selfDescription, jobDescription }) {

    const resumeHtmlSchema = z.object({
        html: z.string().describe("The complete HTML content of the resume with inline CSS styling. Must be a self-contained HTML document that looks professional when printed.")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the complete HTML content of the resume.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        Use inline CSS styles for all styling. The design should be simple, professional, and ATS friendly.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when printed. Focus on quality rather than quantity.
                    `

    const jsonContent = await callGeminiWithRetry({ prompt, responseSchema: resumeHtmlSchema })

    return jsonContent.html

}

module.exports = { generateInterviewReport, generateResumeHtml }