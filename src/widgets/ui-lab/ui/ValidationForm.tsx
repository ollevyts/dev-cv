'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertCircle, Mail, Phone, Loader2, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from '@/shared/i18n/useTranslation';

interface ValidationFormProps {
    say: (text: string) => void;
    clearSpeech: () => void;
}

export const ValidationForm = ({ say, clearSpeech }: ValidationFormProps) => {
    const [formData, setFormData] = useState({ email: '', phone: '' });
    const [formErrors, setFormErrors] = useState({ email: '', phone: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme !== 'light';
    const { t } = useTranslation();

    const validateForm = () => {
        let valid = true;
        const errors = { email: '', phone: '' };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            errors.email = t('uiLabWidget.form.emailRequired');
            valid = false;
        } else if (!emailRegex.test(formData.email)) {
            errors.email = t('uiLabWidget.form.emailInvalid');
            valid = false;
        }
        if (!formData.phone) {
            errors.phone = t('uiLabWidget.form.phoneRequired');
            valid = false;
        } else if (formData.phone.length < 9) {
            errors.phone = t('uiLabWidget.form.phoneShort');
            valid = false;
        }
        setFormErrors(errors);
        return valid;
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            say(t('avatar.formError'));
            return;
        }
        setFormStatus('loading');
        say(t('avatar.formLoading'));
        setTimeout(() => {
            if (formData.email.toLowerCase() === 'test@error.com') {
                setFormStatus('error');
                say(t('avatar.form401'));
            } else {
                setFormStatus('success');
                say(t('avatar.formSuccess'));
            }
        }, 1800);
    };

    const resetForm = () => {
        setFormData({ email: '', phone: '' });
        setFormErrors({ email: '', phone: '' });
        setFormStatus('idle');
    };

    const inputStyle = (hasError: boolean) => ({
        backgroundColor: isDark ? '#020617' : '#f8fafc',
        color: isDark ? '#e2e8f0' : '#0f172a',
        borderColor: hasError || formStatus === 'error'
            ? 'rgba(244,63,94,0.6)'
            : isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
    });

    return (
        <div
            style={{
                backgroundColor: isDark ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.85)',
                borderColor: isDark ? 'rgb(30,41,59)' : 'rgb(226,232,240)',
            }}
            className="backdrop-blur-md border p-6 rounded-3xl min-h-[350px] flex flex-col justify-between transition-colors"
            onMouseEnter={() => say(t('avatar.form'))}
            onMouseLeave={clearSpeech}
        >
            <div>
                <h3 style={{ color: isDark ? '#64748b' : '#94a3b8' }} className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-400" /> Validation Form Spec
                </h3>
                <p style={{ color: isDark ? '#475569' : '#94a3b8' }} className="text-xs mb-4">{t('uiLabWidget.form.subtitle')}</p>

                <AnimatePresence mode="wait">
                    {formStatus !== 'success' ? (
                        <motion.form key="form-fields" onSubmit={handleFormSubmit} className="space-y-3" exit={{ opacity: 0, y: -10 }}>
                            {formStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-start gap-2.5"
                                >
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <div>
                                        <span className="font-bold block">{t('uiLabWidget.form.errorTitle')}</span>
                                        {t('uiLabWidget.form.errorDesc')}
                                    </div>
                                </motion.div>
                            )}

                            <div className="space-y-1.5">
                                <label style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs font-bold uppercase tracking-wider">
                                    {t('uiLabWidget.form.emailLabel')}
                                </label>
                                <div className="relative">
                                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="your@email.com (або test@error.com)"
                                        disabled={formStatus === 'loading'}
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value });
                                            if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                                            if (formStatus === 'error') setFormStatus('idle');
                                        }}
                                        style={inputStyle(!!formErrors.email)}
                                        className="w-full border text-xs font-semibold rounded-xl pl-10 pr-4 py-3 placeholder-slate-500 transition-all outline-none focus:border-blue-500/50"
                                    />
                                </div>
                                {formErrors.email && (
                                    <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                                        <AlertCircle size={12} /> {formErrors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs font-bold uppercase tracking-wider">
                                    {t('uiLabWidget.form.phoneLabel')}
                                </label>
                                <div className="relative">
                                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="+380674965200"
                                        disabled={formStatus === 'loading'}
                                        value={formData.phone}
                                        onChange={(e) => {
                                            setFormData({ ...formData, phone: e.target.value });
                                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                                            if (formStatus === 'error') setFormStatus('idle');
                                        }}
                                        style={inputStyle(!!formErrors.phone)}
                                        className="w-full border text-xs font-semibold rounded-xl pl-10 pr-4 py-3 placeholder-slate-500 transition-all outline-none focus:border-blue-500/50"
                                    />
                                </div>
                                {formErrors.phone && (
                                    <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                                        <AlertCircle size={12} /> {formErrors.phone}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'loading'}
                                className={`w-full text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg mt-2 ${
                                    formStatus === 'error' ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/10' : 'bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/40 shadow-blue-600/10'
                                }`}
                            >
                                {formStatus === 'loading' ? (
                                    <><Loader2 size={14} className="animate-spin" /> {t('uiLabWidget.form.loadingBtn')}</>
                                ) : formStatus === 'error' ? t('uiLabWidget.form.retry') : t('uiLabWidget.form.submit')}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="form-success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl min-h-[220px]"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                                <Check size={20} />
                            </div>
                            <h4 style={{ color: isDark ? '#e2e8f0' : '#0f172a' }} className="text-xs font-bold uppercase tracking-wider mb-1">
                                {t('uiLabWidget.form.successTitle')}
                            </h4>
                            <p style={{ color: isDark ? '#94a3b8' : '#64748b' }} className="text-xs max-w-xs mb-4">
                                {t('uiLabWidget.form.successDesc')}
                            </p>
                            <button
                                type="button"
                                onClick={resetForm}
                                style={{
                                    backgroundColor: isDark ? 'rgb(30,41,59)' : 'rgb(241,245,249)',
                                    color: isDark ? '#cbd5e1' : '#475569',
                                }}
                                className="px-4 py-2 font-semibold text-xs rounded-lg transition-all hover:opacity-80"
                            >
                                {t('uiLabWidget.form.reset')}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
