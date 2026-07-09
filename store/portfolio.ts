import { atom } from 'jotai';

export interface PortfolioData {
  settings: {
    isVisible: boolean;
    allowedUrl: string;
    colors: {
      background: string;
    };
  };
  navigation: Array<{
    id: string;
    path: string;
    label: { en: string; ar: string };
    icon: string;
  }>;
  home: {
    greeting: { en: string; ar: string };
    name: { en: string; ar: string };
    jobTitle: { en: string; ar: string };
    description: { en: string; ar: string };
    buttonText: { en: string; ar: string };
    buttonLink: string;
    mainImage: string;
  };
  about: {
    title: { en: string; ar: string };
    content: { en: string; ar: string };
    profileImage: string;
    profileImage2?: string;
  };
  contact: {
    title: { en: string; ar: string };
    email: string;
    phone: string;
    address: { en: string; ar: string };
    socialLinks: {
      instagram: string;
      facebook: string;
      whatsapp: string;
      linkedin: string;
      twitter: string;
    };
  };
  portfolio: {
    title: { en: string; ar: string };
    categories: Array<{ en: string; ar: string }>;
    items: Array<{
      id: string;
      categoryEn: string;
      image: string;
    }>;
  };
  resume: {
    title: { en: string; ar: string };
    summary: { en: string; ar: string };
    qualifications: Array<{
      title: { en: string; ar: string };
      institution: { en: string; ar: string };
      year: string;
      description: { en: string; ar: string };
    }>;
    experience: Array<{
      role: { en: string; ar: string };
      company: { en: string; ar: string };
      period: { en: string; ar: string };
      description: { en: string; ar: string };
      skills?: Array<{
        name: { en: string; ar: string };
        icon: string;
      }>;
    }>;
    courses: Array<{
      name: { en: string; ar: string };
      provider: { en: string; ar: string };
      year: string;
      icon: string;
    }>;
    certifications: Array<{
      name: { en: string; ar: string };
      issuer: { en: string; ar: string };
      year: string;
      icon: string;
    }>;
  };
}

