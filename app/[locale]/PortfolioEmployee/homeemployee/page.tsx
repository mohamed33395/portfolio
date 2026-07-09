"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { alpha, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBE_Theme } from "@/lib/theme/client/theme-provider";

export default function HomeEmployeePage() {
    const [data] = useAtom(portfolioDataAtom);
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const { theme: currentTheme } = useBE_Theme();

    return (
        <Box sx={{ display: 'flex', height: '100%', minHeight: '80vh', flexDirection: { xs: 'column', md: 'row' } }}>

            {/* Left Content Area */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 4, md: 10 },
                bgcolor: currentTheme === 'dark' ? '#1e293c' : '#fff',
                transition: 'background-color 0.3s',
            }}>
                <Box sx={{ maxWidth: 480 }}>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textTransform: 'uppercase' }}>
                        {getLocalized(data.home.greeting, locale)}
                    </Typography>
                    <Typography variant="h1" sx={{
                        fontWeight: 800,
                        mb: 3,
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        whiteSpace: 'nowrap',
                        flexWrap: 'wrap',
                        fontSize: {
                            xs: '2rem',
                            sm: '2.5rem',
                            md: '3rem',
                            lg: getLocalized(data.home.name, locale).length > 15 ? '2.5rem' : '3rem',
                            xl: getLocalized(data.home.name, locale).length > 15 ? '3rem' : '4rem',
                        }
                    }}>
                        {locale === 'en' ? "I'M " : "أنا "}
                        <Typography component="span" variant="inherit" sx={{
                            color: 'transparent',
                            WebkitTextStroke: `3px ${primary}`,
                            textShadow: `0 0 20px ${alpha(primary, 0.4)}`,
                            fontSize: 'inherit'
                        }}>
                            {getLocalized(data.home.name, locale)}
                        </Typography>
                    </Typography>

                    <Box sx={{
                        display: 'inline-block',
                        bgcolor: primary,
                        px: 2,
                        py: 0.5,
                        mb: 4,
                        borderRadius: 1
                    }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#000', letterSpacing: 1.2 }}>
                            {getLocalized(data.home.jobTitle, locale)}
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.8 }}>
                        {getLocalized(data.home.description, locale)}
                    </Typography>

                    <Button
                        component={Link}
                        href={`/${locale}${data.home.buttonLink}`}
                        variant="contained"
                        sx={{
                            bgcolor: primary,
                            color: '#000',
                            px: 4,
                            py: 1.5,
                            borderRadius: 4,
                            fontWeight: 700,
                            '&:hover': {
                                bgcolor: alpha(primary, 0.8),
                            }
                        }}
                    >
                        {getLocalized(data.home.buttonText, locale)}
                    </Button>
                </Box>
            </Box>

            {/* Right Image Area */}
            <Box sx={{
                flex: 1,
                position: 'relative',
                display: { xs: 'none', md: 'block' }
            }}>
                <Box
                    component="img"
                    src={data.home.mainImage}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'grayscale(100%)',
                    }}
                />
            </Box>

        </Box>
    );
}
