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
import { useLocale } from "next-intl";
import { useBE_Theme } from "@/lib/theme/client/theme-provider";
import { CONFIG } from "@/config-global";
import { usePageScrollNavigation } from "@/hooks/use-page-scroll-navigation";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    const [data] = useAtom(portfolioDataAtom);
    const pathname = usePathname();
    const theme = useTheme();
    const locale = useLocale();
    const router = useRouter();
    const isRtl = theme.direction === 'rtl';
    const { data: themeData } = useBE_Theme();
    const PRIMARY = theme.palette.primary.main;

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
        <Box sx={{ minHeight: '100vh', bgcolor: '#1e293c', display: 'flex', flexDirection: 'column' }}>
            {/* Back Button */}
            <Box sx={{ position: 'fixed', top: 16, ...(isRtl ? { right: 16 } : { left: 16 }), zIndex: 1200 }}>
                <IconButton
                    onClick={() => router.push(`/${locale}`)}
                    sx={{
                        bgcolor: PRIMARY,
                        color: '#fff',
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
            <Box sx={{ position: 'relative', display: 'flex', width: '100%', flexGrow: 1 }}>

                {/* Main Content Area */}
                <Box sx={{ flexGrow: 1, position: 'relative', bgcolor: themeData?.theme === 'dark' ? '#1e293c' : '#f5f5f5', overflow: 'hidden' }}>
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

                {/* Right Sidebar (Only for non-home pages) */}
                {!isHome && (
                    <Box sx={{
                        width: 280,
                        flexShrink: 0,
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        bgcolor: themeData?.theme === 'dark' ? '#8e99a5' : PRIMARY,
                    }}>
                        <Box
                            component="img"
                            src={data.about.profileImage}
                            sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', filter: 'grayscale(100%)' }}
                        />
                        <Box sx={{ py: 5, px: 3, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                            {data.navigation.map((nav) => (
                                <Link key={nav.id} href={`/${locale}${nav.path}`} style={{ textDecoration: 'none' }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: pathname.toLowerCase().includes(nav.path.toLowerCase()) ? '#000' : alpha('#000', 0.6),
                                            fontWeight: pathname.toLowerCase().includes(nav.path.toLowerCase()) ? 700 : 500,
                                            letterSpacing: 1.2,
                                            textTransform: 'uppercase',
                                            '&:hover': { color: '#000' },
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

                {/* Floating Nav Bar */}
                <Box
                    sx={{
                        position: 'fixed',
                        ...(isRtl ? { left: 24 } : { right: 24 }),
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: '#8e99a5',
                        borderRadius: 4,
                        py: 2,
                        px: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        zIndex: 1100,
                        boxShadow: theme.customShadows?.z8 || '0 8px 16px rgba(0,0,0,0.1)',
                    }}
                >
                    {data.navigation.map((nav) => {
                        const isActive = pathname.toLowerCase().includes(nav.path.toLowerCase());
                        const isImageIcon = nav.icon.startsWith('/');
                        return (
                            <Link key={nav.id} href={`/${locale}${nav.path}`}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: isActive ? '#fff' : '#000',
                                        transition: 'color 0.2s',
                                        '&:hover': { color: '#fff' },
                                    }}
                                >
                                    {isImageIcon ? (
                                        <Box
                                            component="img"
                                            src={nav.icon}
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                filter: isActive ? 'none' : 'grayscale(100%) brightness(0.2)',
                                                transition: 'filter 0.2s',
                                                '&:hover': { filter: 'none' },
                                            }}
                                        />
                                    ) : (
                                        <Iconify icon={nav.icon} width={24} />
                                    )}
                                </Box>
                            </Link>
                        );
                    })}
                </Box>

            </Box>

            {/* Simple Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: '#8e99a5',
                    py: { xs: 2.5, md: 3 },
                    px: { xs: 3, md: 6 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Box
                    component="img"
                    src={themeData?.icon_url || CONFIG.logo}
                    alt={CONFIG.appName}
                    sx={{ height: 36, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />

                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: '#fff', letterSpacing: 1, textAlign: 'center' }}
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
                        color: alpha('#fff', 0.85),
                        textDecoration: 'none',
                        '&:hover': { color: '#fff' },
                        transition: 'color 0.2s',
                    }}
                >
                    <Iconify icon="mingcute:mail-line" width={18} sx={{ color: '#fff' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'inherit' }}>
                        {themeData?.contact_info?.email || 'info@constrix.com'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
