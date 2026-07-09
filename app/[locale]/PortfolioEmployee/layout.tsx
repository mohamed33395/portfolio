"use client";

import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { Iconify } from "@/components/iconify";
import Link from "next/link";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import { useBE_Theme } from "@/lib/theme/client/theme-provider";
import { CONFIG } from "@/config";
import { usePageScrollNavigation } from "@/hooks/use-page-scroll-navigation";
import { useLocale } from "next-intl";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  Languages,
  Sun,
  Moon,
} from "lucide-react";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    const [data] = useAtom(portfolioDataAtom);
    const pathname = usePathname();
    const theme = useTheme();
    const router = useRouter();
    const isRtl = theme.direction === 'rtl';
    const { data: themeData, theme: currentTheme, toggleTheme: toggleAppTheme } = useBE_Theme();
    const PRIMARY = theme.palette.primary.main;
    const locale = useLocale();

    // Toggle locale
    const toggleLocale = () => {
        const newLocale = locale === 'en' ? 'ar' : 'en';
        const newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
        router.push(newPath);
    };

    // To handle hydration mismatch with Jotai / visibility setting
    const [mounted, setMounted] = useState(false);

    // Visibility Check (Hidden by default unless accessed via defined URL)
    const isAllowedUrl = typeof window !== 'undefined' && window.location.href.includes(data.settings.allowedUrl);

    useEffect(() => {
        setMounted(true);
        if (isAllowedUrl && data.settings.allowedUrl) {
            localStorage.setItem('portfolio_access', data.settings.allowedUrl);
        }
    }, [isAllowedUrl, data.settings.allowedUrl]);

    // Mouse scroll navigation using custom hook
    usePageScrollNavigation({
        pages: data.navigation,
        currentPath: pathname,
        locale,
        scrollThreshold: 50,
        debounceTime: 400,
        enabled: mounted,
    });

    if (!mounted) return null;

    const hasAccess = typeof window !== 'undefined' && localStorage.getItem('portfolio_access') === data.settings.allowedUrl;
    const isDev = process.env.NODE_ENV === 'development';

    if (!isDev && (!data.settings.isVisible || (!isAllowedUrl && !hasAccess))) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h4">Portfolio is currently hidden.</Typography>
            </Box>
        );
    }

    const isHome = pathname.toLowerCase().includes('/homeemployee');

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: currentTheme === 'dark' ? '#2e3853' : '#f8fafc', display: 'flex', flexDirection: 'column', transition: 'background-color 0.3s' }}>
            {/* Back Button */}
            {!isHome && (
                <Box sx={{ position: 'fixed', top: 16, ...(isRtl ? { right: 16 } : { left: 16 }), zIndex: 1200 }}>
                    <IconButton
                        onClick={() => router.back()}
                        sx={{
                            bgcolor: PRIMARY,
                            color: '#ffffff',
                            boxShadow: `0 4px 12px ${alpha(PRIMARY, 0.4)}`,
                            '&:hover': { bgcolor: alpha(PRIMARY, 0.85), transform: 'scale(1.05)' },
                            transition: 'all 0.2s',
                            width: 44,
                            height: 44,
                        }}
                    >
                        <Iconify icon={isRtl ? 'mingcute:arrow-right-line' : 'mingcute:arrow-left-line'} width={22} />
                    </IconButton>
                </Box>
            )}
            <Box sx={{ position: 'relative', display: 'flex', width: '100%', flexGrow: 1 }}>

                {/* Left Sidebar (Only for non-home pages) */}
                {!isHome && (
                    <Box sx={{
                        width: 280,
                        flexShrink: 0,
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        bgcolor: currentTheme === 'dark' ? '#8e99a5' : PRIMARY,
                        borderRight: isRtl ? 'none' : currentTheme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        borderLeft: isRtl ? currentTheme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none' : 'none',
                    }}>
                        <Box
                            component="img"
                            src={isHome ? (data.about.profileImage2 || data.about.profileImage) : data.about.profileImage}
                            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', filter: 'grayscale(100%)' }}
                        />
                        <Box sx={{ py: 5, px: 3, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                            {data.navigation.map((nav) => (
                                <Link key={nav.id} href={`/${locale}${nav.path}`} style={{ textDecoration: 'none' }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: '1.3rem',
                                            color: pathname.toLowerCase().includes(nav.path.toLowerCase()) ? '#1a3e9c' : alpha('#21214e', 0.6),
                                            fontWeight: pathname.toLowerCase().includes(nav.path.toLowerCase()) ? 700 : 500,
                                            letterSpacing: 1.2,
                                            textTransform: 'uppercase',
                                            '&:hover': { color: '#2f4fa1' },
                                            transition: 'color 0.2s',
                                        }}
                                    >
                                        {getLocalized(nav.label, locale)}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                    </Box>
                )}

                {/* Main Content Area */}
                <Box sx={{ flexGrow: 1, position: 'relative', bgcolor: currentTheme === 'dark' ? '#1e293c' : '#f5f5f5', overflow: 'hidden', transition: 'background-color 0.3s' }}>
                    <Fade in key={pathname} timeout={500}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                animation: 'slideUp 0.5s ease-out',
                                '@keyframes slideUp': {
                                    '0%': {
                                        opacity: 0,
                                        transform: 'translateY(20px)',
                                    },
                                    '100%': {
                                        opacity: 1,
                                        transform: 'translateY(0)',
                                    },
                                },
                            }}
                        >
                            {children}
                        </Box>
                    </Fade>
                </Box>

                {/* Floating Nav Bar */}
                <Box
                    sx={{
                        position: 'fixed',
                        right: 24,
                        top: '30%',
                        transform: 'translateY(0)',
                        bgcolor: currentTheme === 'dark' ? '#8e99a5' : PRIMARY,
                        borderRadius: 4,
                        py: 4,
                        px: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        zIndex: 1100,
                        boxShadow: currentTheme === 'dark' ? '0 8px 32px rgba(0,0,0,0.4)' : (theme.customShadows && theme.customShadows.z8) ? theme.customShadows.z8 : '0 8px 16px rgba(0,0,0,0.1)',
                        maxHeight: '75vh',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        border: currentTheme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            bgcolor: currentTheme === 'dark' ? alpha('#fff', 0.2) : alpha('#000', 0.3),
                            borderRadius: 2,
                        },
                    }}
                >
                    {data.navigation.map((nav) => {
                        const isActive = pathname.toLowerCase().includes(nav.path.toLowerCase());
                        const isImageIcon = nav.icon.startsWith('/');
                        let IconComponent;
                        if (!isImageIcon) {
                            switch (nav.icon) {
                                case 'mingcute:home-2-line':
                                    IconComponent = Home;
                                    break;
                                case 'mingcute:user-2-line':
                                    IconComponent = User;
                                    break;
                                case 'mingcute:briefcase-line':
                                    IconComponent = Briefcase;
                                    break;
                                case 'mingcute:document-line':
                                    IconComponent = FileText;
                                    break;
                                case 'mingcute:mail-line':
                                    IconComponent = Mail;
                                    break;
                                default:
                                    IconComponent = Home;
                            }
                        }
                        return (
                            <Link key={nav.id} href={`/${locale}${nav.path}`}>
                                <Box
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: currentTheme === 'dark' ? (isActive ? '#0ea5e9' : '#cbd5e1') : (isActive ? '#fff' : '#000'),
                                        transition: 'color 0.2s',
                                        '&:hover': { color: currentTheme === 'dark' ? '#0ea5e9' : '#fff' },
                                    }}
                                >
                                    {isImageIcon ? (
                                        <Box
                                            component="img"
                                            src={nav.icon}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                filter: isActive ? 'none' : 'grayscale(100%) brightness(0.2)',
                                                transition: 'filter 0.2s',
                                                '&:hover': { filter: 'none' },
                                            }}
                                        />
                                    ) : (
                                        IconComponent && <IconComponent size={20} />
                                    )}
                                </Box>
                            </Link>
                        );
                    })}

                    {/* Language Toggle */}
                    <IconButton
                        onClick={toggleLocale}
                        sx={{
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: currentTheme === 'dark' ? '#cbd5e1' : '#000',
                            transition: 'all 0.2s',
                            '&:hover': {
                                color: currentTheme === 'dark' ? '#0ea5e9' : '#fff',
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <Languages size={20} />
                    </IconButton>

                    {/* Theme Toggle */}
                    <IconButton
                        onClick={toggleAppTheme}
                        sx={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: currentTheme === 'dark' ? '#cbd5e1' : '#000',
                            transition: 'all 0.2s',
                            '&:hover': {
                                color: currentTheme === 'dark' ? '#0ea5e9' : '#fff',
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        {currentTheme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
                    </IconButton>
                </Box>

            </Box>

            {/* Simple Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: currentTheme === 'dark' ? '#8e99a5' : PRIMARY,
                    py: { xs: 2.5, md: 3 },
                    px: { xs: 3, md: 6 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    borderTop: currentTheme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
            >
                <Box
                    component="img"
                    src={data.about.profileImage}
                    alt={CONFIG.appName}
                    sx={{ height: 36, width: 36, borderRadius: '50%', objectFit: 'cover' }}
                />

                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: currentTheme === 'dark' ? '#f8fafc' : '#fff', letterSpacing: 1, textAlign: 'center' }}
                >
                    {CONFIG.appName}
                </Typography>

                <Box
                    component="a"
                    href={`mailto:${themeData?.contact_info?.email || ''}`}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: currentTheme === 'dark' ? alpha('#f8fafc', 0.85) : alpha('#fff', 0.85),
                        textDecoration: 'none',
                        '&:hover': { color: currentTheme === 'dark' ? '#0ea5e9' : '#fff' },
                        transition: 'color 0.2s',
                    }}
                >
                    <Iconify icon="mingcute:mail-line" width={18} sx={{ color: currentTheme === 'dark' ? '#f8fafc' : '#fff' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'inherit' }}>
                        {themeData?.contact_info?.email || 'mah0101053395@gmail.com'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
