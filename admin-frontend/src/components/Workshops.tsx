import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "../api/axios";
import {
    Calendar, Clock, MapPin, Users, Mail, Phone,
    User, Building, Image, CheckCircle, XCircle, ArrowLeft,
    BookOpen, Link as LinkIcon, Tag, Target, FileText
} from 'lucide-react';

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

    // Dark yellow accent color
    const accentColor = '#ba9629';
    const accentLight = 'rgba(186, 150, 41, 0.1)';

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

            // Reset form after successful submission
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
        // Basic validation before moving to next step
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

    const inputClassName = `w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white`;
    const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header with Back Button */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create New Workshop</h1>
                        <p className="text-gray-600 mt-2">Fill in the details to create a workshop, seminar, or webinar</p>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#ba9629] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-700">Workshop created successfully! 🎉</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-700">{error}</span>
                    </div>
                )}

                {/* Progress Steps with Yellow Accent */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {['Basic Info', 'Schedule & Venue', 'Contact'].map((step, index) => (
                            <div key={step} className="flex items-center flex-1">
                                <div className="relative">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                                            ${currentStep > index + 1
                                                ? 'bg-[#ba9629] text-white'
                                                : currentStep === index + 1
                                                    ? 'bg-[#ba9629] text-white ring-4 ring-[#ba9629]/20'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {currentStep > index + 1 ? '✓' : index + 1}
                                    </div>
                                </div>
                                <div className={`ml-3 flex-1 ${index < 2 ? 'mr-4' : ''}`}>
                                    <p className={`text-sm font-medium ${currentStep >= index + 1 ? 'text-[#ba9629]' : 'text-gray-500'}`}>
                                        {step}
                                    </p>
                                </div>
                                {index < 2 && (
                                    <div
                                        className={`flex-1 h-0.5 transition-all duration-300 
                                            ${currentStep > index + 1 ? 'bg-[#ba9629]' : 'bg-gray-200'}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Form Header with Yellow Gradient */}
                    <div
                        className="px-8 py-5"
                        style={{
                            background: `linear-gradient(135deg, ${accentColor} 0%, #8b701f 100%)`
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-white" />
                            <h2 className="text-xl font-semibold text-white">
                                {currentStep === 1 && "Basic Information"}
                                {currentStep === 2 && "Schedule & Venue Details"}
                                {currentStep === 3 && "Contact Information"}
                            </h2>
                        </div>
                        <p className="text-yellow-100 text-sm mt-1">
                            {currentStep === 1 && "Tell us about the workshop basics"}
                            {currentStep === 2 && "Set the date, time, and location"}
                            {currentStep === 3 && "Who should attendees contact for queries?"}
                        </p>
                    </div>

                    {/* Form Body */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1: Basic Information */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className={labelClassName}>
                                                Workshop Title <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    name="title"
                                                    value={form.title}
                                                    placeholder="e.g., Advanced Machine Learning Workshop"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        '--tw-ring-color': accentLight,
                                                        borderColor: form.title ? accentColor : '#e5e7eb'
                                                    } as React.CSSProperties}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.title ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClassName}>
                                                Short Description <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                                <textarea
                                                    name="shortDescription"
                                                    value={form.shortDescription}
                                                    placeholder="Brief overview (max 200 characters)"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10 h-20 resize-none`}
                                                    maxLength={200}
                                                    style={{
                                                        borderColor: form.shortDescription ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.shortDescription ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {form.shortDescription.length}/200 characters
                                            </p>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClassName}>
                                                Detailed Description <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                name="description"
                                                value={form.description}
                                                placeholder="Full description of the workshop..."
                                                onChange={handleChange}
                                                className={`${inputClassName} h-32`}
                                                style={{
                                                    borderColor: form.description ? accentColor : '#e5e7eb'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = accentColor}
                                                onBlur={(e) => e.target.style.borderColor = form.description ? accentColor : '#e5e7eb'}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Category *</label>
                                            <select
                                                name="category"
                                                value={form.category}
                                                onChange={handleChange}
                                                className={inputClassName}
                                                style={{
                                                    borderColor: form.category ? accentColor : '#e5e7eb'
                                                }}
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
                                                style={{
                                                    borderColor: form.mode ? accentColor : '#e5e7eb'
                                                }}
                                            >
                                                <option value="online">Online</option>
                                                <option value="offline">Offline</option>
                                                <option value="hybrid">Hybrid</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Organization *</label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    name="organization"
                                                    value={form.organization}
                                                    placeholder="e.g., Google, Microsoft"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.organization ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.organization ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Speaker *</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    name="speaker"
                                                    value={form.speaker}
                                                    placeholder="Full name of speaker"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.speaker ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.speaker ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Schedule and Venue */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClassName}>Date *</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={form.date}
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.date ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.date ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Start Time *</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    name="startTime"
                                                    value={form.startTime}
                                                    placeholder="e.g., 10:00 AM"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.startTime ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.startTime ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>End Time *</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    name="endTime"
                                                    value={form.endTime}
                                                    placeholder="e.g., 4:00 PM"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.endTime ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.endTime ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {(form.mode === "offline" || form.mode === "hybrid") && (
                                            <div>
                                                <label className={labelClassName}>Venue</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <input
                                                        name="venue"
                                                        value={form.venue}
                                                        placeholder="Full address"
                                                        onChange={handleChange}
                                                        className={`${inputClassName} pl-10`}
                                                        style={{
                                                            borderColor: form.venue ? accentColor : '#e5e7eb'
                                                        }}
                                                        onFocus={(e) => e.target.style.borderColor = accentColor}
                                                        onBlur={(e) => e.target.style.borderColor = form.venue ? accentColor : '#e5e7eb'}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {(form.mode === "online" || form.mode === "hybrid") && (
                                            <div>
                                                <label className={labelClassName}>Meeting Link</label>
                                                <div className="relative">
                                                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <input
                                                        name="meetingLink"
                                                        value={form.meetingLink}
                                                        placeholder="https://meet.google.com/..."
                                                        onChange={handleChange}
                                                        className={`${inputClassName} pl-10`}
                                                        style={{
                                                            borderColor: form.meetingLink ? accentColor : '#e5e7eb'
                                                        }}
                                                        onFocus={(e) => e.target.style.borderColor = accentColor}
                                                        onBlur={(e) => e.target.style.borderColor = form.meetingLink ? accentColor : '#e5e7eb'}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="md:col-span-2">
                                            <label className={labelClassName}>Cover Image URL *</label>
                                            <div className="relative">
                                                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    name="coverImage"
                                                    value={form.coverImage}
                                                    placeholder="https://example.com/image.jpg"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.coverImage ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.coverImage ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Target Audience</label>
                                            <div className="relative">
                                                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    name="targetAudience"
                                                    value={form.targetAudience}
                                                    placeholder="e.g., Students, Professionals"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.targetAudience ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.targetAudience ? accentColor : '#e5e7eb'}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Prerequisites</label>
                                            <input
                                                name="prerequisites"
                                                value={form.prerequisites}
                                                placeholder="e.g., Basic Python knowledge"
                                                onChange={handleChange}
                                                className={inputClassName}
                                                style={{
                                                    borderColor: form.prerequisites ? accentColor : '#e5e7eb'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = accentColor}
                                                onBlur={(e) => e.target.style.borderColor = form.prerequisites ? accentColor : '#e5e7eb'}
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className={labelClassName}>Tags (comma separated)</label>
                                            <div className="relative">
                                                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    name="tags"
                                                    value={form.tags}
                                                    placeholder="e.g., AI, Machine Learning, Python"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.tags ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.tags ? accentColor : '#e5e7eb'}
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="registrationRequired"
                                                    checked={form.registrationRequired}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 rounded border-gray-300 focus:ring-2"
                                                    style={{ accentColor: accentColor }}
                                                />
                                                <span className="text-gray-700">Registration Required</span>
                                            </label>
                                        </div>

                                        {form.registrationRequired && (
                                            <div>
                                                <label className={labelClassName}>Max Participants</label>
                                                <div className="relative">
                                                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <input
                                                        type="number"
                                                        name="maxParticipants"
                                                        value={form.maxParticipants}
                                                        placeholder="e.g., 100"
                                                        onChange={handleChange}
                                                        className={`${inputClassName} pl-10`}
                                                        style={{
                                                            borderColor: form.maxParticipants ? accentColor : '#e5e7eb'
                                                        }}
                                                        onFocus={(e) => e.target.style.borderColor = accentColor}
                                                        onBlur={(e) => e.target.style.borderColor = form.maxParticipants ? accentColor : '#e5e7eb'}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Contact Information */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={labelClassName}>Contact Person *</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    name="contactName"
                                                    value={form.contactName}
                                                    placeholder="Full name"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.contactName ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.contactName ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Contact Email *</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="email"
                                                    name="contactEmail"
                                                    value={form.contactEmail}
                                                    placeholder="email@example.com"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.contactEmail ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.contactEmail ? accentColor : '#e5e7eb'}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClassName}>Contact Phone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <input
                                                    type="tel"
                                                    name="contactPhone"
                                                    value={form.contactPhone}
                                                    placeholder="+91 98765 43210"
                                                    onChange={handleChange}
                                                    className={`${inputClassName} pl-10`}
                                                    style={{
                                                        borderColor: form.contactPhone ? accentColor : '#e5e7eb'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = accentColor}
                                                    onBlur={(e) => e.target.style.borderColor = form.contactPhone ? accentColor : '#e5e7eb'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Previous
                                    </button>
                                )}

                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="ml-auto px-6 py-2.5 text-white rounded-lg transition-colors font-medium"
                                        style={{
                                            background: `linear-gradient(135deg, ${accentColor} 0%, #8b701f 100%)`,
                                        }}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="ml-auto px-8 py-2.5 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        style={{
                                            background: `linear-gradient(135deg, ${accentColor} 0%, #8b701f 100%)`,
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="animate-spin">⌛</span>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Workshop'
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Preview Card */}
                {form.title && (
                    <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-[#ba9629]" />
                                Preview
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                {form.coverImage && (
                                    <img
                                        src={form.coverImage}
                                        alt={form.title}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Workshop';
                                        }}
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-[#ba9629]/10 text-[#ba9629] text-sm font-medium rounded-full">
                                            {form.category}
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                                            {form.mode}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{form.title}</h4>
                                    <p className="text-gray-600 mb-4">{form.shortDescription}</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#ba9629]" />
                                            {form.date || 'TBD'}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Clock className="w-4 h-4 text-[#ba9629]" />
                                            {form.startTime || 'TBD'}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <User className="w-4 h-4 text-[#ba9629]" />
                                            {form.speaker || 'TBD'}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Building className="w-4 h-4 text-[#ba9629]" />
                                            {form.organization || 'TBD'}
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