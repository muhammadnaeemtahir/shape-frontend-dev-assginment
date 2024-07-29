import { useState } from "react"
import { ToolTip } from "./ToolTip"
import { RxCross2 } from "react-icons/rx";
import database from '../../database/questions.json'

export const SurveyForm = () => {
    const { title, dob, performance, other_sources, work_life_balance } = database

    const [success, setIsSuccess] = useState(false)
    const [survey, setSurvey] = useState({
        title: 'Select Title',
        day: '',
        month: '',
        year: '',
        rating: 0,
        otherSources: '',
        otherSourcesLength: 0,
        workLifeBalance: ''
    })

    const [errors, setErrors] = useState({
        day: '',
        month: '',
        year: '',
        otherSources: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        let hasErrors = false
        setIsSuccess(false)

        let day = parseInt(survey.day)
        if (!day || !(day >= 1 && day <= 31)) {
            setErrors((prev) => ({
                ...prev,
                day: dob.validations.day,
            }))
            hasErrors = true
        }

        let month = parseInt(survey.month)
        if (!month || !(month >= 1 && month <= 12)) {
            setErrors((prev) => ({
                ...prev,
                month: dob.validations.month,
            }))
            hasErrors = true
        }

        let year = parseInt(survey.year)
        if (!year || !(year >= 1920 && year <= 2006)) {
            setErrors((prev) => ({
                ...prev,
                year: dob.validations.year,
            }))
            hasErrors = true
        }

        if (survey.otherSourcesLength > 250) {
            setErrors((prev) => ({
                ...prev,
                otherSources: other_sources.validation,
            }))
            hasErrors = true
        }

        if (hasErrors) return

        // data formation
        let data = {
            title: survey.title,
            dob: {
                day: survey.day,
                month: survey.month,
                year: survey.year
            },
            rating: survey.rating,
            otherSources: survey.otherSources,
            workLifeBalance: survey.workLifeBalance
        }

        // save data into a json file using json server
        saveJsonData(data)

        // clear the form fields after successful submission
        setSurvey({
            title: 'Select Title',
            day: '',
            month: '',
            year: '',
            rating: 0,
            otherSources: '',
            otherSourcesLength: 0,
            workLifeBalance: ''
        })
    }

    const saveJsonData = async (data) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_JSON_SERVER_PORT}/responses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            setIsSuccess(true)
        } catch (error) {
            console.error('Error:', error.message)
        }
    }

    return (
        <>
            <main className="container my-5">
                <div className="col-md-8 mx-auto">

                    <h1 className="display-1 text-center">Survery Form</h1>
                    <em className="d-block text-center mb-4">Thank you for taking the time to help us improve the platform</em>

                    <form className="row card border-0 p-md-4 p-2 bg-darkbkue-alpha" onSubmit={handleSubmit}>

                        {/* title */}
                        <div className="col-12 mb-4">
                            <label htmlFor="title" className="form-label fw-bold text-white h5">{title.question_title}</label>
                            <select
                                name="title"
                                id="title"
                                className="form-select p-3"
                                value={survey.title}
                                onChange={(e) => setSurvey((prev) => ({ ...prev, title: e.target.value }))}>
                                <option disabled defaultValue>Select Title</option>
                                {
                                    title.options && title.options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* DOB */}
                        <div className="col-12 mb-4">
                            <label htmlFor="date-of-birth" className="form-label fw-bold text-white h5">
                                {dob.question_title}
                                <ToolTip info={dob.info} classes='ms-1 text-warning' />
                            </label>
                            <div className="row">
                                <div className="col-4">
                                    <label htmlFor="day" className="form-label text-white">Day</label>
                                    <input
                                        type="number"
                                        className="form-control p-3"
                                        name="day"
                                        id="day"
                                        value={survey.day}
                                        placeholder="dd"
                                        onChange={(e) => {
                                            setSurvey((prev) => ({ ...prev, day: e.target.value, }))
                                            setErrors((prev) => ({ ...prev, day: '', }))
                                        }}
                                    />
                                    {errors.day && <p className="text-warning">{errors.day}</p>}
                                </div>
                                <div className="col-4">
                                    <label htmlFor="month" className="form-label text-white">Month</label>
                                    <input
                                        type="number"
                                        className="form-control p-3"
                                        name="month"
                                        id="month"
                                        value={survey.month}
                                        placeholder="mm"
                                        onChange={(e) => {
                                            setSurvey((prev) => ({ ...prev, month: e.target.value }))
                                            setErrors((prev) => ({ ...prev, month: '', }))
                                        }}
                                    />
                                    {errors.month && <p className="text-warning">{errors.month}</p>}
                                </div>
                                <div className="col-4">
                                    <label htmlFor="year" className="form-label text-white">Year</label>
                                    <input
                                        type="number"
                                        className="form-control p-3"
                                        name="year"
                                        id="year"
                                        value={survey.year}
                                        placeholder="yyyy"
                                        onChange={(e) => {
                                            setSurvey((prev) => ({ ...prev, year: e.target.value }))
                                            setErrors((prev) => ({ ...prev, year: '' }))
                                        }}
                                    />
                                    {errors.year && <p className="text-warning">{errors.year}</p>}
                                </div>
                            </div>
                        </div>

                        {/* performance */}
                        <div className="col-12 mb-4">
                            <label htmlFor="performance" className="form-label fw-bold text-white h5">
                                {performance.question_title}
                            </label>
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                {
                                    performance.ratings && performance.ratings.map((number) => (
                                        <button
                                            key={number} type="button"
                                            value={number}
                                            className={`btn btn-lg ${number === survey.rating ? 'btn-light' : 'btn-warning'}`}
                                            onClick={(e) => setSurvey((prev) => ({ ...prev, rating: parseInt(e.target.value) }))}
                                        >
                                            {number}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* other sources */}
                        <div className="col-12 mb-4">
                            <label htmlFor="other-sources" className="form-label fw-bold text-white h5">
                                {other_sources.question_title}
                                <ToolTip info={other_sources.info} classes='ms-1 text-warning' />
                            </label>
                            <textarea
                                name="other-sources"
                                value={survey.otherSources}
                                onChange={(e) => {
                                    setSurvey((prev) => ({
                                        ...prev,
                                        otherSources: e.target.value,
                                        otherSourcesLength: e.target.value.length,
                                    }))

                                    setErrors((prev) => ({ ...prev, otherSources: '' }))
                                }}
                                className="form-control"
                                id="other-sources"
                                placeholder="Your text..."
                                rows={5}></textarea>
                            <div className="d-flex justify-content-between">
                                {errors.otherSources && <p className="text-warning">{errors.otherSources}</p>}
                                <p className={`${survey.otherSourcesLength >= 250 ? 'text-danger' : 'text-warning'}`}>{survey.otherSourcesLength}/250</p>
                            </div>
                        </div>

                        {/* work_life_balance */}
                        <div className="col-12 mb-4">
                            <label htmlFor="work_life_balance" className="form-label fw-bold text-white h5">{work_life_balance.question_title}</label>
                            {
                                work_life_balance.options && work_life_balance.options.map((option, index) => (
                                    <button
                                        className={`btn w-100 mb-2 ${option === survey.workLifeBalance ? 'btn-light' : 'btn-warning'}`}
                                        key={index}
                                        value={option}
                                        type="button"
                                        onClick={(e) => setSurvey((prev) => ({ ...prev, workLifeBalance: e.target.value }))}
                                    >
                                        {option}
                                    </button>
                                ))
                            }
                        </div>

                        <div className="col-12">
                            <button className="btn btn-success w-100 p-3 fw-bold mb-5" type="submit">Submit</button>
                            {success && (
                                <div className="d-flex justify-content-between align-items-center p-2 bg-success bg-opacity-75 rounded">
                                    <p className="text-white mb-0"><strong>Thank you!</strong> your response has been recorded.</p>
                                    <button className="btn btn-sm btn-danger" onClick={() => setIsSuccess(!success)}><RxCross2 size='1.5rem' /></button>
                                </div>
                            )}
                        </div>
                    </form>

                </div >
            </main >
        </>
    )
}