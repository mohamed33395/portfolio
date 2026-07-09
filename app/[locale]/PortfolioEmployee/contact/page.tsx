"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useAtom} from "jotai";
import {portfolioDataAtom, getLocalized} from "@/store/portfolio";
import {alpha, useTheme} from "@mui/material/styles";
import {Iconify} from "@/components/iconify";
import {usePathname} from "next/navigation";
import {useBE_Theme} from "@/lib/theme/client/theme-provider";

const SOCIAL = [
    {key: 'instagram' as const, icon: 'mdi:instagram', label: 'Instagram', color: '#E1306C'},
    {key: 'facebook' as const, icon: 'mdi:facebook', label: 'Facebook', color: '#1877F2'},
    {key: 'whatsapp' as const, icon: 'mdi:whatsapp', label: 'WhatsApp', color: '#25D366'},
    {key: 'linkedin' as const, icon: 'mdi:linkedin', label: 'LinkedIn', color: '#0A66C2'},
    {key: 'twitter' as const, icon: 'mdi:twitter', label: 'Twitter / X', color: '#1DA1F2'},
];

export default function ContactPage() {
    const [data] = useAtom(portfolioDataAtom);
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || 'en';
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const {theme: currentTheme} = useBE_Theme();

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: currentTheme === 'dark' ? '#1e293c' : theme.palette.background.default,
            py: 8,
            px: {xs: 3, md: 6},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'background-color 0.3s'
        }}>

            {/* Title */}
            <Box sx={{textAlign: 'center', mb: 6}}>
                <Typography variant="h2" sx={{fontWeight: 900, letterSpacing: 6, mb: 1}}>
                    {getLocalized(data.contact.title, locale)}
                </Typography>
                <Box sx={{width: 56, height: 4, bgcolor: primary, mx: 'auto', borderRadius: 2}}/>
                <Typography variant="body1" sx={{color: 'text.secondary', mt: 2}}>
                    {locale === 'en' ? 'Reach out through any of the platforms below' : 'تواصل معي عبر أي من المنصات أدناه'}
                </Typography>
            </Box>

            {/* Contact Info Row */}
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', mb: 6}}>
                {[
                    {icon: 'mingcute:location-fill', label: getLocalized(data.contact.address, locale)},
                    {icon: 'mingcute:mail-fill', label: data.contact.email},
                    {icon: 'mingcute:phone-fill', label: data.contact.phone},
                ].map((item, i) => (
                    <Box key={i} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        bgcolor: currentTheme === 'dark' ? '#8e99a5' : theme.palette.background.paper,
                        px: 2.5,
                        py: 1.5,
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                        <Box sx={{color: primary}}>
                            <Iconify icon={item.icon} width={20}/>
                        </Box>
                        <Typography variant="body2" sx={{fontWeight: 500, color: currentTheme === 'dark' ? '#0f172a' : 'text.primary'}}>{item.label}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Social Links Grid */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)'},
                gap: 3,
                width: '100%',
                maxWidth: 900
            }}>
                {SOCIAL.map(({key, icon, label, color}) => (
                    <Box
                        key={key}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 1.5,
                            bgcolor: currentTheme === 'dark' ? '#8e99a5' : theme.palette.background.paper,
                            borderRadius: 4,
                            py: 4,
                            px: 2,
                            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                            border: '2px solid transparent',
                            transition: 'all 0.3s',
                            cursor: 'pointer',
                            '&:hover': {
                                borderColor: color,
                                transform: 'translateY(-6px)',
                                boxShadow: `0 8px 24px ${alpha(color, 0.25)}`,
                                '& .social-icon-bg': { bgcolor: color },
                                '& .social-icon': { color: '#fff' },
                                '& .social-label': { color },
                            },
                        }}
                        onClick={() => {
                            const link = data.contact.socialLinks[key];
                            if (link) {
                                window.open(link, '_blank');
                            }
                        }}
                    >
                        <Box
                            className="social-icon-bg"
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: '50%',
                                bgcolor: alpha(color, 0.12),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            <Iconify className="social-icon" icon={icon} width={32}
                                     sx={{color, transition: 'color 0.3s'}}/>
                        </Box>
                        <Typography className="social-label" variant="subtitle2"
                                    sx={{fontWeight: 700, color: currentTheme === 'dark' ? '#0f172a' : 'text.primary', transition: 'color 0.3s'}}>
                            {label}
                        </Typography>
                    </Box>
                ))}
            </Box>

        </Box>
    );
}