export const portfolioDataAtom = atom<PortfolioData>({
  settings: {
    isVisible: true,
    allowedUrl: '',
    colors: {
      background: '#0f172a',
    },
  },
  navigation: [
    { id: '1', path: '/PortfolioEmployee/homeemployee', label: { en: 'Home', ar: 'الرئيسية' }, icon: 'mingcute:home-2-line' },
    { id: '2', path: '/PortfolioEmployee/about', label: { en: 'About', ar: 'عني' }, icon: 'mingcute:user-2-line' },
    { id: '3', path: '/PortfolioEmployee/portfolio', label: { en: 'Portfolio', ar: 'معرض الأعمال' }, icon: 'mingcute:briefcase-line' },
    { id: '4', path: '/PortfolioEmployee/resume', label: { en: 'Resume', ar: 'السيرة الذاتية' }, icon: 'mingcute:document-line' },
    { id: '5', path: '/PortfolioEmployee/contact', label: { en: 'Contact', ar: 'تواصل معي' }, icon: 'mingcute:mail-line' },
  ],
  home: {
    greeting: { en: 'Hello', ar: 'مرحباً' },
    name: { en: 'Mohamed Abdel Latif', ar: 'محمد عبد اللطيف' },
    jobTitle: { en: 'Frontend Engineer', ar: 'مهندس فرونت اند' },
    description: { en: 'I build exceptional digital experiences', ar: 'أبني تجارب رقمية استثنائية' },
    buttonText: { en: 'View My Work', ar: 'شاهد أعمالي' },
    buttonLink: '/PortfolioEmployee/portfolio',
    mainImage: '/assets/imags/protfolio2.png',
  },
  about: {
    title: { en: 'About Me', ar: 'عني' },
    content: { en: 'A passionate developer with expertise in creating modern web applications.', ar: 'مطور شغوف بخبرة في إنشاء تطبيقات ويب حديثة.' },
    profileImage: '/assets/imags/protfolio.PNG',
    profileImage2: '/assets/imags/protfolio2.png',
  },
  contact: {
    title: { en: 'Get In Touch', ar: 'تواصل معي' },
    email: 'mah01010533395@gmail.com',
    phone: '0568491870',
    address: { en: 'Egypt', ar: 'مصر' },
    socialLinks: {
      instagram: 'https://www.instagram.com/m7md_3bdalltef/?hl=ar',
      facebook: 'https://m.me/mohammed.abdullateif.946328',
      whatsapp: 'https://wa.me/20568491870',
      linkedin: 'https://www.linkedin.com/in/mohammed-abdullatif-492492392/',
      twitter: 'https://x.com',
    },
  },
  portfolio: {
    title: { en: 'My Work', ar: 'أعمالي' },
    categories: [
      { en: 'ALL', ar: 'الكل' },
      { en: 'Web', ar: 'ويب' },
      { en: 'Mobile', ar: 'موبايل' },
    ],
    items: [
      {
        id: '1',
        categoryEn: 'Web',
        image: '/assets/imags/project1.PNG',
      },
      {
        id: '2',
        categoryEn: 'Web',
        image: '/assets/imags/project2.PNG',
      },
    ],
  },
  resume: {
    title: { en: 'My Resume', ar: 'سيرتي الذاتية' },
    summary: {
      en: 'A passionate Frontend Engineer with expertise in building modern, responsive web applications using React, Next.js, and modern CSS frameworks. Committed to creating exceptional user experiences and writing clean, maintainable code.',
      ar: 'مهندس فرونت اند شغوف بخبرة في بناء تطبيقات ويب حديثة ومتجاوبة باستخدام React و Next.js وأطر عمل Tailwind.Css  لحديثة. ملتزم بإنشاء تجارب مستخدم استثنائية وكتابة كود نظيف وقابل للصيانة.'
    },
    qualifications: [
      {
        title: { en: 'Bachelor of Computer Science', ar: 'بكالوريوس علوم الحاسب' },
        institution: { en:  'Delta University ', ar: 'جامعةالدالتا' },
        year: '2022',
        description: { en: 'Graduated with honors, specializing in Software Engineering and Web Development.', ar: 'تخرج بتقدير امتياز، تخصص هندسة البرمجيات وتطوير الويب.' }
      }
    ],
    experience: [
      {
        role: { en: 'Frontend Developer', ar: 'مطور فرونت اند' },
        company: { en: 'New Vision', ar: 'نيو فيجن' },
        period: { en: 'Present', ar: 'الحالي' },
        description: { en: 'Currently working at New Vision in Saudi Arabia as a Frontend Developer, building responsive websites and user interfaces using React and Next.js.', ar: 'حالياً أعمل في شركة نيو فيجن في السعودية كمطور فرونت اند، بناء مواقع ويب متجاوبة وواجهات مستخدم باستخدام React و Next.js.' },
        skills: [
          { name: { en: 'React', ar: 'رياكت' }, icon: 'logos:react' },
          { name: { en: 'Next.js', ar: 'نيكست جي إس' }, icon: 'logos:nextjs-icon' }
        ]
      }
    ],
    courses: [
      {
        name: { en: 'Advanced React Patterns', ar: 'أنماط React المتقدمة' },
        provider: { en: 'Udemy', ar: 'يوديمي' },
        year: '',
        icon: 'logos:react'
      },
      {
        name: { en: 'Modern JavaScript (ES6+)', ar: 'جافا سكريبت الحديثة (ES6+)' },
        provider: { en: 'Udemy', ar: 'يوديمي' },
        year: '',
        icon: 'logos:javascript'
      },
      {
        name: { en: 'TypeScript Masterclass', ar: 'دورة TypeScript المتقدمة' },
        provider: { en: 'Udemy', ar: 'يوديمي' },
        year: '',
        icon: 'logos:typescript-icon'
      },
      {
        name: { en: 'Next.js Complete Guide', ar: 'دليل Next.js الشامل' },
        provider: { en: 'Udemy', ar: 'يوديمي' },
        year: '',
        icon: 'logos:nextjs-icon'
      },
      {
        name: { en: 'Tailwind CSS Mastery', ar: 'إتقان Tailwind CSS' },
        provider: { en: 'Udemy', ar: 'يوديمي' },
        year: '',
        icon: 'logos:tailwindcss-icon'
      },

      {
        name: { en: 'Git & GitHub Complete Course', ar: 'دورة Git & GitHub الشاملة' },
        provider: { en: 'Udemy', ar: 'يوديمي' },
        year: '',
        icon: 'logos:git-icon'
      },
      {
        name: { en: 'CSS Grid & Flexbox', ar: 'CSS Grid & Flexbox' },
        provider: { en: 'freeCodeCamp', ar: 'فري كود كامب' },
        year: '',
        icon: 'logos:css-3'
      },
      {
        name: { en: 'REST API Development', ar: 'تطوير REST APIs' },
        provider: { en: 'Udemy', ar: 'يوديمي' },
        year: '',
        icon: 'logos:json'
      },
    ],
    certifications: [
      {
        name: { en: 'New Vision Front-End Developer', ar: 'مطور فرونت اند من نيو فيجن' },
        issuer: { en: '', ar: '' },
        year: '',
        icon: 'New Vision'
      }
    ],
  },
});

export function getLocalized(item: { en: string; ar: string }, locale: string): string {
  return locale === 'ar' ? item.ar : item.en;
}
