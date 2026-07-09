"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAtom } from "jotai";
import { portfolioDataAtom, getLocalized } from "@/store/portfolio";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { usePathname } from "next/navigation";
import { useBE_Theme } from "@/lib/theme/client/theme-provider";

export default function PortfolioPage() {
    const [data] = useAtom(portfolioDataAtom);
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const [activeCategoryEn, setActiveCategoryEn] = useState('ALL');
    const { theme: currentTheme } = useBE_Theme();

    const filteredItems = activeCategoryEn === 'ALL'
        ? data.portfolio.items
        : data.portfolio.items.filter(item => item.categoryEn === activeCategoryEn);

    return (
        <Box sx={{ minHeight: '80vh', bgcolor: currentTheme === 'dark' ? '#1e293c' : '#f5f5f5', py: 8, px: { xs: 4, md: 8 }, transition: 'background-color 0.3s' }}>

            {/* Title */}
            <Typography variant="h2" sx={{ fontWeight: 800, letterSpacing: 8, mb: 6, textAlign: 'center' }}>
                {getLocalized(data.portfolio.title, locale)}
            </Typography>

            {/* Categories */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, mb: 6, flexWrap: 'wrap' }}>
                {data.portfolio.categories.map((category) => {
                    const categoryEn = category.en;
                    const isSelected = activeCategoryEn === categoryEn;
                    return (
                        <Typography
                            key={categoryEn}
                            variant="h6"
                            onClick={() => setActiveCategoryEn(categoryEn)}
                            sx={{
                                cursor: 'pointer',
                                fontWeight: isSelected ? 700 : 500,
                                letterSpacing: 1.5,
                                color: isSelected ? '#000' : alpha('#000', 0.5),
                                transition: 'all 0.3s ease',
                                '&:hover': { color: '#000' },
                                textTransform: 'uppercase'
                            }}
                        >
                            {getLocalized(category, locale)}
                        </Typography>
                    );
                })}
            </Box>

            {/* Images Grid */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 3,
                maxWidth: 900,
                mx: 'auto'
            }}>
                {filteredItems.map((item) => (
                    <Box key={item.id}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 260,
                                overflow: 'hidden',
                                borderRadius: 2,
                                bgcolor: currentTheme === 'dark' ? '#6a7a8e' : '#fff',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                },
                                '&:hover img': {
                                    transform: 'scale(1.05)',
                                },
                                cursor: 'pointer'
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.categoryEn}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    transition: 'transform 0.4s ease'
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>

        </Box>
    );
}
