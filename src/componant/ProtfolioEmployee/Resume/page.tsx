"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { alpha, useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useLocale } from "next-intl";
import { Iconify } from "@/components/iconify";

const SectionHeader = ({ title, icon, primary }: { title: string; icon: string; primary: string }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Iconify icon={icon} width={26} sx={{ color: '#000' }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            {title}
        </Typography>
        <Box sx={{ flexGrow: 1, height: 2, bgcolor: alpha('#000', 0.08), borderRadius: 1 }} />
    </Box>
);

export default function ResumePage() {
    const [data] = useAtom(portfolioDataAtom);
    const locale = useLocale();
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#1e293c', py: 8, px: { xs: 3, md: 6 } }}>

            {/* Page Title */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: 6, mb: 1 }}>
                    {getLocalized(data.resume.title, locale)}
                </Typography>
                <Box sx={{ width: 56, height: 4, bgcolor: primary, mx: 'auto', borderRadius: 2 }} />
            </Box>

            <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 7 }}>

                {/* ── 1. QUALIFICATIONS ── */}
                <Box>
                    <SectionHeader
                        title={locale === 'en' ? 'Qualifications' : 'المؤهلات'}
                        icon="mingcute:certificate-line"
                        primary={primary}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {data.resume.qualifications.map((q, i) => (
                            <Box
                                key={i}
                                sx={{
                                    bgcolor: '#8e99a5',
                                    borderRadius: 3,
                                    p: 3,
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'flex-start',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    transition: 'all 0.3s',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
                                }}
                            >
                                <Box sx={{ width: 10, flexShrink: 0, alignSelf: 'stretch', bgcolor: primary, borderRadius: 4 }} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            {getLocalized(q.title, locale)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ bgcolor: alpha(primary, 0.15), px: 1.5, py: 0.4, borderRadius: 10, fontWeight: 600, color: 'text.secondary' }}>
                                            {q.year}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 1 }}>
                                        {getLocalized(q.institution, locale)}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                        {getLocalized(q.description, locale)}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* ── 2. SUMMARY ── */}
                <Box>
                    <SectionHeader
                        title={locale === 'en' ? 'Summary' : 'نبذة مختصرة'}
                        icon="mingcute:edit-2-line"
                        primary={primary}
                    />
                    <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderLeft: `4px solid ${primary}` }}>
                        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2, fontSize: '1rem' }}>
                            {getLocalized(data.resume.summary, locale)}
                        </Typography>
                    </Box>
                </Box>

                {/* ── 3. PREVIOUS EXPERIENCE ── */}
                <Box>
                    <SectionHeader
                        title={locale === 'en' ? 'Previous Experience' : 'الخبرات السابقة'}
                        icon="mingcute:briefcase-line"
                        primary={primary}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {data.resume.experience.map((exp, i) => (
                            <Box
                                key={i}
                                sx={{
                                    bgcolor: '#8e99a5',
                                    borderRadius: 3,
                                    p: 3,
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                    transition: 'all 0.3s',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                            {getLocalized(exp.role, locale)}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                            {getLocalized(exp.company, locale)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ bgcolor: primary, px: 2, py: 0.5, borderRadius: 10, alignSelf: 'flex-start' }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#000' }}>
                                            {getLocalized(exp.period, locale)}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 1.5 }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                                    {getLocalized(exp.description, locale)}
                                </Typography>
                                {exp.skills && exp.skills.length > 0 && (
                                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                                        {exp.skills.map((sk, j) => (
                                            <Box
                                                key={j}
                                                sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: alpha(primary, 0.12), px: 1.5, py: 0.6, borderRadius: 2 }}
                                            >
                                                <Iconify icon={sk.icon} width={18} />
                                                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                                    {getLocalized(sk.name, locale)}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* ── 4. COURSES ── */}
                <Box>
                    <SectionHeader
                        title={locale === 'en' ? 'Courses' : 'الكورسات التعليمية'}
                        icon="mingcute:book-2-line"
                        primary={primary}
                    />
                    <Grid container spacing={2.5}>
                        {data.resume.courses.map((course, i) => (
                            <Grid xs={12} sm={6} md={6} key={i}>
                                <Box
                                    sx={{
                                        bgcolor: '#8e99a5',
                                        borderRadius: 3,
                                        p: 2.5,
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                        height: '100%',
                                        transition: 'all 0.3s',
                                        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
                                    }}
                                >
                                    <Box sx={{ width: 52, height: 52, bgcolor: alpha(primary, 0.15), borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Iconify icon={course.icon} width={30} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3 }}>
                                            {getLocalized(course.name, locale)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            {getLocalized(course.provider, locale)} · {course.year}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* ── 5. PROFESSIONAL CERTIFICATES ── */}
                <Box>
                    <SectionHeader
                        title={locale === 'en' ? 'Professional Certificates' : 'الشهادات المهنية'}
                        icon="mingcute:award-line"
                        primary={primary}
                    />
                    <Grid container spacing={2.5}>
                        {data.resume.certifications.map((cert, i) => (
                            <Grid xs={12} sm={6} md={6} key={i}>
                                <Box
                                    sx={{
                                        bgcolor: '#8e99a5',
                                        borderRadius: 3,
                                        p: 2.5,
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                        height: '100%',
                                        borderTop: `3px solid ${primary}`,
                                        transition: 'all 0.3s',
                                        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }
                                    }}
                                >
                                    <Box sx={{ width: 52, height: 52, bgcolor: alpha(primary, 0.15), borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Iconify icon={cert.icon} width={30} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3 }}>
                                            {getLocalized(cert.name, locale)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                                            {getLocalized(cert.issuer, locale)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ fontWeight: 600, color: primary }}>
                                            {cert.year}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Box>
        </Box>
    );
}
