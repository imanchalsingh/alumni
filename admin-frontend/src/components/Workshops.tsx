import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "../api/axios";

interface WorkshopForm {
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    mode: 'online' | 'offline' | 'hybrid';
    organization: string;
    speaker: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    meetingLink: string;
    coverImage: string;
    registrationRequired: boolean;
    maxParticipants: string;
    contactName: string;
    contactEmail: string;
    contactPhone?: string;
    prerequisites?: string;
    targetAudience?: string;
    tags?: string;
}

export default function Workshop() {
    const [form, setForm] = useState<WorkshopForm>({
        title: "",
        shortDescription: "",
        description: "",
        category: "Workshop",
        mode: "online",
        organization: "",
        speaker: "",
        date: "",
        startTime: "",
        endTime: "",
        venue: "",
        meetingLink: "",
        coverImage: "",
        registrationRequired: false,
        maxParticipants: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        prerequisites: "",
        targetAudience: "",
        tags: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.post("/workshops/create", form);
            setSuccess(true);

            setTimeout(() => {
                setForm({
                    title: "",
                    shortDescription: "",
                    description: "",
                    category: "Workshop",
                    mode: "online",
                    organization: "",
                    speaker: "",
                    date: "",
                    startTime: "",
                    endTime: "",
                    venue: "",
                    meetingLink: "",
                    coverImage: "",
                    registrationRequired: false,
                    maxParticipants: "",
                    contactName: "",
                    contactEmail: "",
                    contactPhone: "",
                    prerequisites: "",
                    targetAudience: "",
                    tags: "",
                });
                setCurrentStep(1);
                setSuccess(false);
            }, 3000);
        } catch (err) {
            console.error(err);
            setError("Error creating workshop. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (!form.title || !form.shortDescription || !form.description || !form.organization || !form.speaker) {
                setError("Please fill in all required fields in Basic Information");
                return;
            }
        }
        if (currentStep === 2) {
            if (!form.date || !form.startTime || !form.endTime || !form.coverImage) {
                setError("Please fill in all required fields in Schedule & Venue");
                return;
            }
        }
        setError(null);
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setError(null);
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const inputClassName = `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ba9629] text-sm bg-white`;
    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Create New Workshop</h1>
                        <p className="text-gray-500 text-sm mt-1">Fill in the details to create a workshop, seminar, or webinar</p>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="px-3 py-1.5 text-gray-600 hover:text-[#ba9629] text-sm cursor-pointer"
                    >
                        ← Back
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
                        <span className="text-sm text-green-700">Workshop created successfully!</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                        <span className="text-sm text-red-700">{error}</span>
                    </div>
                )}

                {/* Progress Steps */}
                <div className="mb-6">
                    <div className="flex items-center">
                        {['Basic Info', 'Schedule & Venue', 'Contact'].map((step, index) => (
                            <div key={step} className="flex items-center flex-1">
                                <div className="relative">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                            ${currentStep > index + 1
                                                ? 'bg-[#ba9629] text-white'
                                                : currentStep === index + 1
                                                    ? 'bg-[#ba9629] text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {currentStep > index + 1 ? '✓' : index + 1}
                                    </div>
                                </div>
                                <div className={`ml-2 flex-1 ${index < 2 ? 'mr-2' : ''}`}>
                                    <p className={`text-xs font-medium ${currentStep >= index + 1 ? 'text-[#ba9629]' : 'text-gray-500'}`}>
                                        {step}
                                    </p>
                                </div>
                                {index < 2 && (
                                    <div
                                        className={`flex-1 h-0.5 transition-colors 
                                            ${currentStep > index + 1 ? 'bg-[#ba9629]' : 'bg-gray-200'}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Form Header */}
                    <div className="px-6 py-3 bg-[#ba9629]">
                        <h2 className="text-base font-semibold text-white">
                            {currentStep === 1 && "Basic Information"}
                            {currentStep === 2 && "Schedule & Venue Details"}
                            {currentStep === 3 && "Contact Information"}
                        </h2>
                    </div>

                    {/* Form Body */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Step 1: Basic Information */}
                            {currentStep === 1 && (
                                <div className="space-y-5">
                                    <div>
                                        <label className={labelClassName}>
                                            Workshop Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="title"
                                            value={form.title}
                                            placeholder="e.g., Advanced Machine Learning Workshop"
                                            onChange={handleChange}
                                            className={inputClassName}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClassName}>
                                            Short Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="shortDescription"
                                            value={form.shortDescription}
                                            placeholder="Brief overview (max 200 characters)"
                                            onChange={handleChange}
                                            className={`${inputClassName} h-20 resize-none`}
                                            maxLength={200}
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {form.shortDescription.length}/200 characters
                                        </p>
                                    </div>

                                    <div>
                                        <label className={labelClassName}>
                                            Detailed Description <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={form.description}
                                            placeholder="Full description of the workshop..."
                                            onChange={handleChange}
                                            className={`${inputClassName} h-28`}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClassName}>Category *</label>
                                            <select
                                                name="category"
                                                value={form.category}
                                                onChange={handleChange}
                                                className={inputClassName}
                                            >
                                                <option value="Workshop">Workshop</option>
                                                <option value="Seminar">Seminar</option>
                                                <option value="Webinar">Webinar</option>
                                                <option value="Alumni Talk">Alumni Talk</option>
                                                <option value="Training">Training</option>
                                                <option value="Conference">Conference</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Mode *</label>
                                            <select
                                                name="mode"
                                                value={form.mode}
                                                onChange={handleChange}
                                                className={inputClassName}
                                            >
                                                <option value="online">Online</option>
                                                <option value="offline">Offline</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Organization *</label>
                                            <input
                                                name="organization"
                                                value={form.organization}
                                                placeholder="e.g., Google, Microsoft"
                                                onChange={handleChange}
                                                className={inputClassName}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Speaker *</label>
                                            <input
                                                name="speaker"
                                                value={form.speaker}
                                                placeholder="Full name of speaker"
                                                onChange={handleChange}
                                                className={inputClassName}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Schedule and Venue */}
                            {currentStep === 2 && (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClassName}>Date *</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={form.date}
                                                onChange={handleChange}
                                                className={inputClassName}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Start Time *</label>
                                            <input
                                                type="text"
                                                name="startTime"
                                                value={form.startTime}
                                                placeholder="e.g., 10:00 AM"
                                                onChange={handleChange}
                                                className={inputClassName}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClassName}>End Time *</label>
                                            <input
                                                type="text"
                                                name="endTime"
                                                value={form.endTime}
                                                placeholder="e.g., 4:00 PM"
                                                onChange={handleChange}
                                                className={inputClassName}
                                                required
                                            />
                                        </div>

                                        {(form.mode === "offline" || form.mode === "hybrid") && (
                                            <div>
                                                <label className={labelClassName}>Venue</label>
                                                <input
                                                    name="venue"
                                                    value={form.venue}
                                                    placeholder="Full address"
                                                    onChange={handleChange}
                                                    className={inputClassName}
                                                />
                                            </div>
                                        )}

                                        {(form.mode === "online" || form.mode === "hybrid") && (
                                            <div>
                                                <label className={labelClassName}>Meeting Link</label>
                                                <input
                                                    name="meetingLink"
                                                    value={form.meetingLink}
                                                    placeholder="https://meet.google.com/..."
                                                    onChange={handleChange}
                                                    className={inputClassName}
                                                />
                                            </div>
                                        )}

                                        <div className="md:col-span-2">
                                            <label className={labelClassName}>Cover Image URL *</label>
                                            <input
                                                name="coverImage"
                                                value={form.coverImage}
                                                placeholder="https://example.com/image.jpg"
                                                onChange={handleChange}
                                                className={inputClassName}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Target Audience</label>
                                            <input
                                                name="targetAudience"
                                                value={form.targetAudience}
                                                placeholder="e.g., Students, Professionals"
                                                onChange={handleChange}
                                                className={inputClassName}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Prerequisites</label>
                                            <input
                                                name="prerequisites"
                                                value={form.prerequisites}
                                                placeholder="e.g., Basic Python knowledge"
                                                onChange={handleChange}
                                                className={inputClassName}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClassName}>Tags (comma separated)</label>
                                            <input
                                                name="tags"
                                                value={form.tags}
                                                placeholder="e.g., AI, Machine Learning, Python"
                                                onChange={handleChange}
                                                className={inputClassName}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="registrationRequired"
                                                    checked={form.registrationRequired}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 rounded border-gray-300"
                                                />
                                                <span className="text-sm text-gray-700">Registration Required</span>
                                            </label>
                                        </div>

                                        {form.registrationRequired && (
                                            <div>
                                                <label className={labelClassName}>Max Participants</label>
                                                <input
                                                    type="number"
                                                    name="maxParticipants"
                                                    value={form.maxParticipants}
                                                    placeholder="e.g., 100"
                                                    onChange={handleChange}
                                                    className={inputClassName}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Contact Information */}
                            {currentStep === 3 && (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClassName}>Contact Person *</label>
                                            <input
                                                name="contactName"
                                                value={form.contactName}
                                                placeholder="Full name"
                                                onChange={handleChange}
                                                className={inputClassName}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Contact Email *</label>
                                            <input
                                                type="email"
                                                name="contactEmail"
                                                value={form.contactEmail}
                                                placeholder="email@example.com"
                                                onChange={handleChange}
                                                className={inputClassName}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Contact Phone</label>
                                            <input
                                                type="tel"
                                                name="contactPhone"
                                                value={form.contactPhone}
                                                placeholder="+91 98765 43210"
                                                onChange={handleChange}
                                                className={inputClassName}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm cursor-pointer"
                                    >
                                        Previous
                                    </button>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="ml-auto px-5 py-2 bg-[#ba9629] text-white rounded hover:bg-[#a88523] text-sm cursor-pointer"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="ml-auto px-5 py-2 bg-[#ba9629] text-white rounded hover:bg-[#a88523] text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {loading ? 'Creating...' : 'Create Workshop'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Preview Section */}
                {form.title && (
                    <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-base font-semibold text-gray-800">Preview</h3>
                        </div>
                        <div className="p-5">
                            <div className="border border-gray-200 rounded overflow-hidden">
                                {form.coverImage && (
                                    <img
                                        src={form.coverImage}
                                        alt={form.title}
                                        className="w-full h-40 object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Workshop';
                                        }}
                                    />
                                )}
                                <div className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-0.5 bg-[#ba9629]/10 text-[#ba9629] text-xs font-medium rounded">
                                            {form.category}
                                        </span>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                                            {form.mode}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{form.title}</h4>
                                    <p className="text-gray-600 text-sm mb-3">{form.shortDescription}</p>
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        <div className="text-gray-600">
                                            📅 {form.date || 'TBD'}
                                        </div>
                                        <div className="text-gray-600">
                                            🕐 {form.startTime || 'TBD'}
                                        </div>
                                        <div className="text-gray-600">
                                            👤 {form.speaker || 'TBD'}
                                        </div>
                                        <div className="text-gray-600">
                                            🏢 {form.organization || 'TBD'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}