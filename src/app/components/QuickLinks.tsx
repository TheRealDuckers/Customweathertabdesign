import { Mail, Youtube, Github, Twitter, Linkedin, Calendar } from 'lucide-react';

interface QuickLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const defaultLinks: QuickLink[] = [
  {
    name: 'Gmail',
    url: 'https://mail.google.com',
    icon: <Mail className="w-6 h-6" />,
    color: 'text-red-600',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: <Youtube className="w-6 h-6" />,
    color: 'text-red-600',
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: <Github className="w-6 h-6" />,
    color: 'text-gray-800',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: <Twitter className="w-6 h-6" />,
    color: 'text-blue-500',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: <Linkedin className="w-6 h-6" />,
    color: 'text-blue-700',
  },
  {
    name: 'Calendar',
    url: 'https://calendar.google.com',
    icon: <Calendar className="w-6 h-6" />,
    color: 'text-blue-600',
  },
];

export function QuickLinks() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 max-w-3xl mx-auto px-2 sm:px-0">
      {defaultLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/40 backdrop-blur-md 
                   border border-white/50 hover:bg-white/60 transition-all duration-300 
                   hover:shadow-lg hover:scale-105 group"
        >
          <div className={`${link.color} group-hover:scale-110 transition-transform duration-300 scale-90 sm:scale-100`}>
            {link.icon}
          </div>
          <span className="text-xs text-gray-700">{link.name}</span>
        </a>
      ))}
    </div>
  );
}