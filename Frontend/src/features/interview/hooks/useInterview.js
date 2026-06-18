import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, getResumeHtml } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.error("generateReport error:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.error("getReportById error:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
            return response.interviewReports
        } catch (error) {
            console.error("getReports error:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        try {
            // Get HTML from backend
            const response = await getResumeHtml({ interviewReportId })

            if (!response || !response.html) {
                throw new Error("No HTML content received from server")
            }

            // Convert HTML to PDF client-side using html2pdf.js
            const html2pdf = (await import("html2pdf.js")).default

            // Create a temporary container for the HTML
            const container = document.createElement("div")
            container.innerHTML = response.html
            container.style.position = "absolute"
            container.style.left = "-9999px"
            container.style.top = "0"
            document.body.appendChild(container)

            await html2pdf().set({
                margin: [10, 10, 10, 10],
                filename: `resume_${interviewReportId}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
            }).from(container).save()

            // Clean up
            document.body.removeChild(container)
        }
        catch (error) {
            console.error("getResumePdf error:", error)
            alert("Failed to download resume PDF. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}