"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { alpha, useTheme } from "@mui/material/styles";
import { Iconify } from "@/components/iconify";
import { useLocale } from "next-intl";

export default function AboutPage() {
    const [data] = useAtom(portfolioDataAtom);
    const locale = useLocale();
    const theme = useTheme();
    const primary = theme.palette.primary.main;

    const infoItems = [
        { icon: 'mingcute:user-2-line',    labelEn: 'Full Name',  labelAr: 'الاسم الكامل', value: getLocalized(data.home.name, locale) },
        { icon: 'mingcute:briefcase-line', labelEn: 'Role',       labelAr: 'المسمى الوظيفي', value: getLocalized(data.home.jobTitle, locale) },
        { icon: 'mingcute:mail-line',      labelEn: 'Email',      labelAr: 'البريد الإلكتروني', value: data.contact.email },
        { icon: 'mingcute:phone-line',     labelEn: 'Phone',      labelAr: 'الهاتف', value: data.contact.phone },
        { icon: 'mingcute:location-line',  labelEn: 'Location',   labelAr: 'الموقع', value: getLocalized(data.contact.address, locale) },
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#1e293c', py: 8, px: { xs: 3, md: 6 } }}>

            {/* Page Title */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: 6, mb: 1 }}>
                    {getLocalized(data.about.title, locale)}
                </Typography>
                <Box sx={{ width: 56, height: 4, bgcolor: primary, mx: 'auto', borderRadius: 2 }} />
            </Box>

            {/* Two-column layout */}
            <Box sx={{ maxWidth: 1100, mx: 'auto', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5, alignItems: 'flex-start' }}>

                {/* Left: Photo + Info */}
                <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 300 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', boxShadow: `0 8px 32px ${alpha(primary, 0.2)}` }}>
                        <Box
                            component="img"
                            src={data.about.profileImage}
                            alt="Profile"
                            sx={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '3/4' }}
                        />
                        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(to top, ${alpha(primary, 0.6)} 0%, transparent 50%)` }} />
                    </Box>

                    {/* Quick Info Cards */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {infoItems.map((item, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#8e99a5', px: 2, py: 1.5, borderRadius: 2, boxShadow: '0 1px 6px rgba(0,0,0,0.05)', transition: 'all 0.2s', '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.1)', transform: 'translateX(4px)' } }}>
                                <Box sx={{ width: 36, height: 36, bgcolor: alpha(primary, 0.12), borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Iconify icon={item.icon} width={18} sx={{ color: primary }} />
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, display: 'block', lineHeight: 1 }}>
                                        {locale === 'en' ? item.labelEn : item.labelAr}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: 'break-word' }}>
                                        {item.value}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Right: Content */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>

                    {/* Who am I */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <Box sx={{ width: 4, height: 28, bgcolor: primary, borderRadius: 2 }} />
                            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
                                {locale === 'en' ? 'Who Am I?' : 'من أنا؟'}
                            </Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#8e99a5', borderRadius: 3, p: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2 }}>
                                {getLocalized(data.about.content, locale)}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Background & Expertise */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <Box sx={{ width: 4, height: 28, bgcolor: primary, borderRadius: 2 }} />
                            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
                                {locale === 'en' ? 'Background & Expertise' : 'الخلفية والخبرة'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                            {[
                                { icon: 'mingcute:code-line',         titleEn: 'Frontend Development', titleAr: 'تطوير الواجهات', descEn: 'Expert in React, Next.js & TypeScript', descAr: 'خبير في React وNext.js وTypeScript' },
                                { icon: 'mingcute:palette-line',      titleEn: 'UI/UX Design',         titleAr: 'تصميم الواجهات', descEn: 'Crafting intuitive & modern interfaces', descAr: 'تصميم واجهات بديهية وعصرية' },
                                { icon: 'mingcute:building-2-line',   titleEn: 'Engineering Sector',   titleAr: 'القطاع الهندسي', descEn: 'Specialized in engineering platforms', descAr: 'متخصص في المنصات الهندسية' },
                                { icon: 'mingcute:rocket-line',       titleEn: 'Performance',          titleAr: 'الأداء', descEn: 'Optimized, fast & scalable solutions', descAr: 'حلول محسّنة وسريعة وقابلة للتطوير' },
                            ].map((card, i) => (
                                <Box key={i} sx={{ display: 'flex', gap: 2, bgcolor: '#8e99a5', borderRadius: 3, p: 2.5, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.10)' } }}>
                                    <Box sx={{ width: 46, height: 46, bgcolor: alpha(primary, 0.12), borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <Iconify icon={card.icon} width={24} sx={{ color: primary }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3 }}>
                                            {locale === 'en' ? card.titleEn : card.titleAr}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            {locale === 'en' ? card.descEn : card.descAr}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Divider />

                    {/* Goal */}
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                            <Box sx={{ width: 4, height: 28, bgcolor: primary, borderRadius: 2 }} />
                            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
                                {locale === 'en' ? 'My Goal' : 'هدفي'}
                            </Typography>
                        </Box>
                        <Box sx={{ bgcolor: '#8e99a5', borderRadius: 3, p: 3, borderLeft: `4px solid ${primary}`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2 }}>
                                {locale === 'en'
                                    ? 'To deliver high-quality digital experiences that help engineering firms grow their online presence, improve client engagement, and modernize their workflows through cutting-edge web technologies.'
                                    : 'تقديم تجارب رقمية عالية الجودة تساعد الشركات الهندسية على تعزيز حضورها الإلكتروني وتحسين تفاعل العملاء وتحديث سير العمل باستخدام أحدث تقنيات الويب.'}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}
